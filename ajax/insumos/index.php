<?php

require_once __DIR__ . '/../helpers.php';

/** @var Mysqli $conexion */
$conexion = require_once __DIR__ . '/../bd.php';
$query    = 'SELECT * FROM insumos_config';

if (isset($_GET['disponibles'])) $query .= " WHERE kg_reales > 0";

$insumos  = get_filas_desde_query($conexion, $query, function(array $insumo) use ($conexion) : array {
  $insumo['id']       = $insumo['id_almacen'];
  $insumo['nombre']   = $insumo['insumo'];
  $insumo['unidades'] = [['unidad' => 'kilos']];

  return $insumo;
});

responder_json_de_objetos($insumos, [$query]);
