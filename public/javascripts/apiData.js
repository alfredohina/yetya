const getApiData = (latitud, longitud) => {
  

  axios.post("/maps/apievents",{latitud, longitud}).then(events => {
    events.data.forEach(e => {
      console.log(e);
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
