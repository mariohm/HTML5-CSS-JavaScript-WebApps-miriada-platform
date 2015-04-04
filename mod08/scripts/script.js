$(function(){
    var t, cl = $("#crono");
    localStorage.c = (localStorage.c || "0.0"); //variable del navegador
    localStorage.tiempos = (localStorage.tiempos || '[]'); //variable del navegador

    var tiempos = JSON.parse(localStorage.tiempos); //Pasamos a array común

    //Vamos incluyendo en la lista los instantes de tiempo
    function actualizarLista()
    {
        var crono = $('#crono').html();
        tiempos.push(crono);
        localStorage.tiempos = JSON.stringify(tiempos); //Pasamos a JSON
        mostrarTiempos(tiempos);
    }

    //Repintamos el div con la lista de los instantes de tiempo
    function mostrarTiempos(tiempos)
    {
        var i, instantes = "";
        for(i = 0; i < tiempos.length; i++)
        {
            instantes += "<p>Parada en el instante " + tiempos[i] + "</p>";
        }
        $('#instantes').html(instantes);
    }

    function incr()	    { localStorage.c = +localStorage.c + 0.1;}
    function mostrar()  { cl.html((+localStorage.c).toFixed(1)); }
    function arrancar()
    {
        $('#cambiar').attr('src', 'images/start.png');
        t=setInterval(function(){incr(); mostrar()}, 100);
    }
    function parar()
    {
        $('#cambiar').attr('src', 'images/pause.png');
        clearInterval(t);
        actualizarLista();
        t=undefined;
    }
    function cambiar()  { if (!t) arrancar(); else parar(); }

    if(typeof window.ontouchstart !== 'undefined')
    {
        //Evento táctil en todo el body
        $("#todo").on('tap', cambiar);
        $("#todo").on('swipe', function(){
            if(t === undefined)
            {
                $('#cambiar').attr('src', 'images/start.png');
                localStorage.c = "0.0";
                localStorage.tiempos = '[]';
                tiempos = JSON.parse(localStorage.tiempos);
                mostrarTiempos(tiempos);
                mostrar();
            }
        });

        $("#cambiar").attr("style", "display: none;");
        $("#inicializar").attr("style", "display: none;");

    }
    else
    {
        $("#cambiar").on('click', cambiar);
        $("#inicializar").on('click', function(){
            if(t === undefined)
            {
                $('#cambiar').attr('src', 'images/start.png');
                localStorage.c = "0.0";
                localStorage.tiempos = '[]';
                tiempos = JSON.parse(localStorage.tiempos);
                mostrarTiempos(tiempos);
                mostrar();
            }
        });
    }

    mostrar();
    mostrarTiempos(tiempos);

});
