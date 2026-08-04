// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe3QzO5jkgYz5VM_cQX0Mu6gSNwA6ZWF0",
  authDomain: "lohoption-65ac1.firebaseapp.com",
  projectId: "lohoption-65ac1",
  storageBucket: "lohoption-65ac1.firebasestorage.app",
  messagingSenderId: "343245086859",
  appId: "1:343245086859:web:c226f760cbc302949c348e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Login
window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful!");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};

// Register
window.register = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
   .then(async (userCredential) => {
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    balance: 10000,
    createdAt: new Date().toISOString()
  });

  alert("Account created successfully!");
  window.location.href = "login.html";
})
    .catch((error) => {
      alert(error.message);
    });
};// Display logged-in user's email on the dashboard
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const welcome = document.getElementById("welcome");
    const userEmail = document.getElementById("userEmail");

    if (welcome) {
      welcome.textContent = "Welcome, " + user.email;
    }

    if (userEmail) {
      const userDoc = await getDoc(doc(db, "users", user.uid));

if (userDoc.exists()) {
  const data = userDoc.data();

  const balance = document.getElementById("balance");

  if (balance) {
    balance.textContent = "$" + Number(data.balance).toFixed(2);
  }

  console.log("Firestore data:", data);
} else {
  console.log("User document not found.");
}
        userEmail.textContent =
          "Email: " + data.email + " | Balance: $" + data.balance;
      } else {
        userEmail.textContent = "Email: " + user.email;
      }
    }
  }
});
