
$(document).ready(function() {
        $( "#btnClickS" ).click(function() {

        var inputSalC = $("#inputSalC").val();
        var inputSalK = $("#inputSalK").val();

        //var prueba = document.getElementById('#inputJitomate').val();
      
        $.ajax({
                type:  'post',
                url:   '/ajax/configuracion/actualizacionS.php',
                data:  ('inputSalC='+inputSalC+'&inputSalK='+inputSalK) ,
                beforeSend: function () {
                          alert("Guardando....");
                },
                success:  function (response) {
                       alert("Guardado con exito");
                }
});

})


})
