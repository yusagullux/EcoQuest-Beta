import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC52G-pG-QPY0JDxFRADxb2EXXwPyXTUGc",
  authDomain: "ecoquest-9332a.firebaseapp.com",
  projectId: "ecoquest-9332a",
  storageBucket: "ecoquest-9332a.firebasestorage.app",
  messagingSenderId: "9456851024",
  appId: "1:9456851024:web:c01b6bef0fbf4f7ce61955",
  measurementId: "G-QEMD4CHE5S"
};

const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, analytics };

