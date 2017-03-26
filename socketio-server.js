const server = require('http').createServer();
const io     = require('socket.io')(server);
const debug  = require('debug')('socketio-server');

const events = [
  'creado_nuevo_pedido',
  'descartado_pedido',
  'enviado_pedido'
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
