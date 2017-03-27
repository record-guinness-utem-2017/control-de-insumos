class PedidosTable {

  constructor(table, socket = null) {
    this.table   = $(table);
    this.pedidos = [];
    this.socket  = socket;
  }

  init(loadParams = {}) {
    this.loadPedidos(loadParams);
    this.bindEvents();
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

  fillUpTable() {
    const cuerpo     = this.table.find('tbody');
    const sinPedidos = this.table.parent().find('#sin-pedidos');

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
    this.table.prepend( this.newRowForPedido(pedido).addClass('success') );
    setTimeout(function() { $('tr.success').removeClass('success'); }, 3000);
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

        $.get('../ajax/pedidos/descartar.php?id=' + pedidoId, function() {
          self.dropPedido(pedidoId);
          dialog.close();
          BootstrapDialog.alert({
            title: '',
            message: 'Pedido descartado',
            type: BootstrapDialog.TYPE_INFO,
          });

          self.socket.emit('descartado_pedido', { id: pedidoId });
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

        $.get('../ajax/pedidos/atender.php?id=' + pedidoId, function() {
          self.dropPedido(pedidoId);
          dialog.close();
          BootstrapDialog.alert({
            title: '',
            message: 'Pedido marcado como enviado',
            type: BootstrapDialog.TYPE_SUCCESS,
          });

          self.socket.emit('enviado_pedido', { id : pedidoId });
        });

        return false;
      }
    });
  }

  dropPedido(pedidoId) {
    const index  = this.pedidos.findIndex(function(pedido) { return pedido.id == pedidoId; });
    this.pedidos.splice(index, 1);

    const row    = this.table.find('#pedido-' + pedidoId).css('position', 'relative').addClass('danger');
    const banner = $('<div><h4>Descartado</h4></div>')
      .css({ position: 'absolute',
             top: row.position().top + 'px',
             left: row.position().left + 'px',
             width: row.width(),
             height: row.height() })
      .addClass('text-center')
      .appendTo(row);

    setTimeout(function() {
      row.fadeOut('fast');
      if (this.pedidos.length <= 0) {
        this.table.fadeOut('fast');
        this.table.parent().find('#sin-pedidos').fadeIn('fast');
      }
    }, 3000);
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

class PedidosEnviadosTable extends IndexPedidosTable {

  newActionButtonsForPedido(pedido) {
    return $('<div class="text-center"></div>')
      .append( $('<p><button class="btn btn-success recibir" data-pedido-id="' + pedido.id + '">Marcar como recibido</button></p>') );
  }

}

class PedidosPorAtenderTable extends IndexPedidosTable {

  newActionButtonsForPedido(pedido) {
    return $('<div class="text-center"></div>')
      .append( $('<p><button class="btn btn-danger descartar" data-pedido-id="' + pedido.id + '">Descartar</button></p>') );
  }

}

class PedidosDescartadosTable extends PedidosTable {

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

}
