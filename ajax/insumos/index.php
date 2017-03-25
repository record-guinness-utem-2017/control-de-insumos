<?php

require_once __DIR__ . '/../helpers.php';

/** @var Mysqli $conexion */
$conexion = require_once __DIR__ . '/../bd.php';
$query    = 'SELECT * FROM insumos';

$unidades = get_filas_desde_query($conexion, 'SELECT * FROM unidades');
$insumos  = get_filas_desde_query($conexion, $query, function(array $insumo) use ($conexion, $unidades) : array {
  $insumo['unidades'] = get_relacionadas_con_pivote($conexion,
                                                    'insumos_unidades',
                                                    'insumo_id',
                                                    $insumo['id'],
                                                    'unidad_id',
                                                    'unidad',
                                                    'unidades');

  return $insumo;
});

responder_json_de_objetos($insumos, [$query]);
