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
		$('#name2Down').html(nombre);
		$('#name3Down').html(nombre);
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
			var module2=localStorage['RankAllUser'];
			/////________________INSERCCIONES AL MENU SEGUN PRIVILEGIOS_______
			var sp = module.split(",");
			var sp2 = module2.split(",");//SEPARADOR NUEVO
			//console.log(sp+" | "+sp2);
			if((sp[0]!=sp2[0])||(sp[1]!=sp2[1])||(sp[2]!=sp2[2])||(sp[3]!=sp2[3])){//NUEVA VALIDACION
				mensajes.UpdateModules();//MENSAJE NUEVO
				btnSecionClose();//FUNCION YA EXISTENTE
			}
			/////________________INSERCCIONES AL MENU SEGUN PRIVILEGIOS_______
			break;
		}
	});
}

//VALIDACION E INSERCCION DE LA VARIABLE DETECTADA EN RESPONSIVO_____________-
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
	var li1=$("<li ></li>");
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
	var li3=$("<li class='active'></li>");
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
///____________________________________________________________________________________________
});