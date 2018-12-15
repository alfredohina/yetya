
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
    .then(center => map.setCenter(center))
    .catch(e => console.log(e))

