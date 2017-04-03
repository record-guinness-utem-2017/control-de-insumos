
$(document).ready(function() {
        $( "#btnClickJ" ).click(function() {

        var inputJitomateC = $("#inputJitomateC").val();
        var inputJitomateK = $("#inputJitomateK").val();
     
        $.ajax({
                type:  'post',
                url:   '/ajax/configuracion/actualizacionJ.php',
                data:  ('inputJitomateC='+inputJitomateC+'&inputJitomateK='+inputJitomateK) ,
                beforeSend: function () {
                         alert("Guardando....");
                },
                success:  function (response) {
                      alert("Guardado con exito");
                }
});

})


})


