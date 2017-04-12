class PedidosTable {

  constructor(table, socket = null) {
    this.table   = $(table);
    this.pedidos = [];
    this.socket  = socket;
  }

  init(loadParams = {}) {
    this.loadPedidos(loadParams);
    this.bindEvents();
    this.bindSocketIoEvents();
  }

  loadPedidos(params = {}) {
    $.ajax({
      type: 'get',
      url: '/ajax/pedidos/index.php',
      data: params,
      error: function() {
        $('.loading').trigger('loading.done');
        BootstrapDialog.alert('Ocurrió un error al contactar al servidor.');
      },
      success: function(response) {
        this.pedidos = response.objetos;
        this.fillUpTable();
      }.bind(this),
    });
  }

  bindEvents() {
    const self = this;

    this.table.on('click', '.atender', function() { self.onAtenderClick(this, self) });
    this.table.on('click', '.descartar', function() { self.onDescartarClick(this, self) });
  }

  bindSocketIoEvents() { }

  fillUpTable() {
    const cuerpo     = this.table.find('tbody');
    const sinPedidos = this.table.parent().find('.sin-pedidos');

    cuerpo.html('');

    if (this.pedidos.length > 0) {
      let elemento;
      for (var i = 0; i < this.pedidos.length; i++) {
        elemento = this.newRowForPedido( this.pedidos[i] );
        cuerpo.append(elemento);
      }

      // Mostrar tabla. Ocultar mensaje "sin pedidos"
      this.table.show();
      sinPedidos.hide();
    } else {
      // Ocultar tabla. Mostrar mensaje "sin pedidos"
      this.table.hide();
      sinPedidos.show();
    }
  }

  newRowForPedido(pedido) {
    return $(
      '<tr id="pedido-' + pedido.id + '">' +
        '<td class="text-center">' + pedido.id + '</td>' +
        '<td class="text-center">' + pedido.insumo.nombre + '</td>' +
        '<td class="text-center">' + pedido.cantidad + '</td>' +
        '<td class="text-center">' + pedido.unidad + '</td>' +
        '<td class="text-center">' + pedido.mesa.nombre + '</td>' +
        '<td class="text-center">' + pedido.encargado_por.nombre_completo + '</td>' +
        '<td class="text-center">' + pedido.creado_en + '</td>' +
        '<td class="text-center">' + this.newActionButtonsForPedido(pedido).get(0).outerHTML + '</td>' +
      '</tr>'
    );
  }

  newActionButtonsForPedido(pedido) {
    return $('<div class="text-center"></div>')
      .append( $('<p><button class="btn btn-primary atender" data-pedido-id="' + pedido.id + '">Atender</button></p>') )
      .append( $('<p><button class="btn btn-danger descartar" data-pedido-id="' + pedido.id + '">Descartar</button></p>') )
  }

  prependPedido(pedido) {
    this.pedidos.unshift(pedido);
    this.table.prepend( this.newRowForPedido(pedido).addClass('success') );

    setTimeout(function() { $('tr.success').removeClass('success'); }, 3000);

    this.showTableIfNeeded();
  }

  getSinglePedido(id, callback) {
    $.get('/ajax/pedidos/index.php?id=' + id, function(response) {
      let pedido = response.objetos[0];
      callback(pedido);
    });
  }

  onDescartarClick(boton, self) {
    BootstrapDialog.confirm({
      title: 'Confirmar descarte de pedido',
      message: '<p>Para confirmar el descarte de este pedido escribe su ID y haz clic en <b class="text-danger">Descartar</b>.</p>' +
               '<p><input type="text" id="descartar-id" class="form-control"></p>' +
               '<input type="hidden" id="descartar-hidden" value="' + $(boton).data('pedido-id') + '">',
      btnOKLabel: 'Descartar',
      btnOKClass: 'btn-danger',
      btnCancelLabel: 'Cancelar',
      callback: function(descartar) {
        if ( ! descartar) return;

        const dialog     = this.dialog;
        const pedidoId   = dialog.$modalBody.find('#descartar-hidden').val();
        const confirmado = dialog.$modalBody.find('#descartar-id').val() == pedidoId;
        if ( ! confirmado) {
          dialog.$modalBody.find('#descartar-id').tooltip({ title: 'ID de pedido incorrecto.', }).tooltip('show');
          return false;
        }

        this.disable();
        this.spin();

        $.get('/ajax/pedidos/descartar.php?id=' + pedidoId, function() {
          self.dropPedido(pedidoId);
          dialog.close();
          BootstrapDialog.alert({
            title: '',
            message: 'Pedido descartado',
            type: BootstrapDialog.TYPE_INFO,
          });

          self.socket.emit('pedido_descartado', { id: pedidoId, user: localStorage['ids'] });
        });

        return false;
      }
    });
  }

  onAtenderClick(boton, self) {
    BootstrapDialog.confirm({
      title: 'Confirmar envío de pedido',
      message: 'Antes de marcar el pedido como enviado, revisa otra vez que el pedido se haya surtido como se ordenó. Si todo está ' +
               'en orden, haz clic en <b>Marcar como enviado</b>.' +
               '<input type="hidden" id="enviar-hidden" value="' + $(boton).data('pedido-id') + '">',
      btnOKLabel: 'Marcar como enviado',
      btnOKClass: 'btn-success',
      btnCancelLabel: 'Cancelar',
      callback: function(enviar) {
        if ( ! enviar) return;

        const dialog   = this.dialog;
        const pedidoId = dialog.$modalBody.find('#enviar-hidden').val();

        this.disable();
        this.spin();

        $.post('/ajax/pedidos/atender.php', { id: pedidoId }, function() {
          self.dropPedido(pedidoId);
          dialog.close();
          BootstrapDialog.alert({
            title: '',
            message: 'Pedido marcado como enviado',
            type: BootstrapDialog.TYPE_SUCCESS,
          });

          self.socket.emit('pedido_enviado', { id : pedidoId, user: localStorage['ids'] });
        });

        return false;
      }
    });
  }

  dropPedido(pedidoId) {
    const index = this.pedidos.findIndex(function(pedido) { return pedido.id == pedidoId; });
    if (index >= 0) this.pedidos.splice(index, 1);

    this.table.find('#pedido-' + pedidoId).remove();

    this.showTableIfNeeded();
  }

  fetchAndPrependSinglePedido(id) {
    this.getSinglePedido(id, function(pedido) { this.prependPedido(pedido) }.bind(this));
  }

  showTableIfNeeded() {
    if (this.pedidos.length <= 0) {
      this.table.hide();
      this.table.parent().find('#sin-pedidos').show();
    } else {
      this.table.show();
      this.table.parent().find('#sin-pedidos').hide();
    }
  }

}

