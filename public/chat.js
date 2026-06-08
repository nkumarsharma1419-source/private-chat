const socket = io();
const user = localStorage.getItem("user") || "Guest";
const message = document.getElementById("msg");
const messages = document.getElementById("messages");
socket.on('loadMessages', m => m.forEach(addMessage));
socket.on('newMessage', addMessage);
function sendMessage() {
    socket.emit('sendMessage', {
        sender: user,
        text: message.value
    });

    message.value = "";
}
function addMessage(msg) {
    const li = document.createElement('li');
    li.innerHTML = '<b>' + msg.sender + '</b>: ' + msg.text;
    messages.appendChild(li);
}