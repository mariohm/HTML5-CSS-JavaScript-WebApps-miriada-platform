$(function(){
    var map, lat, lng;

    function enlazarMarcador(e)
    {
        // muestra ruta entre marcas anteriores y actuales
        map.drawRoute({
            origin: [lat, lng],  // origen en coordenadas anteriores
            // destino en coordenadas del click o toque actual
            destination: [e.latLng.lat(), e.latLng.lng()],
            travelMode: 'driving',
            strokeColor: '#0099FF',
            strokeOpacity: 0.6,
            strokeWeight: 5
        });

        lat = e.latLng.lat();   // guarda coords para marca siguiente
        lng = e.latLng.lng();

        map.addMarker({ lat: lat, lng: lng});  // pone marcador en mapa
    }

    function geolocalizar()
    {
        GMaps.geolocate({
            success: function(position){
                lat = position.coords.latitude;  // guarda coords en lat y lng
                lng = position.coords.longitude;

                map = new GMaps({  // muestra mapa centrado en coords [lat, lng]
                    el: '#map',
                    lat: lat,
                    lng: lng,
                    click: enlazarMarcador,
                    tap: enlazarMarcador
                });

                map.addMarker({ lat: lat, lng: lng});  // marcador en [lat, lng]

            },
            error: function(error) { alert('Error: '+error.message);},
            not_supported: function(){ alert("No soporta geolocalización");}
        });

    }

    geolocalizar();

});