class AtenderPedidosTable extends PedidosTable {

  bindSocketIoEvents() {
    super.bindSocketIoEvents();

    this.socket.on('nuevo_pedido_creado', function(data) {
      this.fetchAndPrependSinglePedido(data.id)}.bind(this)
    );

    const removePedido = function(data) { this.dropPedido(data.id) }.bind(this);
    this.socket.on('pedido_enviado', removePedido).on('pedido_descartado', removePedido);
  }

}

class IndexPedidosTable extends PedidosTable {

  newRowForPedido(pedido) {
    return $(
      '<tr id="pedido-' + pedido.id + '">' +
        '<td class="text-center">' + pedido.id + '</td>' +
        '<td class="text-center">' + pedido.insumo.nombre + '</td>' +
        '<td class="text-center">' + pedido.cantidad + '</td>' +
        '<td class="text-center">' + pedido.unidad + '</td>' +
        '<td class="text-center">' + pedido.mesa.nombre + '</td>' +
        '<td class="text-center">' + pedido.creado_en + '</td>' +
        '<td class="text-center">' + this.newActionButtonsForPedido(pedido).get(0).outerHTML + '</td>' +
      '</tr>'
    );
  }

}

class MisPedidosTable extends IndexPedidosTable {

  loadPedidos(params = {}) {
    params.user = localStorage['ids'] || 0;
    super.loadPedidos(params);
  }

}

