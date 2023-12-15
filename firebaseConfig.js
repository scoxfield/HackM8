// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAxkimXDkMaxpXSPHis_lUs57IvhEOWQ7k",
    authDomain: "hackmate-1e8a7.firebaseapp.com",
    projectId: "hackmate-1e8a7",
    storageBucket: "hackmate-1e8a7.appspot.com",
    messagingSenderId: "100644359250",
    appId: "1:100644359250:web:c845d1c211368e672b238b",
    measurementId: "G-00Y58ZFTMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);