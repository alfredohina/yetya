const geolocateMe = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          reject(
            {
              lat: 40.3820829,
              lng: -3.6738811
            },
            "Error in the geolocation service."
          );
        }
      );
    } else {
      console.log("entra qui");
      let position = {
        lat: 40.3820829,
        lng: -3.6738811
      };
      reject(
        {
          lat: 40.3820829,
          lng: -3.6738811
        },
        "Browser does not support geolocation."
      );
    }
  });
};

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

  

const loadData = map => {
  console.log(events);
  events.forEach(events =>{
    addMarker(
      events.name,
      {
        lat: events.location.coordinates[0],
        lng: events.location.coordinates[1]
      },
      map)
  }
  );
};
