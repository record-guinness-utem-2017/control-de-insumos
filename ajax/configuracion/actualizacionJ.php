<?php 
$con = include __DIR__ . '/../bd.php';

 $datoC= $_POST['inputJitomateC'];
 $datoK= $_POST['inputJitomateK'];
 //echo "<script>console.log( 'Valor del select : " . $datoC . "' );</script>";

//ID del insumo
   $sqlid="SELECT id_almacen FROM insumos_config WHERE insumo='Jitomate'";
   $resultadoid = mysqli_query($con, $sqlid) or die(mysqli_error($con));

   $resid=mysqli_fetch_assoc( $resultadoid);

	$suid=($resid["id_almacen"]);



//Insert para historial
   $sql=mysqli_query($con, "INSERT INTO insumos_historial VALUES (0,'$suid','$datoC','$datoK',CURRENT_TIMESTAMP)") or die(mysqli_error($con));
  if($sql === FALSE) { 
    die(mysqli_error($con)); // TODO: better error handling
}

//UPDATE para cajas en almacen 

   $sqlC="SELECT cajas_reales FROM insumos_config WHERE id_almacen='$suid'";
   $resultadoC = mysqli_query($con, $sqlC) or die(mysqli_error($con));

    if($resultadoC === FALSE) { 
    die(mysqli_error($con)); // TODO: better error handling
}

$resC=mysqli_fetch_assoc( $resultadoC);

$suC=($resC["cajas_reales"]);

$sumaC=$suC+$datoC;

 $sql3="UPDATE `insumos_config` SET `cajas_reales` = $sumaC WHERE id_almacen='$suid'";
 $resultado2= mysqli_query($con, $sql3) or die(mysqli_error($con));


//UPDATE para kilos almacen 

$sql2="SELECT kg_reales FROM insumos_config WHERE id_almacen='$suid'";
   $resultado = mysqli_query($con, $sql2) or die(mysqli_error($con));

    if($resultado === FALSE) { 
    die(mysqli_error($con)); // TODO: better error handling
}

$res=mysqli_fetch_assoc( $resultado);

$su=($res["kg_reales"]);

$suma=$su+$datoK;


 $sql4="UPDATE `insumos_config` SET `kg_reales` = $suma WHERE id_almacen='$suid'";
 $resultado2= mysqli_query($con, $sql4) or die(mysqli_error($con));

   

?>