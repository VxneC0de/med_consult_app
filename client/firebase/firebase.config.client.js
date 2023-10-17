import {
     initializeApp 
} 
from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDPgalqYfnXzAW6kQNyW4Kp9MRLxif39W4",
  authDomain: "medconsult-server-3351a.firebaseapp.com",
  projectId: "medconsult-server-3351a",
  storageBucket: "medconsult-server-3351a.appspot.com",
  messagingSenderId: "38958805386",
  appId: "1:38958805386:web:078b11b9ea083d45f19873"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app}