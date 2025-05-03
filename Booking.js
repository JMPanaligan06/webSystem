// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsMj6w3dA02DfWpARzznHYFE0UW9hvR-g",
  authDomain: "myproject-1af12.firebaseapp.com",
  projectId: "myproject-1af12",
  storageBucket: "myproject-1af12.firebasestorage.app",
  messagingSenderId: "281695354421",
  appId: "1:281695354421:web:dad453bdf8f0650901bb7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to handle form submission and add data to Firestore
const weddingForm = document.getElementById("weddingForm");

if (weddingForm) {
  weddingForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form submission

    // Collect form data
    const groomFname = document.getElementById("groomFname").value;
    const groomLname = document.getElementById("groomLname").value;
    const brideFname = document.getElementById("brideFname").value;
    const brideLname = document.getElementById("brideLname").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
    const date = document.getElementById("date").value;
    const venue = document.getElementById("venue").value;
    const pax = document.getElementById("pax").value;
    const location = document.getElementById("location").value;

    // Get selected radio values
    const photographers = document.querySelector('input[name="photographers"]:checked')?.value;
    const caterings = document.querySelector('input[name="caterings"]:checked')?.value;
    const entertainers = document.querySelector('input[name="entertainers"]:checked')?.value;

    // Add data to Firestore
    try {
      await addDoc(collection(db, "weddingBookings"), {
        groomFname,
        groomLname,
        brideFname,
        brideLname,
        email,
        contact,
        date,
        venue,
        pax,
        location,
        photographers,
        caterings,
        entertainers,
        status: "incomplete", // Default status
        createdAt: new Date()
      });

      alert("Booking successfully submitted!");
      weddingForm.reset(); // Reset the form after submission
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting the form. Please try again.");
    }
  });
}

// Function to fetch and display all bookings
async function fetchBookings() {
  const bookingsCollection = collection(db, "weddingBookings");
  const querySnapshot = await getDocs(bookingsCollection);

  // Check if the booking table body exists
  let bookingTableBody = document.getElementById("bookingTableBody");
  
  // If the element doesn't exist, create it dynamically
  if (!bookingTableBody) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const headerRow = document.createElement("tr");
    const nameHeader = document.createElement("th");
    nameHeader.textContent = "Name";
    headerRow.appendChild(nameHeader);
    const referenceHeader = document.createElement("th");
    referenceHeader.textContent = "Reference";
    headerRow.appendChild(referenceHeader);
    const statusHeader = document.createElement("th");
    statusHeader.textContent = "Status";
    headerRow.appendChild(statusHeader);

    thead.appendChild(headerRow);
    table.appendChild(thead);
    table.appendChild(tbody);
    document.body.appendChild(table); // Appending the table to the body

    bookingTableBody = tbody; // Set the tbody as the table body for adding rows
  }

  // Clear any previous bookings
  bookingTableBody.innerHTML = ''; 

  // Loop through the Firestore documents and add rows to the table
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = `${data.groomFname} ${data.groomLname} & ${data.brideFname} ${data.brideLname}`;
    row.appendChild(nameCell);

    const referenceCell = document.createElement("td");
    referenceCell.textContent = doc.id; // Use Firestore document ID as reference
    row.appendChild(referenceCell);

    const statusCell = document.createElement("td");
    const status = data.status === "complete" ? "✔" : "X";
    statusCell.classList.add(status === "✔" ? "complete" : "incomplete");
    statusCell.textContent = status;
    row.appendChild(statusCell);

    bookingTableBody.appendChild(row);
  });
}

// Fetch bookings when the page loads
window.onload = fetchBookings;
