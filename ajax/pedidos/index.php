<?php

const POR_PAGINA = 50;
/** @var Mysqli $conexion */
$conexion = require_once __DIR__ . '/../bd.php';
$query    = 'SELECT * FROM pedidos';

if ($estado = $_GET['estado'] ?? null) {
  $query .= ' WHERE estado = "' . $conexion->escape_string($estado) . '"';
}

if ($pag = $_GET['pag'] ?? 1) {
  $offset = POR_PAGINA * ($pag - 1);
  $query .= ' LIMIT ' . POR_PAGINA . " OFFSET {$offset}";
}

$result = $conexion->query($query) or die($conexion->error);
$filas  = [];
while ($fila = $result->fetch_assoc()) {
  $fila['insumo']        = ['nombre' => 'Jitomate'];
  $fila['mesa']          = ['nombre' => 'A'];
  $fila['encargado_por'] = ['nombre_completo' => 'Kevin Perez '];
  $filas[]               = $fila;
}

$respuesta = [
  'objetos' => $filas,
  'sql'     => [$query],
];

header('Content-Type: application/json; encoding: utf8');
echo json_encode($respuesta);
