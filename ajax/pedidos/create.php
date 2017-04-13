<?php

$bd = require_once __DIR__ . '/../bd.php';

$datos = array_map([$bd, 'escape_string'], $_POST);
$query = "INSERT INTO pedidos (mesa_id, insumo_id, cantidad, unidad, encargado_por, estado, updated_at) VALUES (" .
           "{$datos['mesa_id']}, " .
           "{$datos['insumo_id']}, " .
           "{$datos['cantidad']}, " .
           "'{$datos['unidad']}'," .
           "{$datos['encargado_por']}," .
           "'" . PEDIDO_PENDIENTE . "', " .
           "'" . date('Y-m-d H:i:s') . "'" .
         ")";

if ($bd->query($query)) {
  $result = $bd->query("SELECT * FROM pedidos WHERE id = {$bd->insert_id}");
  header('Content-Type: application/json; encoding: utf8');
  echo json_encode($result->fetch_assoc());
} else {
  header('Content-Type: application/json; encoding: utf8');
  echo json_encode(['error' => $bd->error]);
}
