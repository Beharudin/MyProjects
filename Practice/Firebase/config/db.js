import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCk-NR-BHcRWoD1fIvoLndg-PQPsHHbOWI",
  authDomain: "nodejs-api-7a629.firebaseapp.com",
  projectId: "nodejs-api-7a629",
  storageBucket: "nodejs-api-7a629.appspot.com",
  messagingSenderId: "885104028260",
  appId: "1:885104028260:web:862b1fd7a559dcfd218d71"
};

//init firebase app
initializeApp(firebaseConfig);

//init services
const db=getFirestore();

export default db;

