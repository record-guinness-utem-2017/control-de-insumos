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

ListaFiltradoTres();
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
	ChangueTrue:function(){
		mensajes.mensaje("los cambios an sido aplicados exitosa mente...");
	}
};

$('#btnAgregarUsers').on('click', function(){
	$("#windowFiltroCuatro").modal("show");
});


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
		$('#NamePerson').html(nombre);
		$('#name2Down').html(nombre);
		$('#name3Down').html(nombre);
	}
}
sessionesInside();

function ListaFiltradoTres(){
	$('#insertDatesFiltroDos').html("");
	var url = "/ajax/phpindex/PeopleInsideFiltroCinco.php";
	$('#insertDatesFiltroTres').html("");
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
			} else if (rank == null){
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

function check(inpNo){
	if(inpNo==""){
		mensajes.InpIsEmprty();
		return false;
	}else{
		return true;
	}
}

btnClick=function(){
	var inpNo=$('#inpNo_Control2').val().trim();
	if(check(inpNo)==true){

	var Arrastrada=$('#inpNo_Control2').val().trim();
	var url = "/ajax/phpindex/phpajustes.php";
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
					var numero=json.ok[i].numero;
					var rank=json.ok[i].rank;
					var idOriginal=json.ok[i].id;


					llenado_de_campos(nombre, numero, rank, idOriginal);
					mensajes.NoAcceso(nombre);
				}
			}
		});
	}




}

