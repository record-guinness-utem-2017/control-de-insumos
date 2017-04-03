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
		var url="/app/index.html";
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
	var url = '/ajax/phpindex/SearchModules.php';
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
				$('#ManuAcces').append(CreatePesos());
			}
			if(sp[2]==1){
				$('#ManuAcces').append(CreateAjustes());
			}
			if(sp[3]==1){
				$('#ManuAcces').append(CreateReportes());
			}
			/////________________INSERCCIONES AL MENU SEGUN PRIVILEGIOS_______
			break;
		}
	});
}

function CreateIndex(){
////////____________creacion del INICIO______
	var li1=$("<li></li>");
	var a1=$("<a href='index.html'></a>");
	var i1=$("<i class='ti-home'></i>");
	var p1=$("<p>INICIO</p>");
	a1.append(i1); a1.append(p1); li1.append(a1);
	return li1;
////////____________creacion del INICIO______
}

function CreatePesos(){
////////____________creacion del PESOS_________
	var li2=$("<li></li>");
	var a2=$("<a href='index.html'></a>");
	var i2=$("<i class='ti-panel'></i>");
	var p2=$("<p>PESOS</p>");
	a2.append(i2); a2.append(p2); li2.append(a2);
	return li2;
////////____________creacion del PESOS_________
}

function CreateAjustes(){
////////____________creacion del AJUSTES________
	var li3=$("<li class='active'></li>");
	var a3=$("<a href='ajustes.html'></a>");
	var i3=$("<i class='ti-exchange-vertical'></i>");
	var p3=$("<p>AJUSTES</p>");
	a3.append(i3); a3.append(p3); li3.append(a3);
	return li3;
////////____________creacion del AJUSTES________
}

function CreateReportes(){
////////____________creacion del AJUSTES________
	var li4=$("<li></li>");
	var a4=$("<a href='index.html'></a>");
	var i4=$("<i class='ti-panel'></i>");
	var p4=$("<p>REPORTES</p>");
	a4.append(i4); a4.append(p4); li4.append(a4);
	return li4;
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
///____________________________________________________________________________________________
});