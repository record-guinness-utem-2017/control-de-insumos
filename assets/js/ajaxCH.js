
$(document).ready(function() {
        $( "#btnClickCH" ).click(function() {

        var inputChileC = $("#inputChileC").val();
        var inputChileK = $("#inputChileK").val();

        //var prueba = document.getElementById('#inputJitomate').val();
        
  
           
        $.ajax({
                type:  'post',
                url:   '/ajax/configuracion/actualizacionCH.php',
                data:  ('inputChileC='+inputChileC+'&inputChileK='+inputChileK) ,
                beforeSend: function () {
                          alert("Guardando....");
                },
                success:  function (response) {
                       alert("Guardado con exito");
                }
});

})


})


