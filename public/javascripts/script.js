
const map = new google.maps.Map(
  document.getElementById('map'), {
    zoom: 12,
    center: {
      lat: 40.4197351,
      lng: -3.7040427
    }
  }
);


//addmaker('A ver si sale', {lat:40.4045385,lng: -3.6988189}, map)

loadData(map);

google.maps.event.addListener(map, 'click', 
function(event){
  //addMarker('Evento Nuevo',event.latLng,map)
  console.log(`Esta son las coordenadas ${event.latLng}`)
  new google.maps.Marker({
    position:event.latLng ,
    map,
    title: 'Evento Nuevo, aui se lia'
  })
})

geolocateMe()
  .then(center => {
    //console.log(`esto es center ${center.lng}`)
    latitud = center.lat;
    longitud = center.lng;
    getApiData(latitud,longitud)
    map.setCenter(center)
  })
  .catch(position => {
    // console.log(`esto es position lng ${position.lng}`)
    // latitud = position.lat;
    // longitud = position.lng;
})