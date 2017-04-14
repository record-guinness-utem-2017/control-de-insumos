///////////////////----PAGINA COMPLETAMENTE CARGADA-----------------
$( window ).on( "load", function() {
	//$("#imgLoad").html("");
	$("#imgLoad").addClass("pruebaxD");
	//$("#imgLoad").show('hide')
	//$("#bodyBaby").removeClass("bodyBaby");
    $("#bodyBaby").addClass("RemoveCssLoad");
});
///////////////////----PAGINA COMPLETAMENTE CARGADA-----------------
$(document).ready(function(){


$('#LodadWindows').load('/app/windowsIndex.html');

mensajes={
	mensaje:function(texto){
		alert(texto);
	},
	NoAcceso:function(nombre){
		demo.showNotification('top','center',"La persona "+nombre+" existe en el sistema.",2);
	},
	InpIsEmprty:function(){
		demo.showNotification('top','center',"NO SE PERMITEN CAMPOS VACIOS.",4);
	},
	NoExiste:function(){
		demo.showNotification('top','center',"ESTA PERSONA NO EXISTE EN EL SISTEMA",4);
	},
	UpdateTrue:function(){
		demo.showNotification('top','center',"La persona ahora se encuentra adentro",2);
	},
	sessionDeath:function(){
		mensajes.mensaje("404 Not Found");
	},
	ReloaModul:function(){
		demo.showNotification('top','center',"Actualizado.",2);
	},
	UpdateModules: function(){
		mensajes.mensaje("Tu perfil a sido modificado, inisia de nuevo para continuar...");
	}
};

///////////////---------VRIFICAMOS QUE ESTE LA SECION INICIADA-------------------
function sessionesInside(){
	var id=localStorage['ids'];
	var nombre=localStorage['nombre'];
	var rank=localStorage['rank'];
	if((id==undefined)||(nombre==undefined)||(rank==undefined)){
		mensajes.sessionDeath();
		localStorage.clear();
		var url="/index.html";
		window.location=url;
	}else{
		$('#NamePerson').html(nombre);
	}
}
sessionesInside();

////////////////////////////////////////VALIDACION SOLO PARA DATOS NUMERICOS
myFunction=function(event){
	var charCode = event.keyCode;
	//console.log(event.keyCode); 189=-
	if (charCode > 31 && (charCode < 48 || charCode > 57)){
		return false;
	}else{
		return true;
	}
}


////////////////////////////////////////VALIDACION SOLO PARA DATOS NUMERICOS
/*
	$('#inpNo_Control').on('input',function(){
		btnClick();
	});
*/
btnClick=function(){
	var SumandoLista=0;
	var inpNo=$('#inpNo_Control').val().trim();
	if(check(inpNo)==true){

	var Arrastrada=$('#inpNo_Control').val().trim();
	var url = '/ajax/phpindex/phpindex.php';
		var params={
			mensaje: Arrastrada
		};
		$.post(url, params).done(function(data){
			var json = JSON.parse(data);
			if(json.ok.length == 0){
				mensajes.NoExiste();
			}else{
				for(var i=0;i<json.ok.length;i++){
					var nombre=json.ok[i].nombre;
					var estatus_entrada=json.ok[i].estatus_entrada;
					var idOriginal=json.ok[i].id;

					SumandoLista++;

					llenado_de_campos(nombre, estatus_entrada, idOriginal);
					mensajes.NoAcceso(nombre);
				}
				$('#totalList').text(SumandoLista);
			}
		});
	}
}


function CreateSelect(){///////////////AGREGA ESTO
	var select=$("<select id='inpArea_Db' class='form-control'></select>");
	var op1=$("<option value='almacen' selected>Almacén</option>");
	var op2=$("<option value='desinfeccion'>Desinfección</option>");
	var op3=$("<option value='picado'>Picado</option>");
	var op4=$("<option value='sistemas'>Sistemas</option>");
  var op5=$("<option value='administrativos'>Administrativos</option>");
  var op6=$("<option value='staff'>Staff</option>");
	select.append(op1);
	select.append(op2);
	select.append(op3);
	select.append(op4);
  select.append(op5);
  select.append(op6);
	return $('<td></td>').append(select);
}

function llenado_de_campos(nombre, estatus_entrada, idOriginal){
	$('#insertDates').html("");
	var tr=$("<tr></tr>");
	var td1=$("<td></td>"); td1.text(nombre);
	//console.log(estatus_entrada);
	if(estatus_entrada==0){
		var td2=$("<td><button type='button' class='btn btn-primary'>Entrada</button></td>");
    var td5_5=$(CreateSelect());
		$(td2).click({id: idOriginal},UpdateStatus);
	}else{
		var td2=$("<td><button type='button' class='btn btn-warning'>Salida</button></td>");
		$(td2).click({id: idOriginal},UpdateStatusOut);
	}

	tr.append(td1); tr.append(td5_5); tr.append(td2);

	$('#insertDates').append(tr);
}

UpdateStatusOut=function(id){
    var textt=id.data.id;

    var Security=confirm("Seguro de que este alumno saldra de las instalaciones?");
    if(Security==true){
    	var url = '/ajax/phpindex/ModifieStatusOut.php';
		var params={
			mensaje: textt,
			mensaje2: localStorage['nombre']
		};
		$.post(url, params).done(function(data){
			PeopleInside();
			btnClick();
			HistoryAll();
			PeopleSessionOn();
			mensajes.UpdateTrue();
      $('#inpNo_Control').val('');
		});
    }
};

UpdateStatus=function(id){
    var textt=id.data.id;
    var variable=$('#inpArea_Db').val();

    var Security=confirm("Seguro de que este alumno ingresara a las instalaciones a el area | "+variable+" |");
    if(Security==true){
    	var url = '/ajax/phpindex/ModifieStatus.php';
		var params={
			mensaje: textt,
			mensaje2: localStorage['nombre'],
      mensaje3: variable,
		};
		$.post(url, params).done(function(data){
			PeopleInside();
			btnClick();
			HistoryAll();
			mensajes.UpdateTrue();
      $('#inpNo_Control').val('');
		});
    }
};

function check(inpNo){
	if(inpNo==""){
		mensajes.InpIsEmprty();
		return false;
	}else{
		return true;
	}
}

btnSecionClose= function(){
	var url = '/ajax/phpindex/PeopleInside.php';
	var url2 = '/ajax/phpindex/SessionOut.php';
	var params={
		mensaje: localStorage['ids']
	};
	$.post(url2, params).done(function(data){
		localStorage.clear();
		var url="/index.html";
		window.location=url;
	});
}


/////////////////////////_____________MODULO NUMERO DOS REPORTES DE PERSONAS DENTRO ETC...
//////CONTADOR RAPIDO DE DATOS-_____________________________
function PeopleSessionOn(){
	var url = '/ajax/phpindex/PeopleSessionOn.php';
	contador=0;
	$.post(url).done(function(data){
		var json = JSON.parse(data);
		for(var i=0;i<json.ok.length;i++){
			var cantidad= json.ok[i].cantidad;
			$('#PersonasConectadas').html(cantidad);
		}
		
	});
}
PeopleSessionOn();

function PeopleInside(){
	var url = '/ajax/phpindex/PeopleInside.php';

	$.post(url).done(function(data){
		var json = JSON.parse(data);
		for(var i=0;i<json.ok.length;i++){
			var cantidad= json.ok[i].cantidad;
			$('#PersonasAdentro').html(cantidad);
		}
		
	});
}
PeopleInside();

function HistoryAll(){
	var url = '/ajax/phpindex/HistoryAll.php';

	$.post(url).done(function(data){
		var json = JSON.parse(data);
		for(var i=0;i<json.ok.length;i++){
			var allHi= json.ok[i].allHi;
			$('#AllHistoryCount').html(allHi);
		}
		
	});
}
HistoryAll();
//////CONTADOR RAPIDO DE DATOS-_____________________________


RelodingGunctions=function(){
	PeopleSessionOn();
	PeopleInside();
	HistoryAll();
	mensajes.ReloaModul();
}



function carga(){
var contador_s =0;
var minutos=0;
cronometro = setInterval(
    function(){
        if(contador_s==60){
            contador_s=0;
            minutos++;
            if(minutos==3){
            	minutos=0;
            	PeopleSessionOn();
            	PeopleInside();
            	HistoryAll();
            }
        }
        contador_s++;
        //console.log("segundos: " +contador_s+" Minuto: "+minutos);
    },1000);
}
carga();

////MOSTRAR VENTANA POR FILLTROS-----
$('#btnwindowPDentro').on('click', function(){
	ListaFiltradoUno();
	$("#windowFiltroUno").modal("show");
});

////MOSTRAR VENTANA POR FILLTROS-----
$('#btnFiltroDos').on('click', function(){
	ListaFiltradoDos();
	$("#windowFiltroDos").modal("show");
});

////MOSTRAR VENTANA POR FILLTROS-----
$('#btnFiltroTres').on('click', function(){
	ListaFiltradoTres();
	$("#windowFiltroTres").modal("show");
});


///////cargando datos de filtrados----------------------------
function ListaFiltradoUno(){
	var url = '/ajax/phpindex/PeopleInsideFiltroUno.php';
	$('#insertDatesFiltroUno').html("");
	var contador=0;
	$.post(url).done(function(data){
		var json = JSON.parse(data);
		for(var i=0;i<json.ok.length;i++){
				var nombre= json.ok[i].nombre;
				var numero= json.ok[i].numero;

			var tr=$("<tr></tr>");
			var td1=$("<td></td>"); td1.text(nombre);
			var td2=$("<td></td>"); td2.text(numero);
			tr.append(td1); tr.append(td2);
			$('#insertDatesFiltroUno').append(tr);
			contador++;
		}
		$('#contadorTotal').text(contador);
	});
}

///////cargando datos de filtrados----------------------------
function ListaFiltradoDos(){
	var url = '/ajax/phpindex/PeopleInsideFiltroDos.php';
	$('#insertDatesFiltroDos').html("");
	var contador=0;
	$.post(url).done(function(data){
		var json = JSON.parse(data);
		for(var i=0;i<json.ok.length;i++){
				var nombre= json.ok[i].nombre;
				var numero= json.ok[i].numero;
				var rank= json.ok[i].rank;
			if(rank=="a"){
				rank="ADMINISTRADOR";
			}else if(rank=="c"){
				rank="Checador";
			}else if ( ! rank){
				rank="Sin Privilegios";
			}else if (rank=="s"){
				rank="Supervisor de mesas";
			}else if(rank=="al"){
				rank="Almacén";
			}else if (rank=="d"){
				rank="Director de carrera";
			}

			var tr=$("<tr></tr>");
			var td1=$("<td></td>"); td1.text(nombre);
			var td2=$("<td></td>"); td2.text(numero);
			var td3=$("<td></td>"); td3.text(rank);
			tr.append(td1); tr.append(td2); tr.append(td3);
			$('#insertDatesFiltroDos').append(tr);
			contador++;
		}
		$('#contadorTotal2').text(contador);
	});
}




///////cargando datos de filtrados----------------------------
function ListaFiltradoTres(){
	var url = '/ajax/phpindex/PeopleInsideFiltroTres.php';
	$('#insertDatesFiltroTres').html("");
	var contador=0;
	$.post(url).done(function(data){
		var json = JSON.parse(data);
		for(var i=0;i<json.ok.length;i++){
				var nombre= json.ok[i].nombre;
				var time= json.ok[i].time;
				var dato= json.ok[i].dato;
				var Por= json.ok[i].Por;

			var tr=$("<tr></tr>");
			var td1=$("<td></td>"); td1.text(nombre);
			var td2=$("<td></td>"); td2.text(dato);
			var td3=$("<td></td>"); td3.text(time);
			var td4=$("<td></td>"); td4.text(Por);
			tr.append(td1); tr.append(td2); tr.append(td3); tr.append(td4);
			$('#insertDatesFiltroTres').append(tr);
			contador++;
		}
		$('#contadorTotal3').text(contador);
	});
}

////MOSTRAR VENTANA POR FILLTROS-----


//FILTRO DE EL MODULO NUMEROM TRES________________________________________________

filtroTres=function(){
	var inpFil= $('#inpFecha').val().trim();
	if(inpFil==""){
		ListaFiltradoTres();
	}else{
		DateSearch(inpFil);
	}
}

function DateSearch(inpFil){
	var url = '/ajax/phpindex/DateSearch.php';
	$('#insertDatesFiltroTres').html("");
	var params={
		mensaje: inpFil
	}
	console.log("entre");
	$.post(url, params).done(function(data){
		var json = JSON.parse(data);
		for(var i=0;i<json.ok.length;i++){
			var nombre= json.ok[i].nombre;
			var time= json.ok[i].time;
			var dato= json.ok[i].dato;
			var Por= json.ok[i].Por;

			console.log(nombre);

			var tr=$("<tr></tr>");
			var td1=$("<td></td>"); td1.text(nombre);
			var td2=$("<td></td>"); td2.text(dato);
			var td3=$("<td></td>"); td3.text(time);
			var td4=$("<td></td>"); td4.text(Por);
			tr.append(td1); tr.append(td2); tr.append(td3); tr.append(td4);
			$('#insertDatesFiltroTres').append(tr);
		}
	});
}

/////////////////////////_____________MODULO NUMERO DOS REPORTES DE PERSONAS DENTRO ETC...


});