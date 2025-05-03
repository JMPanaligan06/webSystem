// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBsMj6w3dA02DfWpARzznHYFE0UW9hvR-g",
  authDomain: "myproject-1af12.firebaseapp.com",
  projectId: "myproject-1af12",
  storageBucket: "myproject-1af12.appspot.com",
  messagingSenderId: "281695354421",
  appId: "1:281695354421:web:dad453bdf8f0650901bb7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference to table body
const tableBody = document.querySelector("#bookingTable tbody");

// Load bookings from Firestore
async function loadBookings() {
  const querySnapshot = await getDocs(collection(db, "weddingBookings"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const fullName = `${data.groomFname} & ${data.brideFname}`;
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${fullName}</td>
      <td>${doc.id}</td>
      <td>${data.status || "incomplete"}</td>
    `;

    tableBody.appendChild(row);
  });
}

// Initialize
loadBookings();
