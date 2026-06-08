function addMessage(msg) {

  const messages = document.getElementById("messages");

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