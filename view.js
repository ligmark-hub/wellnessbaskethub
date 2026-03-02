import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Replace with your config
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

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("allFeedbacks");
  if (!container) return;

  // Real-time updates
  const q = query(collection(db, "feedbacks"), orderBy("createdAt", "desc"));

  onSnapshot(q, (snapshot) => {
    container.innerHTML = ""; // clear existing
    if (snapshot.empty) {
      container.innerHTML = "<p>No feedback submitted yet.</p>";
      return;
    }

    snapshot.forEach((doc) => {
      const data = doc.data();
      const div = document.createElement("div");
      div.innerHTML = `<p>"${data.message}"</p><strong>- ${data.name}</strong><hr>`;
      container.appendChild(div);
    });
  });
});
