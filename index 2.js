// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA4t5pQ0-yN9AowX7B7GotUckxELVFDfFQ",
  authDomain: "login-form-88b5f.firebaseapp.com",
  projectId: "login-form-88b5f",
  storageBucket: "login-form-88b5f.appspot.com",
  messagingSenderId: "339084094558",
  appId: "1:339084094558:web:c3db5dd613d79e8102d8cf"
};

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 const auth=getAuth();
 const db=getFirestore();

 onAuthStateChanged(auth, (user)=>{
   const loggedInUserId=localStorage.getItem('loggedInUserId');
   if(loggedInUserId){
       console.log(user);
       const docRef = doc(db, "users", loggedInUserId);
       getDoc(docRef)
       .then((docSnap)=>{
           if(docSnap.exists()){
               const userData=docSnap.data();
               document.getElementById('loggedUserFName').innerText=userData.firstName;
               document.getElementById('loggedUserEmail').innerText=userData.email;
               document.getElementById('loggedUserLName').innerText=userData.lastName;

           }
           else{
               console.log("no document found matching id")
           }
       })
       .catch((error)=>{
           console.log("Error getting document");
       })
   }
   else{
       console.log("User Id not Found in Local storage")
   }
 })

 const logoutButton=document.getElementById('logout');

 logoutButton.addEventListener('click',()=>{
   localStorage.removeItem('loggedInUserId');
   signOut(auth)
   .then(()=>{
       window.location.href='INDEX ASLI.html';
   })
   .catch((error)=>{
       console.error('Error Signing out:', error);
   })
 })