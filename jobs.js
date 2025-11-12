// Trabalhe Conosco: envio de candidatura e painel admin
import { auth, db, ADMIN_EMAIL } from './firebase.js';
import { onAuthStateChanged, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
// Fluxo sem upload: coletamos apenas o link do portfólio informado pelo candidato.

const workForm = document.getElementById('work-form');
const nameEl = document.getElementById('candidate-name');
const roleEl = document.getElementById('candidate-role');
const techsEl = document.getElementById('candidate-techs');
const bioEl = document.getElementById('candidate-bio');
const portfolioEl = document.getElementById('candidate-portfolio');
const workMsg = document.getElementById('work-message');
const adminPanel = document.getElementById('admin-panel');
const filterRoleEl = document.getElementById('filter-role');
const filterTechEl = document.getElementById('filter-tech');
const candidatesList = document.getElementById('candidates-list');
const navAdmin = document.getElementById('nav-admin');
const navAdminMobile = document.getElementById('nav-admin-mobile');

// Fallback local quando Firestore estiver com permissões insuficientes
const LOCAL_APPS_KEY = 'nexio_applications';
function loadLocalApps() {
  try {
    const raw = localStorage.getItem(LOCAL_APPS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveLocalApp(app) {
  const list = loadLocalApps();
  list.unshift(app);
  try { localStorage.setItem(LOCAL_APPS_KEY, JSON.stringify(list)); } catch {}
}

// Removido: restrições de upload. Não usamos upload de currículo.

let currentUser = null;
let applicationsSnapshot = [];
let unsubscribeApps = null;
let anonInitAttempted = false;

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  const isAdmin = !!user && user.email === ADMIN_EMAIL;
  // Mostrar link Admin no navbar apenas para admin
  if (navAdmin) navAdmin.style.display = isAdmin ? '' : 'none';
  if (navAdminMobile) navAdminMobile.style.display = isAdmin ? '' : 'none';
  // Se não houver usuário, tentar login anônimo para permitir criar candidaturas sem bloqueio
  if (!user && !anonInitAttempted) {
    anonInitAttempted = true;
    signInAnonymously(auth).catch(() => { /* se falhar, seguimos com fallback local */ });
  }
  if (adminPanel) {
    adminPanel.style.display = isAdmin ? 'block' : 'none';
  }
  // Gerenciar assinatura somente para admin
  if (isAdmin) {
    if (!unsubscribeApps) {
      const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
      unsubscribeApps = onSnapshot(q, (snapshot) => {
        applicationsSnapshot = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        renderCandidates();
      }, (error) => {
        // Falha no Firestore: usar dados locais para não bloquear o painel
        showWorkMessage(`Erro ao carregar candidaturas: ${error.message}. Usando dados locais.`, 'warning');
        applicationsSnapshot = loadLocalApps();
        renderCandidates();
      });
    }
  } else {
    if (unsubscribeApps) {
      unsubscribeApps();
      unsubscribeApps = null;
      applicationsSnapshot = [];
      renderCandidates();
    }
  }
});

function showWorkMessage(text, type = 'info') {
  if (!workMsg) return;
  workMsg.textContent = text;
  workMsg.style.display = 'block';
  workMsg.className = `form-message ${type}`;
}

function parseTechs(input) {
  return input
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter((t) => t.length > 0);
}

function isValidUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

// Removido: validação de arquivo; não usamos upload de currículo.

// Removido: slug de arquivo.

// Removido: upload para Cloudinary.

// Envio de candidatura
if (workForm) {
  workForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = nameEl.value.trim();
    const role = roleEl.value.trim();
    const techs = parseTechs(techsEl.value);
    const bio = bioEl.value.trim();
    const portfolioUrl = (portfolioEl?.value || '').trim();
    if (!name || !role || techs.length === 0 || !bio || !portfolioUrl) {
      showWorkMessage('Preencha todos os campos e informe o link do portfólio.', 'warning');
      return;
    }
    if (!isValidUrl(portfolioUrl)) {
      showWorkMessage('Informe uma URL válida para o portfólio (http/https).', 'warning');
      return;
    }

    // Se houver usuário autenticado, tentamos salvar no Firestore; caso contrário, salvamos localmente.
    if (currentUser) {
      try {
        const email = (currentUser.email || '').toLowerCase();
        const payload = {
          userId: currentUser.uid,
          email,
          name,
          role, // frontend | backend | fullstack | devops | qa
          techs, // array de strings
          bio,
          portfolioUrl,
          createdAt: serverTimestamp()
        };
        await addDoc(collection(db, 'applications'), payload);
        workForm.reset();
        showWorkMessage('Candidatura enviada! Você receberá retorno em breve se seu perfil se encaixar em uma vaga.', 'success');
      } catch (err) {
        const email = (currentUser?.email || '').toLowerCase();
        const localApp = {
          id: 'local_' + Date.now(),
          userId: currentUser?.uid || 'local',
          email,
          name,
          role,
          techs,
          bio,
          portfolioUrl,
          createdAt: new Date().toISOString()
        };
        saveLocalApp(localApp);
        applicationsSnapshot = loadLocalApps();
        renderCandidates();
        workForm.reset();
        showWorkMessage('Candidatura enviada (salva localmente). Ajuste regras do Firestore para sincronizar.', 'success');
      }
    } else {
      // Sem login: salvar localmente para não bloquear o envio
      const localApp = {
        id: 'local_' + Date.now(),
        userId: 'anonymous',
        email: '',
        name,
        role,
        techs,
        bio,
        portfolioUrl,
        createdAt: new Date().toISOString()
      };
      saveLocalApp(localApp);
      applicationsSnapshot = loadLocalApps();
      renderCandidates();
      workForm.reset();
      showWorkMessage('Candidatura enviada (salva localmente). Faça login depois para sincronizar com o painel.', 'success');
    }
  });
}

