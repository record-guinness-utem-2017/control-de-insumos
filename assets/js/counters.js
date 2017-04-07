function setUpCounters () {
  const startVal     = 0;
  const endVal       = $(this).text();
  const decimalCount = 0;
  const duration     = 1.5;

  this.counter = new CountUp(this, startVal, endVal, decimalCount, duration);
  this.counter.start();
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
});

mSocket.on('pedido_entregado', function (data) {
  $('.kilos.entregados.counter').each(function () {
    if (data.insumo.id != $(this).data('insumo-id')) return;

    this.counter.update(data.insumo.kg_entregados);
  });

  $('.cajas.entregadas.counter').each(function () {
    if (data.insumo.id != $(this).data('insumo-id')) return;

    this.counter.update(data.insumo.cajas_entregadas);
  });
})
