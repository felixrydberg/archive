import { db } from './modules/db';
import { ref, set } from 'firebase/database';
import { userAvailable, pwdMatch, pwdSpec } from './modules/signfunctions';
import User from './modules/user';
import navToggle from './modules/navtoggle';

(function () {
  // Gömmer och visar specifika knappar i naven
  navToggle();

  // Sätter Addeventlistner på Formen
  (function () {
    const form: HTMLElement = document.querySelector('.form-signup');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name: HTMLInputElement = document.querySelector('.form-name');
      const bio: HTMLInputElement = document.querySelector('.form-bio');
      const pwd1: HTMLInputElement = document.querySelector('.form-pwd1');
      const pwd2: HTMLInputElement = document.querySelector('.form-pwd2');
      const radio: NodeListOf<HTMLInputElement> =
        document.querySelectorAll('.form-radio');
      let img: string;

      radio.forEach((key: HTMLInputElement): void => {
        if (key.checked) {
          img = key.value;
        }
      });

      checkUser(
        name.value.toLowerCase(),
        bio.value,
        pwd1.value,
        pwd2.value,
        img
      );
    });
  })();

  // Kollar om användaren uppfyller x antal krav
  const checkUser = async (
    name: string,
    bio: string,
    pwd1: string,
    pwd2: string,
    img: string
  ) => {
    if (await userAvailable(name)) {
      console.log(`${name} is unavailable`);
    } else if (pwdMatch(pwd1, pwd2)) {
      console.log(`Pwd doesnt match`);
    } else if (pwdSpec(pwd1)) {
      console.log(`Pwd doesnt reach spec`);
    } else {
      addUser(new User(bio, img, pwd1, name.toLowerCase()));
    }
  };

  // Skapar posten i databasen och skickar användaren till index.html
  const addUser = (user: User) => {
    set(ref(db, `/users/${user.getName()}`), user);

    window.location.replace('./index.html');
  };
})();
