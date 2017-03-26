<?php

require_once __DIR__ . '/../helpers.php';

/** @var Mysqli $conexion */
$conexion  = require_once __DIR__ . '/../bd.php';
$pedido_id = $conexion->escape_string($_GET['id']);

$sql    = 'UPDATE pedidos SET estado = "' . ESTADO_DESCARTADO . '" WHERE id = ' . $pedido_id;
$result = $conexion->query($sql);

if ($result) {
  responder_json_de_objetos([], [$sql]);
} else {
  reportar_error_sql($conexion, $sql);
}
