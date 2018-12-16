const map = new google.maps.Map(
  document.getElementById('map'), {
    zoom: 15,
    center: {
      lat: 40.4197351,
      lng: -3.7040427
    }
  }
);

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