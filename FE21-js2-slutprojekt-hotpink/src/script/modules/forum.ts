import { db } from './db';
import { DataSnapshot, onValue, ref } from 'firebase/database';
import { createPostgui } from './displayBoard';
import navToggle from './navtoggle';

((): void => {
  // Simply calls function to build posts if any changes happen in database
  const dbRef = ref(db, '/posts');
  onValue(dbRef, (snapshot: DataSnapshot): void => createPostgui());
  navToggle();
})();
