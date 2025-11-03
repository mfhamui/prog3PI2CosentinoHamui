import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCbiRzYOjGASTmRfhTZXkb7DQjgF0PqxdQ",
    authDomain: "proyectointegrador2-d44b0.firebaseapp.com",
    projectId: "proyectointegrador2-d44b0",
    storageBucket: "proyectointegrador2-d44b0.firebasestorage.app",
    messagingSenderId: "444412296957",
    appId: "1:444412296957:web:50126ba1849c928e66c894"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
