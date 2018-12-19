
const map = new google.maps.Map(
  document.getElementById('map'), {
    zoom: 15,
    center: {
      lat: 42.4197351,
      lng: -3.7040427
    }
  }
);

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
  .then(center => {
    //console.log(`esto es Longitud ${center.lng} y esto es lat ${center.lat}`)
    latitud = center.lat;
    longitud = center.lng;
    let infowindow = new google.maps.InfoWindow({
      content: "Holita",
      maxWidth: 400
    });
    addMarker('Tu', center, map, infowindow);
    getApiData(latitud,longitud)
    map.setCenter(center)
  })
  .catch(() => { 
    console.log('Aqui catch geolocateme')
    geolocateMe() 
  })


  


var p1 = new google.maps.LatLng(47.380366, -3.671338); 
var p2 = new google.maps.LatLng(40.383036, -3.674160); 

console.log(calcDistance(p1, p2)); 

//calculates distance between two points in km's 
function calcDistance(p1, p2) { 
    return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)/1000).toFixed(2); 
} 

  
  