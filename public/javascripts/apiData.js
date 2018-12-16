const getApiData = (latitud, longitud) => {


  axios.post("/maps/apievents",{latitud = 40.23232323, longitud = -3.21333223}).then(events => {
    events.data.forEach(e => {
      console.log('entra aqui');
      if (e.location)
        addMarker(
          e.title,
          {
            lat: e.location.latitude,
            lng: e.location.longitude
          },
          map
        );
    });
  });
};

getApiData();
