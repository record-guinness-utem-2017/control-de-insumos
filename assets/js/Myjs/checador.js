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


$('#LodadWindows').load('assets/WindowsEmergent/windowsIndex.html');

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
		var url=VariableLocal+"/cevicheapp/index.html";
		window.location=url;
	}else{
		LoadPrivileges(rank, id);
		$('#NamePerson').html(nombre);
	}
}
sessionesInside();

function LoadPrivileges(rank, id){
	var url =VariableLocal+"/cevicheapp/cevicheapp/assets/php/phpindex/SearchModules.php";
	var params={
		mensaje: id
	};
	$.post(url, params).done(function(data){
		var json = JSON.parse(data);
		for(var i=0;i<json.ok.length;i++){
			var module=json.ok[i].module;
			/////________________INSERCCIONES AL MENU SEGUN PRIVILEGIOS_______
			var sp = module.split(",");
			if(sp[0]==1){
				$('#ManuAcces').append(CreateIndex());
			}
			if(sp[1]==1){
				$('#ManuAcces').append(CreateAjustes());
			}
			if(sp[2]==1){
				$('#ManuAcces').append(CreateNPedido());
			}
			if(sp[3]==1){
				$('#ManuAcces').append(CreateAtenderPedidos());
			}
			if(sp[4]==1){
				$('#ManuAcces').append(CreateVerPedidos());
			}
			if(sp[5]==1){
				$('#ManuAcces').append(CreateAlmacen());
			}
			/////________________INSERCCIONES AL MENU SEGUN PRIVILEGIOS_______
			break;
		}
	});
}

function CreateIndex(){
////////____________creacion del INICIO______
	var li1=$("<li class='active'></li>");
	var a1=$("<a href='checador.html'></a>");
	var i1=$("<i class='ti-home'></i>");
	var p1=$("<p>CHECADOR</p>");
	a1.append(i1); a1.append(p1); li1.append(a1);
	return li1;	
////////____________creacion del INICIO______
}

function CreateAjustes(){
////////____________creacion del PESOS_________
	var li2=$("<li></li>");
	var a2=$("<a href='ajustes.html'></a>");
	var i2=$("<i class='ti-panel'></i>");
	var p2=$("<p>AJUSTES</p>");
	a2.append(i2); a2.append(p2); li2.append(a2);
	return li2;
////////____________creacion del PESOS_________
}

function CreateNPedido(){
////////____________creacion del AJUSTES________
	var li3=$("<li></li>");
	var a3=$("<a href='nuevoPedido.html'></a>");
	var i3=$("<i class='ti-exchange-vertical'></i>");
	var p3=$("<p>NUEVO PEDIDO</p>");
	a3.append(i3); a3.append(p3); li3.append(a3);
	return li3;
////////____________creacion del AJUSTES________
}

function CreateAtenderPedidos(){
////////____________creacion del AJUSTES________
	var li4=$("<li></li>");
	var a4=$("<a href='atenderPedido.html'></a>");
	var i4=$("<i class='ti-panel'></i>");
	var p4=$("<p>ATENDER PEDIDO</p>");
	a4.append(i4); a4.append(p4); li4.append(a4);
	return li4;
////////____________creacion del AJUSTES________
}
function CreateVerPedidos(){
////////____________creacion del AJUSTES________
	var li5=$("<li></li>");
	var a5=$("<a href='verPedido.html'></a>");
	var i5=$("<i class='ti-panel'></i>");
	var p5=$("<p>VER MIS PEDIDOS</p>");
	a5.append(i5); a5.append(p5); li5.append(a5);
	return li5;
////////____________creacion del AJUSTES________
}
function CreateAlmacen(){
////////____________creacion del AJUSTES________
	var li6=$("<li></li>");
	var a6=$("<a href='almacen.html'></a>");
	var i6=$("<i class='ti-panel'></i>");
	var p6=$("<p>ALMACEN</p>");
	a6.append(i6); a6.append(p6); li6.append(a6);
	return li6;
////////____________creacion del AJUSTES________
}
///////////////---------VRIFICAMOS QUE ESTE LA SECION INICIADA-------------------
/*
btnClose= function(){
	$('#inpNo_Control').val("");
}
*/
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
	var url =VariableLocal+"/cevicheapp/cevicheapp/assets/php/phpindex/phpindex.php";
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

function llenado_de_campos(nombre, estatus_entrada, idOriginal){
	$('#insertDates').html("");
	var tr=$("<tr></tr>");
	var td1=$("<td></td>"); td1.text(nombre);
	//console.log(estatus_entrada);
	if(estatus_entrada==0){
		var td2=$("<td><button type='button' class='btn btn-primary'>Entrada</button></td>");
		$(td2).click({id: idOriginal},UpdateStatus);
	}else{
		var td2=$("<td><button type='button' class='btn btn-warning'>Salida</button></td>");
		$(td2).click({id: idOriginal},UpdateStatusOut);
	}

	tr.append(td1); tr.append(td2);

	$('#insertDates').append(tr);
}

UpdateStatusOut=function(id){
    var textt=id.data.id;

    var Security=confirm("Seguro de que este alumno saldra de las instalaciones?");
    if(Security==true){
    	var url =VariableLocal+"/cevicheapp/cevicheapp/assets/php/phpindex/ModifieStatusOut.php";
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
		});
    }
};

UpdateStatus=function(id){
    var textt=id.data.id;

    var Security=confirm("Seguro de que este alumno ingresara a las instalaciones?");
    if(Security==true){
    	var url =VariableLocal+"/cevicheapp/cevicheapp/assets/php/phpindex/ModifieStatus.php";
		var params={
			mensaje: textt,
			mensaje2: localStorage['nombre']
		};
		$.post(url, params).done(function(data){
			PeopleInside();
			btnClick();
			HistoryAll();
			mensajes.UpdateTrue();
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
	var url =VariableLocal+"/cevicheapp/cevicheapp/assets/php/phpindex/PeopleInside.php";
	var url2 =VariableLocal+"/cevicheapp/cevicheapp/assets/php/phpindex/SessionOut.php";
	var params={
		mensaje: localStorage['ids']
	};
	$.post(url2, params).done(function(data){
		localStorage.clear();
		var url=VariableLocal+"/cevicheapp/index.html";
		window.location=url;
	});
}


/////////////////////////_____________MODULO NUMERO DOS REPORTES DE PERSONAS DENTRO ETC...
//////CONTADOR RAPIDO DE DATOS-_____________________________
function PeopleSessionOn(){
	var url =VariableLocal+"/cevicheapp/cevicheapp/assets/php/phpindex/PeopleSessionOn.php";
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
	var url =VariableLocal+"/cevicheapp/cevicheapp/assets/php/phpindex/PeopleInside.php";

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
	var url =VariableLocal+"/cevicheapp/cevicheapp/assets/php/phpindex/HistoryAll.php";

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
////MOSTRAR VENTANA POR FILLTROS-----


///////cargando datos de filtrados----------------------------
function ListaFiltradoUno(){
	var url =VariableLocal+"/cevicheapp/cevicheapp/assets/php/phpindex/PeopleInsideFiltroUno.php";
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
	var url =VariableLocal+"/cevicheapp/cevicheapp/assets/php/phpindex/PeopleInsideFiltroDos.php";
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
			}else if (rank=="nulll"){
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
	var url =VariableLocal+"/cevicheapp/cevicheapp/assets/php/phpindex/PeopleInsideFiltroTres.php";
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
	var url =VariableLocal+"/cevicheapp/cevicheapp/assets/php/phpindex/DateSearch.php";
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