// Assinatura agora é gerenciada dentro do onAuthStateChanged para evitar erros de permissão

function passesFilters(app) {
  const roleFilter = (filterRoleEl?.value || '').trim();
  const techFilterRaw = (filterTechEl?.value || '').trim().toLowerCase();
  const techFilters = techFilterRaw ? techFilterRaw.split(',').map((t) => t.trim()).filter(Boolean) : [];

  const roleOk = !roleFilter || app.role === roleFilter;
  const techOk = techFilters.length === 0 || techFilters.every((t) => app.techs?.includes(t));
  return roleOk && techOk;
}

function renderCandidates() {
  if (!candidatesList || adminPanel.style.display === 'none') return;
  candidatesList.innerHTML = '';
  const apps = applicationsSnapshot.filter(passesFilters);
  if (apps.length === 0) {
    candidatesList.innerHTML = '<div class="no-comments"><p>Nenhum candidato encontrado para os filtros selecionados.</p></div>';
    return;
  }
  apps.forEach((app) => {
    const item = document.createElement('div');
    item.className = 'candidate-item';
    const date = app.createdAt?.toDate ? app.createdAt.toDate() : new Date();
    const portfolioUrl = app.portfolioUrl || '';
    item.innerHTML = `
      <div class="candidate-header">
        <strong>${app.name}</strong>
        <span class="candidate-role">${formatRole(app.role)}</span>
        <span class="candidate-date">${date.toLocaleString('pt-BR')}</span>
      </div>
      <div class="candidate-body">
        <p class="candidate-bio">${escapeHtml(app.bio)}</p>
        <div class="candidate-techs">${(app.techs||[]).map(t => `<span class='tech-tag'>${t}</span>`).join(' ')}</div>
        <div class="candidate-actions">
          ${portfolioUrl ? `<a href="${portfolioUrl}" class="portfolio-btn" target="_blank" rel="noopener">Abrir portfólio</a>` : `<span class="no-portfolio">Sem link de portfólio</span>`}
        </div>
      </div>
    `;
    candidatesList.appendChild(item);
  });
}

function formatRole(role) {
  switch(role) {
    case 'frontend': return 'Frontend';
    case 'backend': return 'Backend';
    case 'fullstack': return 'Full Stack';
    case 'devops': return 'DevOps';
    case 'qa': return 'QA';
    default: return role;
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Removido: função de download de currículo.

// Sem delegação: o botão de portfólio abre em nova aba via href.

// Filtros: re-render ao alterar
if (filterRoleEl) filterRoleEl.addEventListener('change', renderCandidates);
if (filterTechEl) filterTechEl.addEventListener('input', renderCandidates);