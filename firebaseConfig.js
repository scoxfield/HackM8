// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, initializeAuth, getReactNativePersistence } from '@firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getDatabase} from "@firebase/database";
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
    measurementId: "G-00Y58ZFTMN",
    databaseURL:"https://hackmate-1e8a7-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth, database };