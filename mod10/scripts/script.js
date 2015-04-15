$(function(){
    var map, lat, lng;
    // Dos variables para que, por cada 5 rutas, cada una sea de distinto color
    var colors = ["#0099FF", "#00FF00", "#FFFF00", "#FF0000", "#00FFCC"];
    var click = 0;
    localStorage.locations = (localStorage.locations || '[]'); // Variable del navegador

    var locations = JSON.parse(localStorage.locations); //Pasamos a array común

    $('#boton').click(function(e){
        locations = JSON.parse(localStorage.locations); //Pasamos a array común

        //geolocalizar(); No llamo a esto para no volver a pedir confirmación de permisos
        map = new GMaps({  // muestra mapa centrado en coords [lat, lng]
            el: '#map',
            lat: locations[0][0],
            lng: locations[0][1],
            zoom: 15,
            click: enlazarMarcador,
            tap: enlazarMarcador
        });

        map.addMarker({ lat: locations[0][0], lng: locations[0][1]});  // marcador en [lat, lng]

        locations = [locations[0]];
        localStorage.locations = JSON.stringify(locations);

        click = 0;

    });

    function recordarRuta()
    {
        if(locations.length > 1)
        {
            alert("locations tiene cosas");
            var i = 0;
            click = 0;

            map = new GMaps({  // muestra mapa centrado en coords [lat, lng]
                el: '#map',
                lat: locations[i][0],
                lng: locations[i][1],
                zoom: 15,
                click: enlazarMarcador,
                tap: enlazarMarcador
            });
            map.addMarker({ lat: locations[i][0], lng: locations[i][1]});  // pone marcador en mapa

            for(i = 0; i < locations.length - 1; i++)
            {
                map.drawRoute({
                    origin: [locations[i][0], locations[i][1]],  // origen en coordenadas anteriores
                    // destino en coordenadas del click o toque actual
                    destination: [locations[i + 1][0], locations[i + 1][1]],
                    travelMode: 'driving',
                    strokeColor: colors[click],
                    strokeOpacity: 0.6,
                    strokeWeight: 5
                });

                lat = locations[i + 1][0];   // guarda coords para marca siguiente
                lng = locations[i + 1][1];

                map.addMarker({ lat: lat, lng: lng});  // pone marcador en mapa
                click++;
                // Reset a contador
                if(click > 4)
                {
                    click = 0;
                }
            }

            return true;
        }

        return false;
    }

    function enlazarMarcador(e)
    {
        var ultimaPos = locations.length - 1;
        // muestra ruta entre marcas anteriores y actuales
        map.drawRoute({
            origin: [locations[ultimaPos][0], locations[ultimaPos][1]],  // origen en coordenadas anteriores
            // destino en coordenadas del click o toque actual
            destination: [e.latLng.lat(), e.latLng.lng()],
            travelMode: 'driving',
            strokeColor: colors[click],
            strokeOpacity: 0.6,
            strokeWeight: 5
        });

        lat = e.latLng.lat();   // guarda coords para marca siguiente
        lng = e.latLng.lng();

        locations.push([lat, lng]);
        localStorage.locations = JSON.stringify(locations); //Pasamos a JSON

        map.addMarker({ lat: lat, lng: lng});  // pone marcador en mapa
        click++;
        // Reset a contador
        if(click > 4)
        {
            click = 0;
        }
    }

    function geolocalizar()
    {
        if(!recordarRuta())
        {
            GMaps.geolocate({
                success: function(position){
                    lat = position.coords.latitude;  // guarda coords en lat y lng
                    lng = position.coords.longitude;

                    locations.push([lat, lng]);
                    localStorage.locations = JSON.stringify(locations); //Pasamos a JSON

                    map = new GMaps({  // muestra mapa centrado en coords [lat, lng]
                        el: '#map',
                        lat: lat,
                        lng: lng,
                        zoom: 15,
                        click: enlazarMarcador,
                        tap: enlazarMarcador
                    });

                    map.addMarker({ lat: lat, lng: lng});  // marcador en [lat, lng]


                },
                error: function(error) { alert('Error: '+error.message);},
                not_supported: function(){ alert("No soporta geolocalización");}
            });

        }

    }


    geolocalizar();
});