class MisPedidosEnviadosTable extends MisPedidosTable {

  newActionButtonsForPedido(pedido) {
    return $('<div class="text-center"></div>')
      .append( $('<p><button class="btn btn-success entregar" data-pedido-id="' + pedido.id + '">Marcar como recibido</button></p>') );
  }

  bindEvents() {
    const self = this;

    $(this.table).on('click', '.entregar', function() { self.onEntregarClick(this, self); });
  }

  onEntregarClick(button, self) {
    BootstrapDialog.confirm({
      title: 'Confirmar recepción de pedido',
      message: '¿Confirmas que el pedido llegó a la mesa correcta?',
      btnOKLabel: 'Confirmar',
      btnOKClass: 'btn-success',
      btnOKHotkey: 13,
      btnCancelLabel: 'Cancelar',
      callback: function(confirmar) {
        if ( ! confirmar) return;

        this.disable();
        this.spin();

        const dialog   = this.dialog;
        const pedidoId = $(button).data('pedido-id');
        self.markPedidoAsEntregado(pedidoId, self.afterMarkPedidoAsEntregado(dialog, pedidoId));

        return false;
      }
    });
  }

  markPedidoAsEntregado(id, callback) {
    $.ajax({
      type: 'post',
      url: '/ajax/pedidos/entregar.php',
      data: { id: id },
      success: function(response) { callback && callback(response); },
      error: function (response) {
        if (response.status == 422) {
          BootstrapDialog.alert({
            message: 'No se puede marcar este pedido como entregado. No hay suficiente insumo en almacen para surtirlo.',
            type: BootstrapDialog.TYPE_DANGER,
          });
        } else {
          BootstrapDialog.alert({
            message: 'Ocurrió un error al contactar al servidor. Intenta de nuevo o notifica a los administradores del sistema.',
            type: BootstrapDialog.TYPE_DANGER,
          });
        }
      }
    })
  }

  afterMarkPedidoAsEntregado(dialog, pedidoId) {
    const self = this;

    return function(response) {
      dialog.close();

      BootstrapDialog.alert({
        title: '',
        message: 'Pedido marcado como entregado.',
        type: BootstrapDialog.TYPE_SUCCESS,
      });

      self.dropPedido(pedidoId);
      self.socket.emit('pedido_entregado', {
        id: pedidoId,
        insumo: response.objetos[0].insumo,
        user: localStorage['ids'],
      });
    };
  }

  bindSocketIoEvents() {
    super.bindSocketIoEvents();

    this.socket.on('pedido_enviado', function(data) {
      if (localStorage['ids'] != data.user) return;

      this.fetchAndPrependSinglePedido(data.id)
    }.bind(this));

    this.socket.on('pedido_entregado', function(data) { this.dropPedido(data.id) }.bind(this));
  }

}

class MisPedidosPorAtenderTable extends MisPedidosTable {

  newActionButtonsForPedido(pedido) {
    return $('<div class="text-center"></div>')
      .append( $('<p><button class="btn btn-danger descartar" data-pedido-id="' + pedido.id + '">Descartar</button></p>') );
  }

  bindSocketIoEvents() {
    super.bindSocketIoEvents();

    this.socket.on('nuevo_pedido_creado', function(data) {
      if (localStorage['ids'] != data.user) return;

      this.fetchAndPrependSinglePedido(data.id);
    }.bind(this));

    const removePedido = function(data) { this.dropPedido(data.id) }.bind(this);
    this.socket.on('pedido_descartado', removePedido).on('pedido_enviado', removePedido);
  }

}

class MisPedidosDescartadosTable extends MisPedidosTable {

  newRowForPedido(pedido) {
    return $(
      '<tr id="pedido-' + pedido.id + '">' +
        '<td class="text-center">' + pedido.id + '</td>' +
        '<td class="text-center">' + pedido.insumo.nombre + '</td>' +
        '<td class="text-center">' + pedido.cantidad + '</td>' +
        '<td class="text-center">' + pedido.unidad + '</td>' +
        '<td class="text-center">' + pedido.mesa.nombre + '</td>' +
        '<td class="text-center">' + pedido.creado_en + '</td>' +
      '</tr>'
    );
  }

