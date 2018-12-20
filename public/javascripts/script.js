let map;
document.addEventListener("DOMContentLoaded", () => {
  // const map =  'hola' //document.getElementById('map')


   map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: {
      lat: 42.4197351,
      lng: -3.7040427
    }
  });

  //addmaker('A ver si sale', {lat:40.4045385,lng: -3.6988189}, map)

  loadData(map);

  // google.maps.event.addListener(map, 'click',
  // function(event){
  //   //addMarker('Evento Nuevo',event.latLng,map)
  //   console.log(`Esta son las coordenadas ${event.latLng}`)
  //   new google.maps.Marker({
  //     position:event.latLng ,
  //     map,
  //     title: 'Evento Nuevo, aqui se lia'
  //   })
  // })

  geolocateMe()
    .then(c => {
      latitud = c.lat;
      longitud = c.lng;
      let infowindow = new google.maps.InfoWindow({
        content: "Holita",
        maxWidth: 400
      });
      addMarker("Tu", c, map, infowindow);
      getApiData(latitud, longitud);
      map.setCenter(c);
      center = c;
    })
    .catch(() => {
      console.log("Aqui catch geolocateme");
      geolocateMe();
    });


  // calculates distance between two points in km's
//   function calcDistance(p1, p2) {
    

//     return (
//       google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000
//     ).toFixed(2);
//   }
});
