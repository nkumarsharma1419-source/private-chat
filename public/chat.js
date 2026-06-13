const socket = io();

const user =
localStorage.getItem("user")
|| "Guest";

const msg =
document.getElementById("msg");

const messages =
document.getElementById("messages");

const sendBtn =
document.getElementById("sendBtn");

sendBtn.addEventListener(
"click",
sendMessage
);

msg.addEventListener(
"keypress",
function(e){
  if(e.key==="Enter"){
    sendMessage();
  }
}
);

socket.on(
"loadMessages",
(data)=>{
  data.forEach(addMessage);
}
);

socket.on(
"newMessage",
addMessage
);

function sendMessage(){

  const text =
  msg.value.trim();

  if(text===""){
    return;
  }

  socket.emit(
    "sendMessage",
    {
      sender:user,
      text:text
    }
  );

  msg.value="";
}

function addMessage(data){

  const div =
  document.createElement("div");

  div.classList.add(
    "message"
  );

  if(
    data.sender===user
  ){
    div.classList.add("me");
  }
  else{
    div.classList.add("other");
  }

  div.innerHTML=
  `
  <div class="sender">
  ${data.sender}
  </div>

  <div>
  ${data.text}
  </div>
  `;

  messages.appendChild(div);

  messages.scrollTop =
  messages.scrollHeight;
}
socket.on(
  "onlineUsers",
  (count)=>{
    document.getElementById(
      "onlineCount"
    ).innerText =
    count + " Online";
  }
);