
  const map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 14,
      center: {
        lat: 40.4197351,
        lng: -3.7040427
      }
    }
  );
  
  loadData(map);
  
  
  geolocateMe()
    .then(center => {
      console.log(`Esta entrando aqui`)
      latitud = center.lat;
      longitud = center.lng;
      getApiData(latitud,longitud)

      map.setCenter(center)
    })
    .catch(() => console.log('la puta muerte'))

