const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 2000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server); // allows for emitting and receiving events
//socket.emit sends to just one connected host
//io.emit sends to all connected host

io.on('connection', (socket)=>{
    console.log('New User Connected');

    socket.emit('newEmail', {
        from:'mike@example.com',
        text:'yo homey my homey',
        createdAt: new Date().getTime()
    });

    socket.on('sendEmail',(data)=>{
        console.log(data.newEmail);
        io.emit('newEmail',{
            text: data.text,
            from: data.from,
            createdAt: data.createdAt
        });
    });

    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });


});



app.use(express.static(publicPath));
//console.log(__dirname+ '/../public');


server.listen(port);
console.log('listening on port '+ port);
console.log(process.env.PORT);