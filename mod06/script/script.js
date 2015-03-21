var resp = prompt("Introduce el nombre o referencia de un objeto para ver sus propiedades:");
//Depura un poco la entrada
resp = resp.replace("this.", "");

var obj = window[resp];

if(typeof obj === 'object')
{
    var titulo = document.getElementsByTagName("H2")[0];
    var tabla = document.getElementById("tabla");
    var cab = "<tr><th id=\"cab_izq\">Nombre</th><th id=\"cab_der\">Valor</th></tr>"; //Cabecera
    var i;

    //Cambiamos el título si se trata de un object
    titulo.innerHTML = "Listado de las propiedades del objeto \"" + resp + "\"";
    //Introducimos cabecera de tabla
    tabla.innerHTML = cab;
    //Para cada elemento, mostramos su propiedad y valor
    for(i in obj)
    {
        if(typeof obj[i] === 'object' || typeof obj[i] === 'function')
        {
            tabla.innerHTML += "<tr><td>" + i + "</td><td>" + "no es imprimible" + "</td></tr>";
        }
        else
        {
            tabla.innerHTML += "<tr><td>" + i + "</td><td>" + obj[i] + "</td></tr>";
        }
    }

}
else
{
    var div = document.getElementById("un_div");
    div.innerHTML = "\"" + resp + "\" no es un objeto JavaScript";
}
