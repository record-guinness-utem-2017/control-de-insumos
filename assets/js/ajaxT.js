
$(document).ready(function() {
        $( "#btnClickT" ).click(function() {

        var inputTostadaC = $("#inputTostadaC").val();
        var inputTostadaK = $("#inputTostadaK").val();

        //var prueba = document.getElementById('#inputJitomate').val();
        
  
           
        $.ajax({
                type:  'post',
                url:   '/ajax/configuracion/actualizacionT.php',
                data:  ('inputTostadaC='+inputTostadaC+'&inputTostadaK='+inputTostadaK) ,
                beforeSend: function () {
                          alert("Guardando....");
                },
                success:  function (response) {
                       alert("Guardado con exito");
                }
});

})


})
