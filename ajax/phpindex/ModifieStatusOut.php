<?php

$con = include __DIR__ . '/../bd.php';

date_default_timezone_set("America/Mexico_City");

$hoy = date("Y-m-d H:i:s");

$CualPiPo_xD=$_POST['mensaje'];
$CualPiPo_xD2=$_POST['mensaje2'];

$sql = "UPDATE personas SET estatus_entrada=0 WHERE id='$CualPiPo_xD'";
$con->query($sql) or die('SQL: ' . $con->error);

$sql2 = "INSERT INTO historyinsides VALUES(null,'Salida', '$hoy','$CualPiPo_xD','$CualPiPo_xD2', null)";
$con->query($sql2) or die('SQL2: ' . $con->error . '; ' . $sql2);

if($result = $con->query("SELECT * FROM personas WHERE id = '$CUAlPiPo_xD'")){
  $json["ok"] = $result->fetch_all(MYSQLI_ASSOC);
  echo json_encode($json, JSON_PRETTY_PRINT);
}
	
	

?>