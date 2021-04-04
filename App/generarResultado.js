function presentarResultados(mensajesResultadoFinal) {
  document.write("<h1>Información</h1>");

  document.getElementsByTagName("h1")[0].style.textAlign  = "center";
  document.getElementsByTagName("h1")[0].style.marginTop  = "32px";
  
  // Obtener la referencia del elemento body
  crearTabla();
  addTitulo();
  crearCuerpoTabla();
  addMensaje(mensajesResultadoFinal);

}

function crearTabla(){
  objTabla = new Tabla();

  var body = document.getElementsByTagName("body")[0];
  body.appendChild(objTabla.crearTabla());
}

function addTitulo(){
  objTabla = new Tabla();

  var tabla = document.getElementsByTagName("table")[0];
  tabla.appendChild(objTabla.crearTituloTabla());
}

function addMensaje(mensajesResultadoFinal){
  objTabla = new Tabla();
  var tblBody = document.getElementsByTagName("tbody")[0];

  for (var i = 1; i < mensajesResultadoFinal.length; i++){
    tblBody.appendChild(objTabla.crearElementoTabla(mensajesResultadoFinal[i]));
  }
}

function crearCuerpoTabla(){
  var tabla = document.getElementsByTagName("table")[0];
  var tblBody = document.createElement("tbody");//Agregamos el cuerpo de una a la tabla
  tblBody.className = "bordeTabla";

  tabla.appendChild(tblBody);
}