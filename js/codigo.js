"use strict";
var colores = ["rojo", "amarillo", "verde", "azul", "magenta", "blanco", "naranja", "gris", "salmon", "marron", "morado", "negro"];

//Crea una tabla del tamaño que se indique 
function crearTabla(anchura, altura) {
    var tabla = "";
    tabla += "<tbody>";
    for (let i = 0; i < altura; i++) {
        tabla += "<tr>";
        for (let j = 0; j < anchura; j++) {
            tabla += "<td></td>";
        }
        tabla += "</tr>";
    }
    tabla += "</tbody>";
    return tabla;
}

//Muestra el color seleccionado por el usuario en texto
function mostrarColor(posicion) {
    var color = colores[posicion];
    var doc = document;
    var texto = doc.getElementById("mostrarColor");
    texto.innerHTML = `SELECCIONADO: ${color}`;
}

//Pinta una celda del color seleccionado
function asignarColor(posColor, posCelda) {
    var doc = document;
    var color = colores[posColor];
    var celdas = doc.getElementById("lienzo").getElementsByTagName("td");
    celdas[posCelda].removeAttribute("class");
    celdas[posCelda].classList.add(color);
}

//Elimina el atributo 'onmouseover' de las celdas para que deje de pintar
function quitarColor(posColor) {
    var doc = document;
    var celdas = doc.getElementById("lienzo").getElementsByTagName("td");
    for (let i = 0; i < celdas.length; i++) {
        var celda = celdas[i];
        celda.removeAttribute("onmouseover");
    }
    //Si volviera a hacer click para pintar sin haber elegido un color en la paleta, seguirá pintando con el último color seleccionado
    pintarCeldas(posColor);
}

//Asigna a todas las celdas la propiedad de cambiar de color(eligido por el usuario) al pasar el ratón por ella y de dejar de pintar haciendo click sobre ellas.
function colorear(posColor, posCelda) {
    var doc = document;
    var celdas = doc.getElementById("lienzo").getElementsByTagName("td");
    //Pinta la celda donde hacemos el primer click
    asignarColor(posColor, posCelda);
    for (let i = 0; i < celdas.length; i++) {
        var celda = celdas[i];
        celda.setAttribute("onclick", `quitarColor('${posColor}')`);
        celda.setAttribute("onmouseover", `asignarColor('${posColor}','${i}')`);
    }
}

//Asigna a las celdas el atributo 'onclick' para que al hacer click en una celda empiece a colorear
function pintarCeldas(posColor) {
    mostrarColor(posColor);
    var doc = document;
    var celdas = doc.getElementById("lienzo").getElementsByTagName("td");
    for (let i = 0; i < celdas.length; i++) {
        var celda = celdas[i];
        celda.setAttribute("onclick", `colorear('${posColor}','${i}')`);
    }
}

//Colorea las celdas de la paleta de colores
function rellenarCeldasPaleta() {
    var doc = document;
    var celdas = doc.getElementById("paleta").getElementsByTagName("td");
    for (let i = 0; i < celdas.length; i++) {
        var celda = celdas[i];
        celda.setAttribute("class", `${colores[i]}`);
        celda.setAttribute("onclick", `pintarCeldas('${i}')`);
    }
}

//Elimina el color de todas las celdas pulsando el botón 'borrar'
function borrar() {
    var doc = document;
    var celdas = doc.getElementById("lienzo").getElementsByTagName("td");
    for (let i = 0; i < celdas.length; i++) {
        var celda = celdas[i];
        celda.removeAttribute("class");
    }
}

//Crea la tabla de la paleta de colores
var doc = document;
var tabla1 = doc.createElement("table");
tabla1.setAttribute("id", "paleta");
tabla1.setAttribute("border", 1);
tabla1.innerHTML = crearTabla(colores.length, 1);
doc.getElementById("superior").appendChild(tabla1);
//rellenamos la paleta de colores
rellenarCeldasPaleta();

//Crea el texto que mostrará el color seleccionado por el usuario
var textoColor = doc.createElement("p");
textoColor.setAttribute("id", "mostrarColor");
textoColor.innerHTML = "SELECCIONADO: ";
doc.getElementById("superior").appendChild(textoColor);

//Crea la tabla del lienzo
var tabla2 = doc.createElement("table");
tabla2.setAttribute("id", "lienzo");
tabla2.setAttribute("border", 1);
tabla2.innerHTML = crearTabla(30, 60);

//Asigna al botón de borrar la función de borrar todas las celdas.
var botonBorrar = doc.getElementById("borrar");
doc.getElementById("inferior").insertBefore(tabla2, botonBorrar);
botonBorrar.setAttribute("onclick", `borrar()`);