const socket = io();

const user = localStorage.getItem("user") || "Guest";
const message = document.getElementById("msg");
const messages = document.getElementById("messages");

socket.on("loadMessages", msgs => {
  msgs.forEach(addMessage);
});

socket.on("newMessage", addMessage);

function sendMessage() {
  if (!message.value.trim()) return;

  socket.emit("sendMessage", {
    sender: user,
    text: message.value
  });

  message.value = "";
}

function addMessage(msg) {
  const div = document.createElement("div");

  div.classList.add("message");

  div.innerHTML = `
    <div class="avatar">
      ${msg.sender.charAt(0).toUpperCase()}
    </div>

    <div class="content">
      <div class="username">${msg.sender}</div>
      <div class="text">${msg.text}</div>
    </div>
  `;

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}
const typing = document.getElementById('typing');

message.addEventListener('input', () => {
    socket.emit('typing', user);
});

socket.on('typing', (name) => {
    typing.innerText = `${name} is typing...`;

    clearTimeout(window.typingTimer);

    window.typingTimer = setTimeout(() => {
        typing.innerText = '';
    }, 1500);
});
socket.on('onlineUsers', (count) => {
    document.getElementById('count').innerText = count;
});