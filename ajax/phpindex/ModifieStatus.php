<?php
$con = include __DIR__ . '/../bd.php';

date_default_timezone_set("America/Mexico_City");

$hoy = date("Y-m-d H:i:s");

$CualPiPo_xD=$_POST['mensaje'];
$CualPiPo_xD2=$_POST['mensaje2'];
$AreaSelected=$_POST['mensaje3'];

$sql = "UPDATE personas SET estatus_entrada=1 WHERE id='$CualPiPo_xD'";
$con->query($sql) or die('SQL: ' . $con->error);

$sql2 = "INSERT INTO historyinsides VALUES(null,'Entrada', '$hoy','$CualPiPo_xD','$CualPiPo_xD2', '$AreaSelected')";
$con->query($sql2) or die('SQL2: ' . $con->error . '; ' . $sql2);

if($result = $con->query("SELECT * FROM personas WHERE id = '$CUAlPiPo_xD'")){
	$json["ok"] = $result->fetch_all(MYSQLI_ASSOC);
	echo json_encode($json, JSON_PRETTY_PRINT);
}

?>