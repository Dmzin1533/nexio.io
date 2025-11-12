// Painel de Login embutido: entrar e criar conta com nome
import { auth, db, ADMIN_EMAIL } from './firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { doc, setDoc, serverTimestamp, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const modal = document.getElementById('login-modal');
const closeBtn = document.getElementById('login-close');
const navLogin = document.getElementById('login-nav');
const navLoginMobile = document.getElementById('login-nav-mobile');

const form = document.getElementById('login-panel-form');
const emailEl = document.getElementById('panel-email');
const passEl = document.getElementById('panel-password');
const nameGroup = document.getElementById('panel-name-group');
const nameEl = document.getElementById('panel-name');
const msgEl = document.getElementById('panel-message');
const btnLogin = document.getElementById('panel-btn-login');
const btnRegister = document.getElementById('panel-btn-register');
const titleEl = document.getElementById('login-title');

let mode = 'login'; // 'login' | 'register'

function setMode(newMode) {
  mode = newMode;
  const isRegister = mode === 'register';
  if (titleEl) titleEl.textContent = isRegister ? 'Criação de Conta' : 'Login';
  if (nameGroup) nameGroup.hidden = !isRegister;
  if (btnLogin) btnLogin.textContent = isRegister ? 'Criar Conta' : 'Entrar';
  if (btnRegister) btnRegister.textContent = isRegister ? 'Voltar ao Login' : 'Criar Conta';
}

function normalizeAdminEmail(email) {
  // Permite digitar apenas "admin" e converte para o e-mail do admin
  if (email.toLowerCase() === 'admin') return ADMIN_EMAIL;
  return email;
}

function showPanel() {
  if (!modal) return;
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  setMode('login');
}

function hidePanel() {
  if (!modal) return;
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  msgEl.style.display = 'none';
  msgEl.textContent = '';
}

function showMessage(text, type = 'info') {
  msgEl.textContent = text;
  msgEl.style.display = 'block';
  msgEl.className = `form-message ${type}`;
}

// Expor global para ser usado pelo feedback.js
window.openLoginPanel = showPanel;
window.closeLoginPanel = hidePanel;

// Abrir pelo navbar
if (navLogin) navLogin.addEventListener('click', (e) => { e.preventDefault(); showPanel(); });
if (navLoginMobile) navLoginMobile.addEventListener('click', (e) => { e.preventDefault(); showPanel(); });

// Fechar
if (closeBtn) closeBtn.addEventListener('click', hidePanel);
if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) hidePanel(); });

// Submit (Login ou Registro dependendo do modo)
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  let email = emailEl.value.trim();
  const password = passEl.value.trim();
  email = normalizeAdminEmail(email);
  if (mode === 'login') {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      showMessage(`Bem-vindo, ${userCred.user.email}!`, 'success');
      await prefillFeedbackName(userCred.user);
      setTimeout(hidePanel, 800);
    } catch (err) {
      showMessage(`Erro ao entrar: ${err.message}`, 'error');
    }
  } else {
    const name = nameEl.value.trim();
    // Bloqueia tentativa de cadastrar o admin pelo painel
    if (email === ADMIN_EMAIL) {
      showMessage('A conta admin deve ser criada no Console do Firebase.', 'warning');
      return;
    }
    if (!email || !password || !name) {
      showMessage('Informe e-mail, senha e nome para criar a conta.', 'warning');
      return;
    }
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: name });
      await setDoc(doc(db, 'users', userCred.user.uid), {
        name,
        email,
        createdAt: serverTimestamp()
      });
      showMessage(`Conta criada: ${email}. Você já pode entrar.`, 'success');
      // Após criar, volta ao modo login
      setMode('login');
    } catch (err) {
      showMessage(`Erro ao criar conta: ${err.message}`, 'error');
    }
  }
});

// Botão secundário alterna o modo
btnRegister.addEventListener('click', () => {
  setMode(mode === 'register' ? 'login' : 'register');
});

// Prefill do nome do feedback com nome do cadastro
async function prefillFeedbackName(user) {
  const nameInput = document.getElementById('name');
  if (!nameInput) return;

  let name = user?.displayName || '';
  try {
    const snap = await getDoc(doc(db, 'users', user.uid));
    if (snap.exists()) {
      const data = snap.data();
      if (data?.name) name = data.name;
    }
  } catch { /* noop */ }

  if (name) {
    nameInput.value = name;
    nameInput.setAttribute('readonly', 'true');
  }
}