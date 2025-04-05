
const form = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');
const searchInput = document.getElementById('search');
let editingIndex = null;

window.onload = () => {
  displayContacts();
};

function getContacts() {
  return JSON.parse(localStorage.getItem('contacts')) || [];
}

function saveContacts(contacts) {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

function displayContacts(filter = "") {
  contactList.innerHTML = "";
  const contacts = getContacts();
  contacts.forEach((contact, index) => {
    const match = `${contact.name} ${contact.email} ${contact.phone}`.toLowerCase().includes(filter.toLowerCase());
    if (!filter || match) {
      const div = document.createElement("div");
      div.className = "contact";
      div.innerHTML = `
        <strong>${contact.name}</strong><br>
        Email: ${contact.email}<br>
        Phone: ${contact.phone}
        <div class="contact-actions">
          <button onclick="editContact(${index})">Edit</button>
          <button onclick="deleteContact(${index})" style="background-color: crimson; color: white;">Delete</button>
        </div>
      `;
      contactList.appendChild(div);
    }
  });
}

form.onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !email || !phone) {
    alert("All fields are required!");
    return;
  }

  let contacts = getContacts();

  const newContact = { name, email, phone };

  if (editingIndex === null) {
    contacts.push(newContact);
  } else {
    contacts[editingIndex] = newContact;
    editingIndex = null;
    form.querySelector('button[type="submit"]').textContent = "Add Contact";
  }

  saveContacts(contacts);
  form.reset();
  displayContacts(searchInput.value);
};

function editContact(index) {
  const contact = getContacts()[index];
  document.getElementById("name").value = contact.name;
  document.getElementById("email").value = contact.email;
  document.getElementById("phone").value = contact.phone;
  editingIndex = index;
  form.querySelector('button[type="submit"]').textContent = "Update Contact";
}

function deleteContact(index) {
  if (!confirm("Are you sure you want to delete this contact?")) return;
  let contacts = getContacts();
  contacts.splice(index, 1);
  saveContacts(contacts);
  displayContacts(searchInput.value);
}

function clearAllContacts() {
  if (confirm("Delete all contacts? This cannot be undone.")) {
    localStorage.removeItem('contacts');
    displayContacts();
  }
}

searchInput.addEventListener("input", () => {
  displayContacts(searchInput.value);
});

