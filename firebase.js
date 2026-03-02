import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// YOUR CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBTPmM7CscEENXHIWWj4SnEcYUVuO35wVM",
  authDomain: "wellness-basket-12465.firebaseapp.com",
  projectId: "wellness-basket-12465",
  storageBucket: "wellness-basket-12465.firebasestorage.app",
  messagingSenderId: "322509208088",
  appId: "1:322509208088:web:2749b20d0c810993ac616d",
  measurementId: "G-H74ZKE3BH7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("feedback");
  const loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener("click", async () => {
    await signInWithPopup(auth, provider);
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      loginBtn.style.display = "none";
      form.style.display = "block";
    } else {
      form.style.display = "none";
      loginBtn.style.display = "block";
    }
  });

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = auth.currentUser;
  if (!user) return alert("Please login first.");

  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !message) return alert("Please fill both fields");

  await addDoc(collection(db, "feedbacks"), {
    name,
    message,
    userId: user.uid,
    createdAt: new Date()
  });

  form.reset();
  document.getElementById("name").focus(); // focus back for next input
});
