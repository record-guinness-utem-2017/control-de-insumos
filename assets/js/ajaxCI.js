
$(document).ready(function() {
        $( "#btnClickCI" ).click(function() {

        var inputCilantroC = $("#inputCilantroC").val();
        var inputCilantroK = $("#inputCilantroK").val();

        //var prueba = document.getElementById('#inputJitomate').val();
        
  
           
        $.ajax({
                type:  'post',
                url:   '/ajax/configuracion/actualizacionCI.php',
                data:  ('inputCilantroC='+inputCilantroC+'&inputCilantroK='+inputCilantroK) ,
                beforeSend: function () {
                          alert("Guardando....");
                },
                success:  function (response) {
                       alert("Guardado con exito");
                }
});

})


})



