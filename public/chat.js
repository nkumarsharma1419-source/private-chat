const socket=io();
const user=localStorage.getItem('user')||'Guest';
socket.on('loadMessages',m=>m.forEach(addMessage));
socket.on('newMessage',addMessage);
function send(){
socket.emit('sendMessage',{sender:user,text:message.value});
message.value='';
}
function addMessage(msg){
const li=document.createElement('li');
li.innerHTML='<b>'+msg.sender+'</b>: '+msg.text;
messages.appendChild(li);
}
const socket = io();

function sendMessage() {
    const msg = document.getElementById("msg").value;

    if(msg.trim() === "") return;

    socket.emit("sendMessage", {
        user: "Guest",
        text: msg
    });

    document.getElementById("msg").value = "";
}