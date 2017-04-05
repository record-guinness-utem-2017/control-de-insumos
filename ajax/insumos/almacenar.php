<?php

require_once __DIR__ . '/../helpers.php';

/** @var Mysqli $conexion */
$conexion = require_once __DIR__ . '/../bd.php';

$conexion->begin_transaction();

  $id    = empty($_GET['id']) ? 0 : $conexion->escape_string($_GET['id']);
  $kilos = empty($_POST['kilos']) ? 0 : $conexion->escape_string($_POST['kilos']);
  $cajas = empty($_POST['cajas']) ? 0 : $conexion->escape_string($_POST['cajas']);

  if ($kilos || $cajas) {
    $query = "UPDATE insumos_config SET kg_reales = kg_reales + $kilos, cajas_reales = cajas_reales + $cajas";
    $conexion->query($query) or reportar_error_sql($conexion, $query);
    $query2 = "INSERT INTO insumos_historial VALUES (null, $id, $cajas, $kilos, '" . date('Y-m-d H:i:s') . "')";
    $conexion->query($query2) or reportar_error_sql($conexion, $query);
  }

  $query3 = "SELECT * FROM insumos_config WHERE id_almacen = $id";
  $filas  = get_filas_desde_query($conexion, $query3, function($insumo) {
    $insumo['id']     = $insumo['id_almacen'];
    $insumo['nombre'] = $insumo['insumo'];

    return $insumo;
  });

$conexion->commit();

responder_json_de_objetos($filas, compact('query', 'query2', 'query3'));
