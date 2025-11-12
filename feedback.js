// Integração do formulário de feedback com Firestore e Auth
import { auth, db } from './firebase.js';
import { onAuthStateChanged, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, doc, getDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { ADMIN_EMAIL } from './firebase.js';

const form = document.getElementById('feedback-form');
const nameInput = document.getElementById('name');
const commentInput = document.getElementById('comment');
const submitBtn = document.getElementById('submit-btn');
const formMessage = document.getElementById('form-message');
const commentsList = document.getElementById('comments-list');
const charCountEl = document.getElementById('char-count');

// Mantém o último snapshot para re-renderizar quando o auth mudar
let lastSnapshot = null;
let unsubscribeFeedback = null;
let anonInitAttempted = false;

// Atualiza contador de caracteres
if (commentInput && charCountEl) {
  commentInput.addEventListener('input', () => {
    charCountEl.textContent = String(commentInput.value.length);
  });
}

// Estado de autenticação
let currentUser = null;
onAuthStateChanged(auth, (user) => {
  currentUser = user;
  if (submitBtn) {
    // Botão permanece clicável para abrir o painel quando não logado
    submitBtn.disabled = false;
    submitBtn.textContent = user ? 'Enviar Comentário' : 'Faça login para comentar';
  }
  if (!user) {
    // Tenta login anônimo para permitir leitura de comentários quando as regras permitirem
    if (!anonInitAttempted) {
      anonInitAttempted = true;
      signInAnonymously(auth).catch(() => { /* se falhar, seguimos sem auth */ });
    }
    if (formMessage) {
      formMessage.style.display = 'block';
      formMessage.className = 'form-message warning';
      formMessage.textContent = 'Você precisa estar logado para enviar feedback.';
    }
    if (nameInput) {
      nameInput.value = '';
      nameInput.removeAttribute('readonly');
    }
  } else {
    if (formMessage) {
      formMessage.style.display = 'none';
      formMessage.textContent = '';
    }
    // Limpa e desbloqueia antes de preencher (evita nome persistente de outro usuário)
    if (nameInput) {
      nameInput.value = '';
      nameInput.removeAttribute('readonly');
    }
    // Prefill de nome com cadastro
    prefillNameFromProfile(user);
  }

  // Re-renderiza comentários com permissões atualizadas (admin/dono)
  if (lastSnapshot) {
    renderComments(lastSnapshot);
  }

  // Inicializa/limpa assinatura em tempo real com base no estado de auth
  // Inicia a assinatura apenas para usuários autenticados NÃO anônimos (possuem email)
  if (user && !!user.email) {
    if (!unsubscribeFeedback) {
      const q = query(collection(db, 'feedbacks'), orderBy('createdAt', 'desc'));
      unsubscribeFeedback = onSnapshot(
        q,
        (snapshot) => {
          lastSnapshot = snapshot;
          renderComments(snapshot);
        },
        (error) => {
          console.error('Erro ao escutar feedbacks:', error);
          if (formMessage) {
            formMessage.style.display = 'block';
            formMessage.className = 'form-message error';
            formMessage.textContent = `Falha ao carregar feedbacks: ${error.message}`;
          }
          if (commentsList) {
            commentsList.innerHTML = `<div class="no-comments"><p>Não foi possível carregar os comentários. Verifique as regras do Firestore e a conexão.</p></div>`;
          }
        }
      );
    }
  } else {
    if (unsubscribeFeedback) {
      unsubscribeFeedback();
      unsubscribeFeedback = null;
      lastSnapshot = null;
      if (commentsList) commentsList.innerHTML = '';
    }
  }
});

// Renderiza comentários em tempo real
function renderComments(snapshot) {
  if (!commentsList) return;
  commentsList.innerHTML = '';
  if (snapshot.empty) {
    const noEl = document.createElement('div');
    noEl.className = 'no-comments';
    noEl.innerHTML = '<p>Ainda não há comentários. Seja o primeiro a deixar sua opinião!</p>';
    commentsList.appendChild(noEl);
    return;
  }
  snapshot.forEach((snap) => {
    const data = snap.data();
    const item = document.createElement('div');
    item.className = 'comment-item';
    const name = data.name || 'Usuário';
    const comment = data.comment || '';
    const date = data.createdAt?.toDate ? data.createdAt.toDate() : new Date();
    const id = snap.id;
    const canDelete = !!currentUser && (currentUser.uid === data.userId || currentUser.email === ADMIN_EMAIL);
    item.innerHTML = `
      <div class="comment-header">
        <strong>${name}</strong>
        <span class="comment-date">${date.toLocaleString('pt-BR')}</span>
        ${canDelete ? `<button class="delete-btn" data-id="${id}">Excluir</button>` : ''}
      </div>
      <p class="comment-body">${comment}</p>
    `;
    commentsList.appendChild(item);
  });

  // Bind de exclusão
  const delButtons = commentsList.querySelectorAll('.delete-btn');
  delButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      if (!id) return;
      try {
        await deleteDoc(doc(db, 'feedbacks', id));
      } catch (err) {
        if (formMessage) {
          formMessage.style.display = 'block';
          formMessage.className = 'form-message error';
          formMessage.textContent = `Erro ao excluir comentário: ${err.message}`;
        }
      }
    });
  });
}

// Assinatura é controlada dentro do onAuthStateChanged (acima) para reduzir erros em ambientes sem permissão

// Envio do formulário
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentUser) {
      // Abre painel de login no site
      if (window.openLoginPanel) window.openLoginPanel();
      return;
    }
    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();
    const email = (currentUser.email || '').toLowerCase();
    if (!name || !comment) {
      formMessage.style.display = 'block';
      formMessage.className = 'form-message warning';
      formMessage.textContent = 'Preencha nome e comentário.';
      return;
    }
    try {
      await addDoc(collection(db, 'feedbacks'), {
        userId: currentUser.uid,
        email,
        name,
        comment,
        createdAt: serverTimestamp()
      });
      form.reset();
      charCountEl.textContent = '0';
      formMessage.style.display = 'block';
      formMessage.className = 'form-message success';
      formMessage.textContent = 'Comentário enviado com sucesso!';
    } catch (err) {
      formMessage.style.display = 'block';
      formMessage.className = 'form-message error';
      formMessage.textContent = `Erro ao enviar comentário: ${err.message}`;
    }
  });
}
async function prefillNameFromProfile(user) {
  if (!nameInput) return;
  let name = user?.displayName || '';
  try {
    const snap = await getDoc(doc(db, 'users', user.uid));
    if (snap.exists()) {
      const data = snap.data();
      if (data?.name) name = data.name;
    }
  } catch { /* noop */ }
  // Fallback: se não houver nome no perfil, usa a parte local do email
  if (!name) {
    const email = user?.email || '';
    name = email ? email.split('@')[0] : '';
  }
  if (name) {
    nameInput.value = name;
    nameInput.setAttribute('readonly', 'true');
  }
}