
const map = new google.maps.Map(
  document.getElementById('map'), {
    zoom: 12,
    center: {
      lat: 40.4197351,
      lng: -3.7040427
    }
  }
);


const addmaker = (titulo,posicion,map)=>{
  const marker = new google.maps.Marker({
    position:posicion ,
    map,
    title: titulo
  })
  marker.addListener('click', function() {
    console.log('entra aqui')
    infowindow.open(map, marker);
  });
}


addmaker('A ver si sale', {lat:40.4045385,lng: -3.6988189}, map)


var infowindow = new google.maps.InfoWindow({
  content: 'Holi'
});


loadData(map);


geolocateMe()
  .then(center => {
    console.log(`esto es center ${center.lng}`)
    latitud = center.lat;
    longitud = center.lng;
    getApiData(latitud,longitud)
    map.setCenter(center)
  })
  .catch(position => {
    console.log(`esto es position lng ${position.lng}`)
    latitud = position.lat;
    longitud = position.lng;
})