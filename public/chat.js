const socket = io();

const user =
  localStorage.getItem("user") || "Guest";

const msgInput =
  document.getElementById("msg");

const messages =
  document.getElementById("messages");

const sendBtn =
  document.getElementById("sendBtn");

socket.on("loadMessages", (msgs) => {
  msgs.forEach(addMessage);
});

socket.on("newMessage", (msg) => {
  addMessage(msg);
});

sendBtn.addEventListener(
  "click",
  sendMessage
);

msgInput.addEventListener(
  "keypress",
  (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }
);

function sendMessage() {
  const text =
    msgInput.value.trim();

  if (!text) return;

  socket.emit("sendMessage", {
    sender: user,
    text: text
  });

  msgInput.value = "";
}

function addMessage(msg) {
  const div =
    document.createElement("div");

  div.classList.add("message");

  if (msg.sender === user) {
    div.classList.add("me");
  } else {
    div.classList.add("other");
  }

  div.innerHTML =
    "<strong>" +
    msg.sender +
    "</strong><br>" +
    msg.text;

  messages.appendChild(div);

  messages.scrollTop =
    messages.scrollHeight;
}