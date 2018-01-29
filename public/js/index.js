var socket =  io(); // makes request to initiate a socket


socket.on('connect', function(){
    console.log('Connected to Server');
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('newEmail', function (data){
   console.log('New Email');
   console.log(data.text + data.createdAt + data.from);

   var msgs = document.querySelector('#messages');
   var li = document.createElement('li');
   li.innerHTML = data.from + ':  ' + data.text;
   msgs.appendChild(li);
});

function emitEmail(){
    var txt = document.querySelector('#myTxt').value;
    var from = document.querySelector('#from').value;

    socket.emit('sendEmail', {
       text: txt,
       from:from,
       createdAt: new Date().getTime()
    });
}