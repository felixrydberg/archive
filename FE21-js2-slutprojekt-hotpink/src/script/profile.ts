import { DataSnapshot, get, ref, remove } from 'firebase/database';
import { db } from './modules/db';
import navToggle from './modules/navtoggle';

((): void => {
  // If user is logged in
  if (sessionStorage.getItem('login')) {
    const getUser = async (): Promise<void> => {
      // catch correct username to display
      const userName =
        sessionStorage.getItem('name') === null
          ? sessionStorage.getItem('name')
          : sessionStorage.getItem('profile');

      await get(ref(db, `/users/${userName.toLowerCase()}`)).then(
        (snapshot: DataSnapshot): void => {
          let firstName = document.getElementById('username');
          let biography = document.getElementById('bio');
          if (snapshot.exists()) {
            const { bio, img, username } = snapshot.val();

            let profilePicture = <HTMLImageElement>(
              document.getElementById('profilepic')
            );
            profilePicture.src = img;
            firstName.innerText = username;
            biography.innerText = bio;

            // If user is owner of profile, add listener that allows user to delete account
            // clear sessionstorage and sends user to startpage
            if (sessionStorage.getItem('name') === userName) {
              const removeAccount: HTMLButtonElement =
                document.querySelector('.remove-profile');
              removeAccount.addEventListener('click', (e: MouseEvent): void => {
                e.preventDefault();
                const dbRef = ref(db, `/users/${userName}`);
                remove(dbRef);
                sessionStorage.clear();
                window.location.replace('./index.html');
              });
            }
          } else {
            firstName.innerText = 'No such user';
            biography.innerText =
              'If this user ever existed will remain one of lifes great unsolved mysteries';
          }
        }
      );
    };
    getUser();
  } else {
    window.location.replace('/');
  }

  navToggle();
})();
