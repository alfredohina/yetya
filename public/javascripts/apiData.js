const getApiData = (latitud, longitud) => {

  return axios.post("/maps/apievents",{latitud, longitud}).then(events => {
    document.getElementById("spinnerDiv").style.display="none";
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: {
          lat: 42.4197351,
          lng: -3.7040427
        }
      });
    //console.log(events);
    //console.log('Entra en apidata')
    events.data.forEach(e => {
      //console.log(e);
      if (e.location){
      let infowindow = new google.maps.InfoWindow({
        content:
          "<div><strong>" +
          e.title +
          "</strong><br>",
        maxWidth: 200
      })
      addMarker(
          e.title,
          {
            lat: e.location.latitude,
            lng: e.location.longitude
          },
          map,
          'https://res.cloudinary.com/drlexgkiu/image/upload/v1545468730/madrid.png',
          infowindow
        );}
    });
  });
};

//getApiData();