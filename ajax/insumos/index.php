<?php

$insumos = [
  [
    'id'       => 1,
    'nombre'   => 'Jitomate',
    'img_url'  => '/assets/img/insumo.png',
    'unidades' => ['kilos', 'cajas'],
  ],
  [
    'id'       => 2,
    'nombre'   => 'Cebolla',
    'img_url'  => '/assets/img/insumo.png',
    'unidades' => ['kilos', 'cajas'],
  ],
  [
    'id'       => 3,
    'nombre'   => 'Cilantro',
    'img_url'  => '/assets/img/insumo.png',
    'unidades' => ['kilos', 'cajas'],
  ],
];

header('Content-Type: application/json; encoding: utf8');
echo json_encode($insumos);
