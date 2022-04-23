let socket = io();

let params = new URLSearchParams( window.location.search)

    if (!params.has('name') || !params.has('room')) {
        window.location = 'index.html';
        throw new Error('El nombre y salas son necesarios');
    }

let user = {
    name: params.get('name'),
    room: params.get('room')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('onChat', user, function ( resp ) {
        console.log('Usuarios conectados', resp);
    } );
});

// Listen
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

// Send Information
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Listen Information
socket.on('createMessage', function(mensaje) {
    console.log('Servidor:', mensaje);
});

// Listen users changed
// user login or logout in a chat room
socket.on('listPerson', function(persons) {
    console.log(persons);
});

// Listen private messages
socket.on('privateMessage', function (message) {
    console.log('Mensaje Privado', message);
})

//
