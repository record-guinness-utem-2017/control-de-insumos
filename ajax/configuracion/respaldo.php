function btnClickCI(){
        var inputCilantro = $("#inputCilantro").val();
        //var prueba = document.getElementById('#inputJitomate').val();
        
    
           
        $.ajax({
                type:  'post',
                url:   '/ajax/configuracion/actualizacionCI.php',
                data:  ('inputCilantro='+inputCilantro) ,
                beforeSend: function () {
                        $("#resultado").html("Procesando, espere por favor...");
                },
                success:  function (response) {
                        $("#resultado").html(response);
                }
});


        };




<?php 
$con = include __DIR__ . '/../bd.php';

 $dato= $_POST['inputCilantro'];

 echo "<script>console.log( 'Valor del select : " . $dato . "' );</script>";

    $sql="SELECT cantidad FROM almacen WHERE insumo='Cilantro'";
   $resultado = mysqli_query($con, $sql) or die(mysqli_error($con));

    if($resultado === FALSE) { 
    die(mysqli_error($con)); // TODO: better error handling
}

$res=mysqli_fetch_assoc( $resultado);

$su=($res["cantidad"]);

$suma=$su+$dato;

echo "<script>console.log( 'Valor de la consulta : " .$suma. "' );</script>";

 $sql2="UPDATE `almacen` SET `cantidad` = $suma WHERE insumo='Cilantro'";
 $resultado2 = mysqli_query($con, $sql2) or die(mysqli_error($con));

   

?>