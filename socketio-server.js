const server = require('http').createServer();
const io     = require('socket.io')(server);
const debug  = require('debug')('socketio-server');

const events = [
  'nuevo_pedido_creado',
  'pedido_descartado',
  'pedido_enviado',
  'pedido_entregado',
];

io.on('connection', function(socket) {
  debug('Cliente conectado');

  events.forEach(function(event) {
    socket.on(event, function(data) {
      debug('----------------------------------------------------------')
      debug('Nuevo evento "' + event + '" con ' + JSON.stringify(data));
      socket.broadcast.emit(event, data);
    });
  });
});

server.listen(2021);
debug('Servidor socket.io escuchando en puerto 2021...');
