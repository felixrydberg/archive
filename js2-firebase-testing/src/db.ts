import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAfwzhxNFT9K-0X-cIGTyIohG0yt7EHOug",
  authDomain: "fir-lib-48eb1.firebaseapp.com",
  databaseURL: "https://fir-lib-48eb1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-lib-48eb1",
  storageBucket: "fir-lib-48eb1.appspot.com",
  messagingSenderId: "794786736443",
  appId: "1:794786736443:web:038c2665c2dbff07ba2f1e"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app); //Databasen
