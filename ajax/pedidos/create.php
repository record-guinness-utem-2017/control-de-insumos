<?php

$bd = require_once __DIR__ . '/../bd.php';

$datos = array_map([$bd, 'escape_string'], $_POST);
$query = "INSERT INTO pedidos (mesa_id, insumo_id, cantidad, unidad) VALUES (" .
           "{$datos['mesa_id']}, " .
           "{$datos['insumo_id']}, " .
           "{$datos['cantidad']}, " .
           "{$datos['unidad']}" .
         ")";
$bd->query($query);

$pedido = $bd->query("SELECT * FROM pedidos WHERE id = {$bd->insert_id}")->fetch_assoc();

header('Content-Type: application/json; encoding: utf8');
echo json_encode($pedido);
