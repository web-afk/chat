const express = require('express');
const path = require('path');
//colorea la consola
const colors = require('colors');

const app = express();

//Configuración
app.set('port',process.env.PORT || 5000);

//static file
app.use(express.static(path.join(__dirname,'public')));

//Inicializando servidor
const server = app.listen(app.get('port'),()=> console.log(`Server on port ${app.get('port')}`.rainbow));

const SocketIO = require('socket.io');
const io = SocketIO(server);

//websockets
io.on('connection',(socket)=>{
    console.log(`new user, id:`.magenta,`${socket.id}`.cyan);

    socket.on('chat:message',(data)=>{
        io.sockets.emit('chat:message',data);
    });

    socket.on('chat:typing',(dato)=>{
        socket.broadcast.emit('chat:typing',dato);
    });
}); 