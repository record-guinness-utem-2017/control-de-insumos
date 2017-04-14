<?php

require_once __DIR__ . '/../helpers.php';

/** @var Mysqli $conexion */
$conexion  = require_once __DIR__ . '/../bd.php';
$pedido_id = $conexion->escape_string($_POST['id']);

$conexion->begin_transaction();

$query  = "SELECT * FROM pedidos WHERE id = $pedido_id";
$pedido =  get_filas_desde_query($conexion, $query)[0] or die(reportar_error_sql($conexion, $query));
$query  = "SELECT * FROM insumos_config WHERE id_almacen = {$pedido['insumo_id']}";
$insumo = get_filas_desde_query($conexion, $query)[0] or die(reportar_error_sql($conexion, $query));

if ($insumo['cajas_reales'] - $insumo['cajas_entregadas'] >= $pedido['cantidad']) {
  $query  = "UPDATE pedidos SET estado = '" . PEDIDO_ENVIADO . "', updated_at = NOW() WHERE id = $pedido_id";
  $result = $conexion->query($query);
  if ($result) {
    responder_json_de_objetos([], [$query]);
  } else {
    reportar_error_sql($conexion, $query);
  }
} else {
  http_response_code(422);
  $insumo_nombre     = strtolower($insumo['insumo']);
  $insumo_disponible = $insumo['cajas_reales'] - $insumo['cajas_entregadas'];
  responder_json_de_objetos(['error' => "<p>No hay suficiente $insumo_nombre en el almacén para atender este pedido. " .
                                        "Actualmente hay $insumo_disponible cajas en el almacén.</p> " .
                                        "Tienes dos opciones: <ol>" .
                                        "<li>Espera a que ingrese más $insumo_nombre al almacén.</li>" .
                                        "<li>Descarta este pedido para que quien lo hizo lo genere después con la " .
                                             "cantidad de cajas que quedan.</li>" .
                                        "</ol>"], []);
}

$conexion->commit();
