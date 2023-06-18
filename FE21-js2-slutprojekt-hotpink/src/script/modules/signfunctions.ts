import { db } from './db';
import { ref, get } from 'firebase/database';

// Kollar om användarnamnet finns i Databasen
export async function userAvailable(name): Promise<boolean> {
  const snapshot = get(ref(db, `users/${name}`));
  if ((await snapshot).exists()) {
    return true;
  } else {
    console.log('false');
    return false;
  }
}

// Kollar om lösenorden matchar
export const pwdMatch = (pwd1, pwd2): boolean => {
  if (pwd1 === pwd2) {
    return false;
  } else {
    return true;
  }
};

// Kollar om lösenordet uppfyller kraven för lösenord
export const pwdSpec = (pwd1): boolean => {
  // Regex för att se om lösenordet uppfyller kravn: 8-32 karaktärer, om den innehåller Stora och små bokstäver, nummer och #¤!?* (Speciella tecken)
  const filter =
    /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[\d|@#$!%*?&])[\p{L}\d@#$!%*?&]{8,32}$/gu;
  if (pwd1.match(filter)) {
    return false;
  } else {
    return true;
  }
};

// Kollar om lösenordet matchar användarnamnet
export async function checkPwd(name, pwd): Promise<boolean> {
  const snapshot = get(ref(db, `/users/${name}`));

  if ((await snapshot).exists()) {
    if ((await (await snapshot).val().pwd) === pwd) {
      return false;
    } else {
      return true;
    }
  }
}
