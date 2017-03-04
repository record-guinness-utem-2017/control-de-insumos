<?php

$insumos = [
  [
    'id'     => 1,
    'nombre' => 'Jitomate',
  ],
  [
    'id'     => 2,
    'nombre' => 'Cebolla',
  ],
  [
    'id'     => 3,
    'nombre' => 'Cilantro',
  ],
];

header('Content-Type: application/json; encoding: utf8');
echo json_encode($insumos);
