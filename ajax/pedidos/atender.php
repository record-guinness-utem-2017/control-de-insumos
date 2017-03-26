<?php

require_once __DIR__ . '/../helpers.php';

/** @var Mysqli $conexion */
$conexion  = require_once __DIR__ . '/../bd.php';
$pedido_id = $conexion->escape_string($_GET['id']);
$query     = "UPDATE pedidos SET estado = '" . PEDIDO_ENVIADO . "' WHERE id = $pedido_id";
$result    = $conexion->query($query);

if ($result) {
  responder_json_de_objetos([], [$query]);
} else {
  reportar_error_sql($conexion, $query);
}
