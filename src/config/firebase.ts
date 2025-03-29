import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAaOIZkIdbZ6v_PBE9EJbdwE7z0eaEzxxU",
    authDomain: "planning-forever.firebaseapp.com",
    projectId: "planning-forever",
    storageBucket: "planning-forever.appspot.com",
    messagingSenderId: "965289741787",
    appId: "1:965289741787:web:8e0a530889a28a43b02bfe",
    measurementId: "G-NLRWT8SBC0"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db }; 