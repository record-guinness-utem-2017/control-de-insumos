<?php

function get_filas_desde_query(Mysqli $conexion, string $query, Closure $callback = null) : array {
  $result = $conexion->query($query) or reportar_error_sql($conexion, $query);
  $filas  = [];
  while ($fila = $result->fetch_assoc()) {
    if ($callback) $fila = $callback($fila);
    $filas[] = $fila;
  }

  return $filas;
}

function get_fila_relacionada(string $campo_primario, string $valor_esperado, array $filas) : array {
  foreach ($filas as $fila) {
    $valor = $fila[$campo_primario] ?? null;
    if ($valor == $valor_esperado) return $fila;
  }

  return [];
}

function get_filas_relacionadas(string $campo_primario, string $valor_esperado, array $filas) : array {
  $encontradas = [];

  foreach ($filas as $fila) {
    $valor = $fila[$campo_primario] ?? null;
    if ($valor == $valor_esperado) $encontradas[] = $fila;
  }

  return $encontradas;
}

function
get_relacionadas_con_pivote($conexion, $tabla_pivote, $clave1, $valor_esperado, $clave2, $primaria_relacionada, $tabla_relacionada) {
  $query   = "SELECT DISTINCT $clave2 FROM $tabla_pivote WHERE $clave1 = '$valor_esperado'";
  $pivotes = get_filas_desde_query($conexion, $query, function($fila) use ($clave2) { return "'$fila[$clave2]'"; });

  $ids          = implode(',', $pivotes);
  $query        = "SELECT * FROM $tabla_relacionada WHERE $primaria_relacionada in ($ids)";

  return get_filas_desde_query($conexion, $query);
}

function responder_json_de_objetos($objetos, $queries) {
  $respuesta = [
    'objetos' => $objetos,
    'sql'     => $queries,
  ];

  header('Content-Type: application/json; encoding: utf8');
  echo json_encode($respuesta);
}

function reportar_error_sql(Mysqli $conexion, string $query) : void {
  http_response_code(500);
  header('Content-Type: application/json; encoding: utf8');
  echo json_encode(['error' => $conexion->error,
                    'sql'   => $query]);

  exit();
}
