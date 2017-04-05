<?php

require_once __DIR__ . '/../helpers.php';

const POR_PAGINA = 50;
/** @var Mysqli $conexion */
$conexion = require_once __DIR__ . '/../bd.php';
$query    = 'SELECT * FROM pedidos WHERE 1=1';

if ($estado = $_GET['estado'] ?? null) {
  $query .= ' AND estado = "' . $conexion->escape_string($estado) . '"';
}

if ($id = $_GET['id'] ?? null) {
  $query .= ' AND id = ' . $conexion->escape_string($id);
}

$query .= ' ORDER BY updated_at DESC, creado_en DESC, id DESC';

if ($pag = $_GET['pag'] ?? 1) {
  $offset = POR_PAGINA * ($pag - 1);
  $query .= ' LIMIT ' . POR_PAGINA . " OFFSET {$offset}";
}

$insumos = get_filas_desde_query($conexion, 'SELECT * FROM insumos_config');
$pedidos = get_filas_desde_query($conexion, $query, function(array $fila) use ($insumos) : array {
  $fila['mesa']   = ['nombre' => 'A'];
  $fila['insumo'] = get_fila_relacionada('id_almacen', $fila['insumo_id'], $insumos, function($insumo) {
    $insumo['nombre'] = $insumo['insumo'];

    return $insumo;
  });

  return $fila;
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
    $pedido['encargado_por'] = array_filter($personas, $filtrar)[0] ?? null;

    return $pedido;
  }, $pedidos);
}

responder_json_de_objetos($pedidos, [$query]);
