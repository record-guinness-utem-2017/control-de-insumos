function setUpCounters () {
  $('.counter').each(function () {
    const startVal     = 0;
    const endVal       = $(this).text();
    const decimalCount = $(this).data('decimales') || 0;
    const duration     = 1.5;

    this.counter = new CountUp(this, startVal, endVal, decimalCount, duration);
    this.counter.start();
  });
}

mSocket.on('insertar_insumo_en_almacen', function (data) {
  $('.kilos.almacenados.counter').each(function () {
    if (data.insumo.id != $(this).data('insumo-id')) return;

    this.counter.update(data.insumo.kg_reales);
  });

  $('.cajas.almacenadas.counter').each(function () {
    if (data.insumo.id != $(this).data('insumo-id')) return;

    this.counter.update(data.insumo.cajas_reales);
  });

  updateCajasDisponiblesCounter(data);
});

mSocket.on('pedido_entregado', function (data) {
  $('.cajas.entregadas.counter').each(function () {
    if (data.insumo.id != $(this).data('insumo-id')) return;

    this.counter.update(data.insumo.cajas_entregadas);
  });

  updateCajasDisponiblesCounter(data);
})

function updateCajasDisponiblesCounter(data) {
  $('.cajas.disponibles.counter').each(function () {
    if (data.insumo.id != $(this).data('insumo-id')) return;

    this.counter.update(data.insumo.cajas_reales - data.insumo.cajas_entregadas);
  });
}
