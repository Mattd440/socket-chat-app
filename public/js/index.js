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

socket.on('newLocation', function(message){
    // var msgs = document.querySelector('#messages');
    // var li = document.createElement('li');
    // li.innerHTML = location.from +' => ' + location.text  + ' ' + location.createdAt;
    // msgs.appendChild(li);

   // https://www.google.com/maps/?q=
    var msgs = document.querySelector('#messages');
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.innerHTML = 'My Currnet Location';
    a.target='_blank';
    a.href= message.url;
    li.innerText = message.from + ':  ';
    li.append(a);
    msgs.appendChild(li);




});

// using acknowledgement
var form = document.querySelector('#myform');
    form.addEventListener('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from:'bob',
        text: document.querySelectorAll('#mytext').value
    }, function(data){
        console.log('Got Acknowledgement');
        console.log(data.text);
    });
});


// geolocation feature


var locationBtn = document.querySelector('#location');
locationBtn.addEventListener('click', function(e) {
    if (!navigator.geolocation) {
        return alert('Geolocation Not Available');
    }
    // gets current coordinates
    navigator.geolocation.getCurrentPosition(function (position) {
        //alert(position.coords.longitude+','+position.coords.latitude+  ' is your position');
        //sends location to server
        socket.emit('createdLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    }, function (err) {
        alert('Unable To Fetch Location');
    });
});


function emitEmail(){
    var txt = document.querySelector('#myTxt').value;
    var from = document.querySelector('#from').value;

    socket.emit('sendEmail', {
       text: txt,
       from:from,
       createdAt: new Date().getTime()
    });
};