<?php

$mesas = [
  [
    'id'     => 1,
    'nombre' => 'A',
  ],
  [
    'id'     => 2,
    'nombre' => 'B',
  ],
  [
    'id'     => 3,
    'nombre' => 'C',
  ],
];

header('Content-Type: application/json; encoding: utf8');
echo json_encode($mesas);
