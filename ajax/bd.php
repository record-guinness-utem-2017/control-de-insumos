<?php

require_once __DIR__ . '/constantes.php';

$conexion = mysqli_connect('localhost', 'root', 'root', 'control_de_insumos') or die(mysqli_error($conexion));
$conexion->set_charset('UTF8');

return $conexion;
