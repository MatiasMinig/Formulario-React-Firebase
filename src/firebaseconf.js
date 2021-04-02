import firebase from 'firebase/app';
import 'firebase/firestore'

const config = {
        apiKey: "AIzaSyApq4jLt6eM028C2nEWf-D6u8YehmTmOes",
        authDomain: "prueba-react-formulario2.firebaseapp.com",
         projectId: "prueba-react-formulario2",
        storageBucket: "prueba-react-formulario2.appspot.com",
        messagingSenderId: "875521204538",
        appId: "1:875521204538:web:a2f285b52a6c4eae6d7003"
};
// initialize Firebase
const fireb = firebase.initializeApp(config);
const store = fireb.firestore();

export {store}