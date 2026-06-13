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
  const messages = document.getElementById("messages");

  const div = document.createElement("div");

  const me =
    msg.sender ===
    (localStorage.getItem("user") || "Guest");

  div.className =
    "message " + (me ? "me" : "other");

  const time =
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

  div.innerHTML = `
      <div class="sender">
        ${msg.sender}
      </div>

      <div>
        ${msg.text}
      </div>

      <div class="time">
        ${time}
      </div>
  `;

  messages.appendChild(div);
  messages.scrollTop =
    messages.scrollHeight;
}

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