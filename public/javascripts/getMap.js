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

const addmaker = (titulo,posicion,map) =>{
  const marker = new google.maps.Marker({
    position:posicion ,
    map,
    title: titulo
  })
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

let infowindow;

const loadData = map => {
  events.forEach(events => {
    //console.log(events.name)
    addmaker(events.name, {lat: events.location.coordinates[0],lng: events.location.coordinates[1]}, map)
    infowindow = new google.maps.InfoWindow({
      content: ('<div><strong>' + events.name + '</strong><br>' +
      'Description: ' + events.description),
      maxWidth: 200
    });
    console.log(events.name)
    console.log(infowindow)
  });
};

