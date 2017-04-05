<?php
$con = include __DIR__ . '/../bd.php';

$mensaje=$_POST['mensaje'];
$concatenado=$_POST['concatenado'];
 
	if($concatenado=="0,0,0,0"){
		$pass="empty";
		$rango="nulll";
	}else if($concatenado=="1,1,1,1"){
		$pass="123";
		$rango="a";
	}else if($concatenado=="1,0,0,0"){
		$pass="123";
		$rango="c";
	}else if($concatenado=="0,0,0,1"){
		$pass="123";
		$rango="al";
	}else if($concatenado=="0,0,1,0"){
		$pass="123";
		$rango="d";
	}else if($concatenado=="0,1,1,1"){
		$pass="123";
		$rango="s";
	}	
	
	
	
	


$sql = "UPDATE numeros_de_control SET module='$concatenado', contra='$pass', rank='$rango' WHERE persona_id='$mensaje'";
$con->query($sql);

?>