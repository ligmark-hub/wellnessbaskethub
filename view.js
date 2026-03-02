import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBTPmM7CscEENXHIWWj4SnEcYUVuO35wVM",
  authDomain: "wellness-basket-12465.firebaseapp.com",
  projectId: "wellness-basket-12465",
  storageBucket: "wellness-basket-12465.firebasestorage.app",
  messagingSenderId: "322509208088",
  appId: "1:322509208088:web:2749b20d0c810993ac616d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("allFeedbacks");

  if (!container) return;

  const querySnapshot = await getDocs(collection(db, "feedbacks"));

  if (querySnapshot.empty) {
    container.innerHTML = "<p>No feedback submitted yet.</p>";
    return;
  }

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.innerHTML = `<p>"${data.message}"</p><strong>- ${data.name}</strong><hr>`;
    container.appendChild(div);
  });
});
