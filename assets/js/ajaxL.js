
$(document).ready(function() {
        $( "#btnClickL" ).click(function() {

        var inputLimonC = $("#inputLimonC").val();
        var inputLimonK = $("#inputLimonK").val();

        //var prueba = document.getElementById('#inputJitomate').val();
        
  
           
        $.ajax({
                type:  'post',
                url:   '/ajax/configuracion/actualizacionL.php',
                data:  ('inputLimonC='+inputLimonC+'&inputLimonK='+inputLimonK) ,
                beforeSend: function () {
                          alert("Guardando....");
                },
                success:  function (response) {
                       alert("Guardado con exito");
                }
});

})


})
