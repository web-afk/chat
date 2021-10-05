const socket = io();

//DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let output = document.getElementById('output');
let send = document.getElementById('send');
let actions = document.getElementById('actions');

send.addEventListener('click',()=>{
    socket.emit('chat:message',{
        message : message.value,
        username : username.value
    });
    message.value='';
});

message.addEventListener('keypress',()=>{
    socket.emit('chat:typing', username.value)
})

socket.on('chat:message',(data)=>{
    actions.innerHTML='';    
    output.innerHTML += `<p>
    <strong>${data.username}</strong> : ${data.message}</p>`;
});

socket.on('chat:typing',(data)=>{
    actions.innerHTML = `<p><em>${data}</em> is typing a message ...</p>`;
});