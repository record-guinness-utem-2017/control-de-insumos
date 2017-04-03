
$(document).ready(function() {
        $( "#btnClickZ" ).click(function() {

        var inputZanahoriaC = $("#inputZanahoriaC").val();
        var inputZanahoriaK = $("#inputZanahoriaK").val();

        //var prueba = document.getElementById('#inputJitomate').val();
        
  
           
        $.ajax({
                type:  'post',
                url:   '/ajax/configuracion/actualizacionZ.php',
                data:  ('inputZanahoriaC='+inputZanahoriaC+'&inputZanahoriaK='+inputZanahoriaK) ,
                beforeSend: function () {
                          alert("Guardando....");
                },
                success:  function (response) {
                       alert("Guardado con exito");
                }
});

})


})
