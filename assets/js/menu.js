$(function () {
  $('.menu-acceso').each(function () {
    var menu        = $(this);
    var ModulesView = localStorage['RankAllUser'];
    var sp          = ModulesView.split(",");
    if (sp[0] == 1) {
      menu.append(CreateChecador());
    }
    if (sp[1] == 1) {
      menu.append(CreateAjustes());
    }
    if (sp[2] == 1) {
      menu.append(CreateNPedido());
    }
    if (sp[3] == 1) {
      menu.append(CreateAtenderPedidos());
    }
    if (sp[4] == 1) {
      menu.append(CreateVerPedidos());
    }
    if (sp[5] == 1) {
      menu.append(CreateAlmacen());
    }

    console.log(CreateLogout());
    menu.append(CreateLogout());
  });

  function CreateChecador() {
    var li1 = $("<li></li>");
    var a1 = $("<a href='/app/checador.html'></a>");
    var i1 = $("<i class='ti-home'></i>");
    var p1 = $("<p>CHECADOR</p>");
    a1.append(i1);
    a1.append(p1);
    li1.append(a1);
    return li1;
  }

  function CreateAjustes() {
    var li2 = $("<li></li>");
    var a2 = $("<a href='/app/ajustes.html'></a>");
    var i2 = $("<i class='ti-panel'></i>");
    var p2 = $("<p>AJUSTES</p>");
    a2.append(i2);
    a2.append(p2);
    li2.append(a2);
    return li2;
  }

  function CreateNPedido() {
    var li3 = $("<li></li>");
    var a3 = $("<a href='/app/pedidos/nuevo.html'></a>");
    var i3 = $("<i class='ti-exchange-vertical'></i>");
    var p3 = $("<p>NUEVO PEDIDO</p>");
    a3.append(i3);
    a3.append(p3);
    li3.append(a3);
    return li3;
  }

  function CreateAtenderPedidos() {
    var li4 = $("<li></li>");
    var a4 = $("<a href='/app/pedidos/atender.html'></a>");
    var i4 = $("<i class='ti-panel'></i>");
    var p4 = $("<p>ATENDER PEDIDO</p>");
    a4.append(i4);
    a4.append(p4);
    li4.append(a4);
    return li4;
  }

  function CreateVerPedidos() {
    var li5 = $("<li></li>");
    var a5 = $("<a href='/app/pedidos/index.html'></a>");
    var i5 = $("<i class='ti-panel'></i>");
    var p5 = $("<p>VER MIS PEDIDOS</p>");
    a5.append(i5);
    a5.append(p5);
    li5.append(a5);
    return li5;
  }

  function CreateAlmacen() {
    var li6 = $("<li></li>");
    var a6 = $("<a href='/app/almacen.html'></a>");
    var i6 = $("<i class='ti-panel'></i>");
    var p6 = $("<p>ALMACEN</p>");
    a6.append(i6);
    a6.append(p6);
    li6.append(a6);
    return li6;
  }

  function CreateLogout() {
    var li6 = $("<li></li>");
    var a6 = $("<a href='#' onclick='btnSecionClose()'></a>");
    var i6 = $("<i class='ti-logout'></i>");
    var p6 = $("<p>CERRAR SESIÓN</p>");
    a6.append(i6);
    a6.append(p6);
    li6.append(a6);
    return li6;
  }

  function btnSecionClose() {
    var url    = "/ajax/phpindex/PeopleInside.php";
    var url2   = "/ajax/phpindex/SessionOut.php";
    var params = {
      mensaje: localStorage['ids']
    };
    $.post(url2, params).done(function(data){
      localStorage.clear();
      window.location = "/index.html";
    });
  }
});
