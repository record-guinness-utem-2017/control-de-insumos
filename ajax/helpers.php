<?php

function get_filas_desde_query(Mysqli $conexion, string $query, Closure $callback = null) : array {
  $result = $conexion->query($query) or die($conexion->error);
  $filas  = [];
  while ($fila = $result->fetch_assoc()) {
    if ($callback) $fila = $callback($fila);
    $filas[] = $fila;
  }

  return $filas;
}
