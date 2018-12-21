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
          reject("Error in the geolocation service.");
        }
      );
    } else {
      reject("Browser does not support geolocation.");
    }
  });
};

const addMarker = (titulo, posicion, map, icon, infowindow) => {
  let marker = new google.maps.Marker({
    position: posicion,
    map,
    title: titulo,
    icon: icon
  });
  marker.addListener("click", function() {
    infowindow.open(map, marker);
  });
  return marker;
};

let infowindow;

function calcDistance(p1, p2) {
  p1 = new google.maps.LatLng(p1.lat, p1.lng);
  p2 = new google.maps.LatLng(p2[0], p2[1]);
  return (
    google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000
  ).toFixed(2);
}

const loadData = () => {
  geolocateMe()
    .then(c => {
      //const myLoc = new google.maps.LatLng(center.lat, center.lng);
      latitud = c.lat;
      longitud = c.lng;
      getApiData(latitud, longitud).then(e => {
       infowindow = new google.maps.InfoWindow({
          content: "Aqui estas tu!",
          maxWidth: 400
        });
        console.log('Aqui entra')
        addMarker("Tu", c, map);
        map.setCenter(c);
        events.forEach(event => {
          let distance = calcDistance(c, event.location.coordinates);
          console.log(distance);
          if (distance <= 1) {
             infowindow = new google.maps.InfoWindow({
              content:
                "<div><strong>" +
                event.name +
                "</strong><br>" +
                "Description: " +
                event.description +
                "</br>" +
                `<a href="/events/${
                  event._id
                }" class="btn btn-outline-success"><i class="fas fa-eye"></i> View event</a>`,
              maxWidth: 400
            });
            addMarker(
              event.name,
              {
                lat: event.location.coordinates[0],
                lng: event.location.coordinates[1]
              },
              map,
              "https://res.cloudinary.com/drlexgkiu/image/upload/v1545159229/yetyamaps.png",
              infowindow
            );
          }
        });
      });
    })
    .catch(err => console.log(err));
};
