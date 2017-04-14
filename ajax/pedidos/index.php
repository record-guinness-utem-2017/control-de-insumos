<?php

use Carbon\Carbon;

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../helpers.php';

Carbon::setLocale('es');

const POR_PAGINA   = 50;
const ZONA_HORARIA = 'America/Mexico_City';

/** @var Mysqli $conexion */
$conexion = require_once __DIR__ . '/../bd.php';
$query    = 'SELECT * FROM pedidos WHERE 1=1';

if ($estado = $_GET['estado'] ?? null) {
  $query .= ' AND estado = "' . $conexion->escape_string($estado) . '"';
}

if ($id = $_GET['id'] ?? null) {
  $query .= ' AND id = ' . $conexion->escape_string($id);
}

if ($user = $_GET['user'] ?? null) {
  $query .= ' AND encargado_por = ' . $conexion->escape_string($user);
}

$query .= ' ORDER BY updated_at ASC';

if (($pag = $_GET['pag'] ?? 1) && empty($_GET['todos'])) {
  $offset = POR_PAGINA * ($pag - 1);
  $query .= ' LIMIT ' . POR_PAGINA . " OFFSET {$offset}";
}

$mesas   = get_filas_desde_query($conexion, 'SELECT * FROM mesas');
$insumos = get_filas_desde_query($conexion, 'SELECT * FROM insumos_config');
$pedidos = get_filas_desde_query($conexion, $query, function(array $pedido) use ($mesas, $insumos) : array {
  $pedido['mesa']   = get_fila_relacionada('id', $pedido['mesa_id'], $mesas);
  $pedido['insumo'] = get_fila_relacionada('id_almacen', $pedido['insumo_id'], $insumos, function($insumo) {
    $insumo['id']     = $insumo['id_almacen'];
    $insumo['nombre'] = $insumo['insumo'];

    return $insumo;
  });

  $ahora                        =  Carbon::now(ZONA_HORARIA);
  $pedido['human_creado_en']    = ( new Carbon($pedido['creado_en'], ZONA_HORARIA) )->diffForHumans($ahora);
  $pedido['human_entregado_en'] = ( new Carbon($pedido['entregado_en'], ZONA_HORARIA) )->diffForHumans($ahora);

  return $pedido;
});

if (count($pedidos) > 0) {
  # Cargar eficientemente personas asociadas.
  $encargados_ids = array_unique( array_map(function($pedido) { return $pedido['encargado_por']; }, $pedidos) );
  $encargados_ids = join(',', $encargados_ids);
  $query          = 'SELECT id, tipo, nombre, apellido_paterno, apellido_materno FROM personas WHERE id in (' . $encargados_ids . ')';
  $personas       = get_filas_desde_query($conexion, $query);
  $personas       = array_map(function($persona) {
    $persona['nombre_completo'] = $persona['nombre'] . ' ' . $persona['apellido_paterno'] . ' ' . $persona['apellido_materno'];

    return $persona;
  }, $personas);

  $pedidos = array_map(function($pedido) use ($personas) {
    $filtrar                 = function($persona) use ($pedido) { return $persona['id'] == $pedido['encargado_por']; };
    $persona                 = array_filter($personas, $filtrar);
    $pedido['encargado_por'] = reset($persona) ?? null;

    return $pedido;
  }, $pedidos);
}

responder_json_de_objetos($pedidos, [$query]);
