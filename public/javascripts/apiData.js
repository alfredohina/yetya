const getApiData = (latitud, longitud) => {

  axios.post("/maps/apievents",{latitud, longitud}).then(events => {
    console.log(events);
    console.log('Entra en apidata')
    events.data.forEach(e => {
      //console.log(e);
      if (e.location){
      let infowindow = new google.maps.InfoWindow({
        content:
          "<div><strong>" +
          e.title +
          "</strong><br>" +
          "Description: " +
          e.description,
        maxWidth: 200
      })
      addMarker(
          e.title,
          {
            lat: e.location.latitude,
            lng: e.location.longitude
          },
          map,
          'https://res.cloudinary.com/drlexgkiu/image/upload/v1545160071/logomadrid.png',
          infowindow
        );}
    });
  });
};

//getApiData();