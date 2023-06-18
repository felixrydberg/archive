import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyD33ogB_ziq_KJthXw6Eymfe85XyM28Qa0',
  authDomain: 'hotpink-a9449.firebaseapp.com',
  databaseURL:
    'https://hotpink-a9449-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'hotpink-a9449',
  storageBucket: 'hotpink-a9449.appspot.com',
  messagingSenderId: '539798814024',
  appId: '1:539798814024:web:cd59108fc95c3722efc77d',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);


