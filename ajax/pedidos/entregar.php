<?php

require_once __DIR__ . '/../helpers.php';

/** @var Mysqli $conexion */
$conexion  = require_once __DIR__ . '/../bd.php';
$pedido_id = $conexion->escape_string($_POST['id']);

$conexion->begin_transaction();

$pedido = get_filas_desde_query($conexion, "SELECT * FROM pedidos WHERE id = $pedido_id")[0];
$conexion->query("UPDATE insumos_config SET kg_reales = kg_reales - {$pedido['cantidad']} WHERE id_almacen = {$pedido['insumo_id']}");

$sql    = 'UPDATE pedidos SET estado = "' . PEDIDO_ENTREGADO . '", entregado_en = NOW(), updated_at = NOW() WHERE id = ' . $pedido_id;
$result = $conexion->query($sql);

$conexion->commit();

if ($result) {
  responder_json_de_objetos([], [$sql]);
} else {
  reportar_error_sql($conexion, $sql);
}
