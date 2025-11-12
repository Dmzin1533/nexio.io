// Configuração centralizada do Firebase (Web v10 - Modular, via CDN)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js';

// Credenciais reais do seu projeto Firebase
export const firebaseConfig = {
  apiKey: 'AIzaSyBZKJlc2apOpVr1yiorclRRVjcngNrMiuQ',
  authDomain: 'nexioportfolio.firebaseapp.com',
  projectId: 'nexioportfolio',
  storageBucket: 'nexioportfolio.appspot.com',
  messagingSenderId: '900969678027',
  appId: '1:900969678027:web:17f289da13e20d365d074e'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Definição de admin para permissões especiais no app
export const ADMIN_EMAIL = 'admin@nexioportfolio.com';