function llenado_de_campos(nombre, numero, rank, idOriginal){

	$('#insertDatesFiltroCuatro').html("");
	var contador=0;
			if(rank=="a"){
				rank="ADMINISTRADOR";
			}else if(rank=="c"){
				rank="Checador";
			}else if (rank==null){
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

			if(rank=="Sin Privilegios"){
			var td5=$("<td><a href='#' data-dismiss='modal' class='btn btn-primary'>Agregar</a></td><br><br>");
			$(td5).click({id: idOriginal}, UpdateDates);

			tr.append(td1); tr.append(td2); tr.append(td3); tr.append(td5);
			$('#insertDatesFiltroCuatro').append(tr);

			}else{

			var td5=$("<td><a href='#' data-dismiss='modal' class='btn btn-primary'>Modificar</a></td><br><br>");
			$(td5).click({id: idOriginal}, UpdateDatesdos);

			tr.append(td1); tr.append(td2); tr.append(td3); tr.append(td5);
			$('#insertDatesFiltroCuatro').append(tr);

			}


		}


function UpdateDates(id){
	var texto=id.data.id;
	$('#FantasmitaxD').val(texto);
	PeticionModulesView(texto);
	$('#windowFiltroData').modal("show");
}

function UpdateDatesdos(id){
	var texto=id.data.id;
	$('#FantasmitaxD').val(texto);
	PeticionModulesViewdos(texto);
	$('#windowFiltroModifieData').modal("show");
}

function PeticionModulesView(texto){

	var url = "/ajax/phpindex/SElectModulesView.php";
	var params={
		mensaje: texto
	}
	$.post(url, params).done(function(data){
		var json=JSON.parse(data);
		for(var i=0;i<json.ok.length;i++){
			var module=json.ok[i].module;

			Constructor(module);
			break;

		}
	});
}

function PeticionModulesViewdos(texto){

	var url ="/ajax/phpindex/SElectModulesView.php";
	var params={
		mensaje: texto
	}
	$.post(url, params).done(function(data){
		var json=JSON.parse(data);
		for(var i=0;i<json.ok.length;i++){
			var module=json.ok[i].module;
			ConstructorModifieRank(module);
			break;
		}
	});
}

function Constructor(module){
	$('#UnidMasCorto').html("");

	var separador=module.split(",");

	if(separador[0]==1){
		var p1=$("<p>¿Este usuario podra visualización la pantalla Index?</p>");
			var inp1_1=$('<br><input name="uno" value="1" type="radio" checked="checked">SI<br></input>');
			var inp1_2=$('<input name="uno" value="0" type="radio">No<br></input>');
	}else{
		var p1=$("<p>¿Este usuario podra visualización la pantalla Index?</p>");
			var inp1_1=$('<br><input name="uno" value="1" type="radio">Si<br></input>');
			var inp1_2=$('<input name="uno" value="0" type="radio" checked="checked">No<br></input>');
	}
	if(separador[1]==1){
		var p2=$("<p>¿Este usuario podra visualización la pantalla Pesos?</p>");
			var inp2_1=$('<br><input name="dos" value="1" type="radio" checked="checked">SI<br></input>');
			var inp2_2=$('<input name="dos" value="0" type="radio">NO<br></input>');
	}else{
		var p2=$("<p>¿Este usuario podra visualización la pantalla Pesos?</p>");
			var inp2_1=$('<br><input name="dos" value="1" type="radio">SI<br></input>');
			var inp2_2=$('<input name="dos" value="0" type="radio" checked="checked">NO<br></input>');
	}
	if(separador[2]==1){
		var p3=$("<p>¿Este usuario podra visualización la pantalla Ajustes?</p>");
			var inp3_1=$('<br><input name="tres" value="1" type="radio" checked="checked">SI<br></input>');
			var inp3_2=$('<input name="tres" value="0" type="radio">NO<br></input>');
	}else{
		var p3=$("<p>¿Este usuario podra visualización la pantalla Ajustes?</p>");
			var inp3_1=$('<br><input name="tres" value="1" type="radio">SI<br></input>');
			var inp3_2=$('<input name="tres" value="0" type="radio" checked="checked">NO<br></input>');
	}
	if(separador[3]==1){
		var p4=$("<p>¿Este usuario podra visualización la pantalla Reportes?</p>");
			var inp4_1=$('<br><input name="cuatro" value="1" type="radio" checked="checked">SI<br></input>');
			var inp4_2=$('<input name="cuatro" value="0" type="radio">NO<br></input>');
	}else{
		var p4=$("<p>¿Este usuario podra visualización la pantalla Reportes?</p>");
			var inp4_1=$('<br><input name="cuatro" value="1" type="radio">SI<br></input>');
			var inp4_2=$('<input name="cuatro" value="0" type="radio" checked="checked">NO</input>');
	}

	p1.append(inp1_1); p1.append(inp1_2); p2.append(inp2_1); p2.append(inp2_2);
	p3.append(inp3_1); p3.append(inp3_2); p4.append(inp4_1); p4.append(inp4_2);

	$('#UnidMasCorto').append(p1); $('#UnidMasCorto').append(p2);
	$('#UnidMasCorto').append(p3); $('#UnidMasCorto').append(p4);

}

function ConstructorModifieRank(module){

	$('#UnidMasCorto2').html("");

	var separador=module.split(",");

	if(separador[0]==1){
		var p1=$("<p>¿Modificar la visualización de la pantalla Index?</p>");
			var inp1_1=$('<br><input name="uno" value="1" type="radio" checked="checked">SI<br></input>');
			var inp1_2=$('<input name="uno" value="0" type="radio">No<br></input>');
	}else{
		var p1=$("<p>¿Modificar la visualización de la pantalla Index?</p>");
			var inp1_1=$('<br><input name="uno" value="1" type="radio">Si<br></input>');
			var inp1_2=$('<input name="uno" value="0" type="radio" checked="checked">No<br></input>');
	}
	if(separador[1]==1){
		var p2=$("<p>¿Modificar la visualización de la pantalla Pesos?</p>");
			var inp2_1=$('<br><input name="dos" value="1" type="radio" checked="checked">SI<br></input>');
			var inp2_2=$('<input name="dos" value="0" type="radio">NO<br></input>');
	}else{
		var p2=$("<p>¿Modificar la visualización de la pantalla Pesos?</p>");
			var inp2_1=$('<br><input name="dos" value="1" type="radio">SI<br></input>');
			var inp2_2=$('<input name="dos" value="0" type="radio" checked="checked">NO<br></input>');
	}
	if(separador[2]==1){
		var p3=$("<p>¿Modificar la visualización de la pantalla Ajustes?</p>");
			var inp3_1=$('<br><input name="tres" value="1" type="radio" checked="checked">SI<br></input>');
			var inp3_2=$('<input name="tres" value="0" type="radio">NO<br></input>');
	}else{
		var p3=$("<p>¿Modificar la visualización de la pantalla Ajustes?</p>");
			var inp3_1=$('<br><input name="tres" value="1" type="radio">SI<br></input>');
			var inp3_2=$('<input name="tres" value="0" type="radio" checked="checked">NO<br></input>');
	}
	if(separador[3]==1){
		var p4=$("<p>¿Modificar la visualización de la pantalla Reportes?</p>");
			var inp4_1=$('<br><input name="cuatro" value="1" type="radio" checked="checked">SI<br></input>');
			var inp4_2=$('<input name="cuatro" value="0" type="radio">NO<br></input>');
	}else{
		var p4=$("<p>¿Modificar la visualización de la pantalla Reportes?</p>");
			var inp4_1=$('<br><input name="cuatro" value="1" type="radio">SI<br></input>');
			var inp4_2=$('<input name="cuatro" value="0" type="radio" checked="checked">NO</input>');
	}

	p1.append(inp1_1); p1.append(inp1_2); p2.append(inp2_1); p2.append(inp2_2);
	p3.append(inp3_1); p3.append(inp3_2); p4.append(inp4_1); p4.append(inp4_2);


	$('#UnidMasCorto2').append(p1); $('#UnidMasCorto2').append(p2);
	$('#UnidMasCorto2').append(p3); $('#UnidMasCorto2').append(p4);

}

SabeonChange=function(){
	var index=$("input[name=uno]:checked").val();
	var ajustes=$("input[name=dos]:checked").val();
	var pesos=$("input[name=tres]:checked").val();
	var reportes=$("input[name=cuatro]:checked").val();

	var Security=confirm("Seguro de que desea guardar los cambios?");
	if(Security==true){
		ChangueonDBRanks(index, ajustes, pesos, reportes);
	}
}

function ChangueonDBRanks(index, ajustes, pesos, reportes){
	var Quien=$('#FantasmitaxD').val();
	var concatenado=index+","+ajustes+","+pesos+","+reportes
	var url ="/ajax/phpindex/ModifieRank.php";
	var params={
		mensaje: Quien,
		concatenado: concatenado
	}
	$.post(url, params).done(function(data){
		mensajes.ChangueTrue();
	});

	$('#inpNo_Control2').val("");
	$('#insertDatesFiltroCuatro').html("");
	var bien=$('<td>-</td><td>-</td><td>-</td><td>-</td>');
	$('#insertDatesFiltroCuatro').append(bien);
	ListaFiltradoTres();
}

///____________________________________________________________________________________________
});

