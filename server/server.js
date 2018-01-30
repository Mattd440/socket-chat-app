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


const {generateMessage, generateLocationMessage} = require('./utils/message');
io.on('connection', (socket)=> {
    console.log('New User Connected');

    socket.emit('newEmail', generateMessage('Admin','Welcome Bitch'));

    socket.on('sendEmail', (data) => {
        console.log(data.from);
        io.emit('newEmail',{
            text: data.text,
            from: data.from,
            createdAt: data.createdAt
        });

        // this resend message to everybody but the sender
        //socket.broadcast.emit('newEmail', generateMessage('Admin', 'New User Joined'));
    });


    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('createMessage', (data, callback)=>{
        console.log(data);
        callback({
            text:'this is from the server'
        }); //sends acknowledgement back to emmitter
    });


    // receives the location
    socket.on('createdLocationMessage', (coords)=>{
        io.emit('newLocation', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });


});




app.use(express.static(publicPath));
//console.log(__dirname+ '/../public');


server.listen(port);
console.log('listening on port '+ port);
console.log(process.env.PORT);