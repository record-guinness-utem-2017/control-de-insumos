$(document).ready(function(){



//////////////////////////////////-----------TODO ESTE DESPAPALLE ES DE LA PLANTILLA V V V V V V V V V
// Closes the sidebar menu
    $("#menu-close").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });
    // Opens the sidebar menu
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });
    // Scrolls to the selected menu item on the page
    $(function() {
        $('a[href*=#]:not([href=#],[data-toggle],[data-target],[data-slide])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });
    //#to-top button appears after scrolling
    var fixed = false;
    $(document).scroll(function() {
        if ($(this).scrollTop() > 250) {
            if (!fixed) {
                fixed = true;
                // $('#to-top').css({position:'fixed', display:'block'});
                $('#to-top').show("slow", function() {
                    $('#to-top').css({
                        position: 'fixed',
                        display: 'block'
                    });
                });
            }
        } else {
            if (fixed) {
                fixed = false;
                $('#to-top').hide("slow", function() {
                    $('#to-top').css({
                        display: 'none'
                    });
                });
            }
        }
    });
    // Disable Google Maps scrolling
    // See http://stackoverflow.com/a/25904582/1607849
    // Disable scroll zooming and bind back the click event
    var onMapMouseleaveHandler = function(event) {
        var that = $(this);
        that.on('click', onMapClickHandler);
        that.off('mouseleave', onMapMouseleaveHandler);
        that.find('iframe').css("pointer-events", "none");
    }
    var onMapClickHandler = function(event) {
            var that = $(this);
            // Disable the click handler until the user leaves the map area
            that.off('click', onMapClickHandler);
            // Enable scrolling zoom
            that.find('iframe').css("pointer-events", "auto");
            // Handle the mouse leave event
            that.on('mouseleave', onMapMouseleaveHandler);
        }
        // Enable map zooming with mouse scroll when the user clicks the map
    $('.map').on('click', onMapClickHandler);



















///////////////-----------------------TODO ESTE DESPAPALLE ES MIO OwO----------

$('#LodadWindows').load('windowsEmergent.html');

mensajes={
    mensaje:function(texto){
        alert(texto);
    },
    NoExiste: function(){
        $('#inpPass').val("");
        mensajes.mensaje("Este numero de control y contraseña no coinsiden o no existen.");
    },
    InpisEmpty: function(){
        mensajes.mensaje("No se permiten campos vacíos.");
    },
    PassEmpty: function(){
        mensajes.mensaje("Usuarios y contraseña no validos, contacte al administrador.");
    },
    UserOn: function(){
        mensajes.mensaje("Este usuario ya se encuentra activo en el sistema.");
    }
}

function SessionCheck(){
    var id=localStorage['ids'];
    var nombre=localStorage['nombre'];
    var rank=localStorage['rank'];
    if((id!=undefined)||(nombre!=undefined)||(rank!=undefined)){
        console.log("Session on");
        var url = '/app/index.html';
        window.location=url;
    }
}
SessionCheck();

$( window ).on( "load", function() {
      $("#mostrarmodal").modal("show");
});

$('#btnAcceso').on('click',function(){
    $("#mostrarmodal").modal("show");
});


btnCheck=function(){
    var numero=$('#inpNoControl').val().trim();
    var contra=$('#inpPass').val().trim();
    if(check(numero, contra)==true){
        chekDB(numero, contra);
    }
}

EnterDown=function(event){
    var press=event.keyCode;
    if(press==13){
        btnCheck();
    }
}

function check(numero, contra){
    if((numero=="")||(contra=="")){
        mensajes.InpisEmpty();
        return false;
    }else{
        return true;
    }
}

function chekDB(numero, contra){
    var url = '/ajax/login/acceso.php';
    var params={
        mensaje: numero,
        mensaje2: contra
    };
    $.post(url, params).done(function(data){
        var json = JSON.parse(data);
        if(json.ok.length == 0){
            mensajes.NoExiste();
        }else{
            for(var i=0;i<json.ok.length;i++){
                //aqui recivimos paramestos de json
                var nombre= json.ok[i].nombre;
                var contra= json.ok[i].contra;
                var sessionn= json.ok[i].sessionn;
                var rank= json.ok[i].rank;
                var idPersona= json.ok[i].idPersona;
                if(check2(contra,sessionn)==true){
                    FaceFinal(nombre, rank, idPersona);
                    //console.log(idPersona);
                }
            }
        }
    });
}

function check2(contra,sessionn){
    if(contra=="empty"){
        mensajes.PassEmpty();
        return false;
    }else if(sessionn==1){
        mensajes.UserOn();
        return false;
    }else{
        return true;
    }
}

function FaceFinal(nombre, rank, idPersona){
    localStorage['nombre']=nombre;
    localStorage['rank']=rank;
    localStorage['ids']=idPersona;

    var url = '/ajax/login/update_status.php';
    params={
        mensaje: idPersona
    };
    $.post(url, params).done(function(data){
        cleanInpts();
        console.log("vienvendio "+nombre);
        LoadingPages();
    });
}

function cleanInpts(){
    $('#inpNoControl').val("");
    $('#inpPass').val("");
}


function LoadingPages(){
    var url = '/app/index.html';
    window.location=url;
}

///////////////-----------------------TODO ESTE DESPAPALLE ES MIO OwO----------



});