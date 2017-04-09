<?php

require_once __DIR__ . '/../helpers.php';

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
  ],[
    'id'     => 4,
    'nombre' => 'D',
  ],[
    'id'     => 5,
    'nombre' => 'E',
  ],[
    'id'     => 6,
    'nombre' => 'F',
  ],[
    'id'     => 7,
    'nombre' => 'G',
  ],
];

responder_json_de_objetos($mesas, []);
