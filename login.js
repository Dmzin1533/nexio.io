// Integração de Login com Firebase (Web v10 - Modular)
// 1) Crie um projeto no Firebase e habilite Email/Password em Authentication
// 2) Copie seu firebaseConfig e cole abaixo

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

// Substitua com suas credenciais do Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZKJlc2apOpVr1yiorclRRVjcngNrMiuQ",
  authDomain: "nexioportfolio.firebaseapp.com",
  projectId: "nexioportfolio",
  storageBucket: "nexioportfolio.firebasestorage.app",
  messagingSenderId: "900969678027",
  appId: "1:900969678027:web:17f289da13e20d365d074e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Helpers UI
const emailEl = document.getElementById('login-email');
const passEl = document.getElementById('login-password');
const formEl = document.getElementById('login-form');
const msgEl = document.getElementById('login-message');
const btnRegister = document.getElementById('btn-register');

function showMessage(text, type = 'info') {
  msgEl.textContent = text;
  msgEl.style.display = 'block';
  msgEl.className = `form-message ${type}`;
}

// Entrar
formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailEl.value.trim();
  const password = passEl.value.trim();

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    showMessage(`Bem-vindo, ${userCred.user.email}!`, 'success');
    // Redirecionar após login, se necessário:
    // window.location.href = 'index.html#home';
  } catch (err) {
    showMessage(`Erro ao entrar: ${err.message}`, 'error');
  }
});

// Criar conta
btnRegister.addEventListener('click', async () => {
  const email = emailEl.value.trim();
  const password = passEl.value.trim();

  if (!email || !password) {
    showMessage('Informe e-mail e senha para criar a conta.', 'warning');
    return;
  }

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    showMessage(`Conta criada: ${userCred.user.email}. Agora você já pode entrar.`, 'success');
  } catch (err) {
    showMessage(`Erro ao criar conta: ${err.message}`, 'error');
  }
});