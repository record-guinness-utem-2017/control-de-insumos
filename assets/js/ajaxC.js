
$(document).ready(function() {
        $( "#btnClickC" ).click(function() {

        var inputCebollaC = $("#inputCebollaC").val();
        var inputCebollaK = $("#inputCebollaK").val();

        //var prueba = document.getElementById('#inputJitomate').val();
        
  
           
        $.ajax({
                type:  'post',
                url:   '/ajax/configuracion/actualizacionC.php',
                data:  ('inputCebollaC='+inputCebollaC+'&inputCebollaK='+inputCebollaK) ,
                beforeSend: function () {
                          alert("Guardando....");
                },
                success:  function (response) {
                       alert("Guardado con exito");
                }
});

})


})


