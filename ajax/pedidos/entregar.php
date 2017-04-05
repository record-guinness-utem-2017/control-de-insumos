<?php

require_once __DIR__ . '/../helpers.php';

/** @var Mysqli $conexion */
$conexion  = require_once __DIR__ . '/../bd.php';
$pedido_id = $conexion->escape_string($_POST['id']);

$conexion->begin_transaction();

$pedido            = get_filas_desde_query($conexion, "SELECT * FROM pedidos WHERE id = $pedido_id")[0];
$query             = "SELECT kg_reales FROM insumos_config WHERE id_almacen = {$pedido['insumo_id']}";
$fila              = get_filas_desde_query($conexion, $query)[0];
$kilos_disponibles = $fila['kg_reales'];

if ($kilos_disponibles >= $pedido['cantidad']) {
  $conexion->query("UPDATE insumos_config SET kg_reales = kg_reales - {$pedido['cantidad']} WHERE id_almacen = {$pedido['insumo_id']} AND kg_reales >= {$pedido['cantidad']}");

  $sql = 'UPDATE pedidos SET estado = "' . PEDIDO_ENTREGADO . '", entregado_en = NOW(), updated_at = NOW() WHERE id = ' . $pedido_id;
  $conexion->query($sql) or reportar_error_sql($conexion, $sql);

  $sql2    = "SELECT * FROM pedidos WHERE id = $pedido_id";
  $insumos = get_filas_desde_query($conexion, 'SELECT * FROM insumos_config');
  $pedidos = get_filas_desde_query($conexion, $sql2, function(array $fila) use ($insumos) : array {
    $fila['mesa']   = ['nombre' => 'A'];
    $fila['insumo'] = get_fila_relacionada('id_almacen',
                                           $fila['insumo_id'],
                                           $insumos,
      function($insumo) {
        $insumo['id']     = $insumo['id_almacen'];
        $insumo['nombre'] = $insumo['insumo'];

        return $insumo;
      });

    return $fila;
  });

  responder_json_de_objetos($pedidos, compact('query', 'sql', 'sql2'));
} else {
  http_response_code(422);
  responder_json_de_objetos([], []);
}

$conexion->commit();
