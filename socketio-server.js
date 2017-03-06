var server = require('http').createServer();
var io     = require('socket.io')(server);
var debug  = require('debug')('socketio-server');

io.on('connection', function(socket) {
  debug('Cliente conectado');

  socket.on('crear_nuevo_pedido', function(pedido) {
    debug('Evento "crear_nuevo_pedido" recibido');
    debug(pedido);
    socket.broadcast.emit('creado_nuevo_pedido', pedido);
  });
});

server.listen(2021);
debug('Servidor socket.io escuchando en puerto 2021...');
