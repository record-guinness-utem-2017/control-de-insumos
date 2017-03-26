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

$query .= ' ORDER BY id DESC';

if ($pag = $_GET['pag'] ?? 1) {
  $offset = POR_PAGINA * ($pag - 1);
  $query .= ' LIMIT ' . POR_PAGINA . " OFFSET {$offset}";
}

$insumos = get_filas_desde_query($conexion, 'SELECT * FROM insumos');
$pedidos = get_filas_desde_query($conexion, $query, function(array $fila) use ($insumos) : array {
  $fila['insumo']        = get_fila_relacionada('id', $fila['insumo_id'], $insumos);
  $fila['mesa']          = ['nombre' => 'A'];
  $fila['encargado_por'] = ['nombre_completo' => 'Kevin Perez '];

  return $fila;
});

responder_json_de_objetos($pedidos, [$query]);
