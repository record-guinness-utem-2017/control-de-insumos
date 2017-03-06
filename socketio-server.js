var server = require('http').createServer();
var io     = require('socket.io')(server);

io.on('connection', function(socket){
  socket.on('crear_nuevo_pedido', function(pedido) {
    console.log('Nuevo pedido creado.');
    socket.broadcast.emit('creado_nuevo_pedido', pedido);
  });
});

server.listen(2021);
console.log('Servidor socket.io escuchando en puerto 2021...');
