<?php

require_once __DIR__ . '/../helpers.php';

/** @var Mysqli $conexion */
$conexion  = require_once __DIR__ . '/../bd.php';
$pedido_id = $conexion->escape_string($_POST['id']);
$query     = "UPDATE pedidos SET estado = '" . PEDIDO_ENVIADO . "', updated_at = NOW() WHERE id = $pedido_id";
$result    = $conexion->query($query);

if ($result) {
  responder_json_de_objetos([], [$query]);
} else {
  reportar_error_sql($conexion, $query);
}