  bindSocketIoEvents() {
    super.bindSocketIoEvents();

    this.socket.on('pedido_descartado', function(data) {
      if (localStorage['ids'] != data.user) return;

      this.fetchAndPrependSinglePedido(data.id);
    }.bind(this));
  }

}

class MisPedidosEntregadosTable extends MisPedidosTable {

  newRowForPedido(pedido) {
    return $(
      '<tr id="pedido-' + pedido.id + '">' +
        '<td class="text-center">' + pedido.id + '</td>' +
        '<td class="text-center">' + pedido.insumo.nombre + '</td>' +
        '<td class="text-center">' + pedido.cantidad + '</td>' +
        '<td class="text-center">' + pedido.unidad + '</td>' +
        '<td class="text-center">' + pedido.mesa.nombre + '</td>' +
        '<td class="text-center">' + pedido.creado_en + '</td>' +
        '<td class="text-center">' + pedido.entregado_en + '</td>' +
      '</tr>'
    );
  }

  bindSocketIoEvents() {
    super.bindSocketIoEvents();

    this.socket.on('pedido_entregado', function(data) {
      if (localStorage['ids'] != data.user) return;

      this.fetchAndPrependSinglePedido(data.id);
    }.bind(this));
  }

}

class AdminPedidosEnviadosTable extends MisPedidosEnviadosTable {

  newRowForPedido(pedido) {
    return $(
      '<tr id="pedido-' + pedido.id + '">' +
      '<td class="text-center">' + pedido.id + '</td>' +
      '<td class="text-center">' + pedido.insumo.nombre + '</td>' +
      '<td class="text-center">' + pedido.cantidad + '</td>' +
      '<td class="text-center">' + pedido.unidad + '</td>' +
      '<td class="text-center">' + pedido.mesa.nombre + '</td>' +
      '<td class="text-center">' + pedido.encargado_por.nombre_completo + '</td>' +
      '<td class="text-center">' + pedido.creado_en + '</td>' +
      '</tr>'
    );
  }

}
AdminPedidosEnviadosTable.prototype.loadPedidos = IndexPedidosTable.prototype.loadPedidos;

class AdminPedidosEntregadosTable extends MisPedidosEntregadosTable {

  newRowForPedido(pedido) {
    return $(
      '<tr id="pedido-' + pedido.id + '">' +
      '<td class="text-center">' + pedido.id + '</td>' +
      '<td class="text-center">' + pedido.insumo.nombre + '</td>' +
      '<td class="text-center">' + pedido.cantidad + '</td>' +
      '<td class="text-center">' + pedido.unidad + '</td>' +
      '<td class="text-center">' + pedido.mesa.nombre + '</td>' +
      '<td class="text-center">' + pedido.encargado_por.nombre_completo + '</td>' +
      '<td class="text-center">' + pedido.creado_en + '</td>' +
      '<td class="text-center">' + pedido.entregado_en + '</td>' +
      '</tr>'
    );
  }

}
AdminPedidosEntregadosTable.prototype.loadPedidos = IndexPedidosTable.prototype.loadPedidos;

class AdminPedidosDescartadosTable extends MisPedidosDescartadosTable {

  newRowForPedido(pedido) {
    return $(
      '<tr id="pedido-' + pedido.id + '">' +
        '<td class="text-center">' + pedido.id + '</td>' +
        '<td class="text-center">' + pedido.insumo.nombre + '</td>' +
        '<td class="text-center">' + pedido.cantidad + '</td>' +
        '<td class="text-center">' + pedido.unidad + '</td>' +
        '<td class="text-center">' + pedido.mesa.nombre + '</td>' +
        '<td class="text-center">' + pedido.encargado_por.nombre_completo + '</td>' +
        '<td class="text-center">' + pedido.creado_en + '</td>' +
      '</tr>'
    );
  }

}
AdminPedidosDescartadosTable.prototype.loadPedidos = IndexPedidosTable.prototype.loadPedidos;

