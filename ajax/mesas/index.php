<?php

require_once __DIR__ . '/../helpers.php';

/** @var Mysqli $conexion */
$conexion = require_once __DIR__ . '/../bd.php';

$usuario = $conexion->escape_string($_GET['user'] ?? 0);
$query   = "SELECT * FROM mesas m JOIN mesas_encargados me ON me.mesa_id = m.id WHERE me.encargado_id = $usuario";
$mesas   = get_filas_desde_query($conexion, $query);

if ($conexion->error) {
  reportar_error_sql($conexion, $query);
} else {
  responder_json_de_objetos($mesas, compact('query'));
}
