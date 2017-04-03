
$(document).ready(function() {
        $( "#btnClickA" ).click(function() {

        var inputAtunC = $("#inputAtunC").val();
        var inputAtunK = $("#inputAtunK").val();

        //var prueba = document.getElementById('#inputJitomate').val();
        
  
           
        $.ajax({
                type:  'post',
                url:   '/ajax/configuracion/actualizacionA.php',
                data:  ('inputAtunC='+inputAtunC+'&inputAtunK='+inputAtunK) ,
                beforeSend: function () {
                          alert("Guardando....");
                },
                success:  function (response) {
                       alert("Guardado con exito");
                }
});

})


})
