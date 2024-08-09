class Database {
  constructor() {
    this.database = {};
  }

  createMessage(message) {
    const id = getNextId();
    console.log(message);
    message.id = id;
    localStorage.setItem("id_message", id);
    const messagesStorage = localStorage.getItem("messages");
    let updateMessages = [];
    if (messagesStorage) {
      try {
        updateMessages = JSON.parse(messagesStorage);
        if (!Array.isArray(updateMessages)) updateMessages = [];
      } catch (e) {
        updateMessages = [];
      }
    }
    updateMessages = [...updateMessages, message];
    localStorage.setItem("messages", JSON.stringify(updateMessages));
  }
}
const database = new Database();

class Message {
  constructor(name, email, message) {
    this.name = name;
    this.email = email;
    this.message = message;
  }
}

function getNextId() {
  if (!localStorage.getItem("id_message")) {
    localStorage.setItem("id_message", 0);
  }
  return parseInt(localStorage.getItem("id_message")) + 1;
}

function sendMessage() {
  const name = document.getElementById("validationCustom01").value;
  const email = document.getElementById("validationCustom02").value;
  const message = document.getElementById("validationCustom03").value;
  if (validate()) {
    const newMessage = new Message(name, email, message);
    database.createMessage(newMessage);
    openModal();
    request("home");
  }
}

function validate() {
  const forms = document.querySelectorAll(".needs-validation");
  let isValid = true;
  forms.forEach((form) => {
    if (!form.checkValidity()) {
      isValid = false;
    }
    form.classList.add("was-validated");
  });
  return isValid;
}

function clearForm() {}

function openModal() {
  const myModal = new bootstrap.Modal(document.getElementById("modal"));
  myModal.show();
}
