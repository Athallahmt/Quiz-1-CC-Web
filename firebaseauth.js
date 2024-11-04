// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA4t5pQ0-yN9AowX7B7GotUckxELVFDfFQ",
  authDomain: "login-form-88b5f.firebaseapp.com",
  projectId: "login-form-88b5f",
  storageBucket: "login-form-88b5f.appspot.com",
  messagingSenderId: "339084094558",
  appId: "1:339084094558:web:c3db5dd613d79e8102d8cf"
};

const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const firstName = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;
  const isAdmin = true; // Set admin role here for demonstration

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        isAdmin: false // Add isAdmin field
      };
      showMessage('Account Created Successfully', 'signUpMessage');
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = 'index.html';
        })
        .catch((error) => {
          console.error("Error writing document", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email Address Already Exists !!!', 'signUpMessage');
      } else {
        showMessage('Unable to create User', 'signUpMessage');
      }
    });
});

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const auth = getAuth();
  const db = getFirestore();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userDoc = await getDoc(doc(db, "users", user.uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData.isAdmin) {
        showMessage('Admin login successful', 'signInMessage');
        window.location.href = 'about.html';
      } else {
        showMessage('User login successful', 'signInMessage');
        window.location.href = 'home.html';
      }
    } else {
      showMessage('User data not found', 'signInMessage');
    }
  } catch (error) {
    const errorCode = error.code;
    if (errorCode === 'auth/invalid-credential') {
      showMessage('Incorrect Email or Password', 'signInMessage');
    } else {
      showMessage('Account does not exist', 'signInMessage');
    }
  }
});
