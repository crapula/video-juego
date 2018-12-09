var tiempo;
var min;
var seg;
var temporizador;
var verifica = false;


function atualizarReloj() {
  var number = document.getElementById('timer');
  var hora = 0;
  var minutos = 1 - min;
  var segundos = 59 - seg;

  if (min == 2) {
    tiempoAtras = "0";
    tiempoAtras += ":00";
    tiempoAtras += ":00";
    FinalizarJuego();
  } else {
    tiempoAtras = (hora < 10) ? hora : hora;
    tiempoAtras += ((minutos < 10) ? ":0" : ":") + (minutos);
    tiempoAtras += ((segundos < 10) ? ":0" : ":") + (segundos);
    temporizador = setTimeout("atualizarReloj()", 1000);
  }
  if (seg == 59) {
    min += 1;
    seg = 0;
  } else {
    seg += 1;
  }
  number.innerHTML = tiempoAtras;
}


function color(elemento) {
  var color = $(elemento).css("color");
  if (color == "rgb(255, 255, 0)") {
    $(elemento).css("color", "green");
  } else {
    $(elemento).css("color", "yellow");
  }
  setTimeout(color(".main-titulo"), 1000);
}


function dulce() {

  for (var i = 1; i < 8; i++) {
    for (var j = 1; j < 8; j++) {
      var tipoDulce = Math.floor((Math.random() * 4) + 1);
      var fila = "<div class='row-" + j + "'></div>";
      var elementoImg = document.createElement('img')
      $(".col-" + i).append(elementoImg)
      $(elementoImg).addClass('elemento')
      $(elementoImg).attr('src', "image/" + tipoDulce + ".png")


    }
  }
  agregarDulces();
  JugadaVertical();
  JugadaHorizontal();
}

function agregarDulces() {
  $('img').draggable({
    containment: '.panel-tablero',
    droppable: 'img',
    revert: true,
    revertDuration: 500,
    grid: [100, 100],
    zIndex: 10,
    drag: contraerCandyMovimiento
  });
  $('img').droppable({

    drop: moverDulce
  });
  JugadaVertical();
  JugadaHorizontal();

}

function moverDulce(event, candyDrag) {
  var candyDrag = $(candyDrag.draggable);
  var dragSrc = candyDrag.attr('src');
  var candyDrop = $(this);
  var dropSrc = candyDrop.attr('src');
  candyDrag.attr('src', dropSrc);
  candyDrop.attr('src', dragSrc);

  setTimeout(function () {
    JugadaVertical();
    JugadaHorizontal();
    actualMovimientos();
  }, 500);
}

function actualMovimientos() {
  var actualValue = Number($('#movimientos-text').text());
  var result = actualValue += 1;
  $('#movimientos-text').text(result);
}

function actualPuntuacion(eliminados) {
  var puntosActuales = Number($('#score-text').text());
  var nuevosPuntos = puntosActuales += eliminados;
  $('#score-text').text(nuevosPuntos);
}

function contraerCandyMovimiento(event, candyDrag) {
  candyDrag.position.top = Math.min(100, candyDrag.position.top);
  candyDrag.position.bottom = Math.min(100, candyDrag.position.bottom);
  candyDrag.position.left = Math.min(100, candyDrag.position.left);
  candyDrag.position.right = Math.min(100, candyDrag.position.right);

}


function JugadaVertical() {
  var eliminados = 0
  for (var x = 1; x < 8; x++) {
    var vecesVertical = 0;
    var dulceAnterior = "";
    var imagenesEliminar = new Array();
    for (var y = 0; y < 7; y++) {
      var dulce = $(".col-" + x).children('img')[y].src;
      if (dulce == dulceAnterior) {
        vecesVertical += 1;
        if (vecesVertical == 1) {
          imagenesEliminar[1] = $(".col-" + x).children('img')[y - 1];
        }
        imagenesEliminar[vecesVertical + 1] = $(".col-" + x).children('img')[y];
      } else if (dulce != dulceAnterior && vecesVertical < 2) {
        vecesVertical = 0;
        imagenesEliminar = new Array();
      }
      var dulceAnterior = dulce;
    }


    if (vecesVertical >= 2) {
      for (var i = 1; i <= vecesVertical + 1; i++) {

        imagenesEliminar[i].remove();
        eliminados += 1;
      };
      actualPuntuacion(imagenesEliminar.length);
    };

  }
  if (eliminados > 1) {
    LlenarEspacios();
  };


}

function JugadaHorizontal() {
  var eliminadosX = 0
  for (var x = 1; x < 8; x++) {
    var vecesHorizontal = 0;
    var dulceAnteriorX = "";
    var imagenesEliminarX = new Array();
    var z = 0
    for (var y = 0; y < 7; y++) {
      z += 1
      var dulceX = $(".col-" + z).children('img')[x - 1].src;
      if (dulceX == dulceAnteriorX) {
        vecesHorizontal += 1;
        if (vecesHorizontal == 1) {
          var anterior = z - 1
          imagenesEliminarX[1] = $(".col-" + anterior).children('img')[x - 1];
        }
        imagenesEliminarX[vecesHorizontal + 1] = $(".col-" + z).children('img')[x - 1]

      } else if (dulceX != dulceAnteriorX && vecesHorizontal < 2) {
        vecesHorizontal = 0;
        imagenesEliminarX = new Array();
      };
      var dulceAnteriorX = dulceX;
    };
    if (vecesHorizontal >= 2) {

      for (var h = 1; h <= vecesHorizontal + 1; h++) {
        imagenesEliminarX[h].remove();
        eliminadosX += 1;
      }
      actualPuntuacion(imagenesEliminarX.length);
    };
    if (eliminadosX > 1) {
      LlenarEspacios();
    };
  };

}

function LlenarEspacios() {
  for (var i = 1; i < 8; i++) {
    var hijos = 7 - $(".col-" + i).children('img').length;
    for (var j = 0; j < hijos; j++) {
      var tipoDulce = Math.floor((Math.random() * 4) + 1);
      var elementoImg = document.createElement('img')
      $(".col-" + i).prepend(elementoImg)
      $(elementoImg).addClass('elemento')
      $(elementoImg).attr('src', "image/" + tipoDulce + ".png")
    };
  };

  agregarDulces();
}

function ReiniciarJuego(verifica) {
  clearTimeout(temporizador);
  $(".btn-reinicio").text("Iniciar");
  if (verifica) {
    $(".panel-tablero").show("slow");
    $(".panel-score").animate({
      width: "-=50"
    }, 1000);
    verifica = false;
  };

}


function FinalJuego() {
  clearTimeout(temporizador);
  $(".panel-tablero").hide("slow");
  $(".panel-score").animate({
    width: "+=50"
  }, 1000);
  verifica = true;
}

$(".btn-reinicio").on("click", function () {
  var nombre = $(".btn-reinicio").text();
  if (nombre == "Iniciar") {
    $(".btn-reinicio").text("Reiniciar");
    clearTimeout(temporizador);
  } else {
    ReiniciarJuego(verifica);
  }
  min = 0;
  seg = 0;
  $(".elemento").remove('img');
  $('#score-text').text("0");
  $('#movimientos-text').text("0");
  atualizarReloj();
  dulce();
});