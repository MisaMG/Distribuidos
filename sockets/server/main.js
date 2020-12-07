const { SSL_OP_NO_TLSv1_1 } = require('constants');
let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

let messages =[{
    id:1,
    text: "Hola, soy un mensaje",
    autor: "Alan A.M"
}]

app.use(express.static('public'));

app.get('/', function(req, res){
    res.status(200).send("Se hizo la machaca, alguien se ha conectado con socket al servidor");
});

io.on('connection', function(socket){
    console.log("Alguien se ha conectado con sockets");
    socket.emit('messages', messages);

    socket.on('new-message', function(data){
        messages.push(data);
        io.sockets.emit('messages', messages);
        
    }
    );
    socket.on('end', function() {

        console.log('EOT (End Of Transmission)');
    });
});

server.listen(8080, function(){
    console.log("Servidor corriendo en http://localhost:8080");
});