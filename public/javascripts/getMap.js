const geolocateMe = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
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

const addMarker = (titulo, posicion, map,icon,infowindow) => {
  let marker = new google.maps.Marker({
    position: posicion,
    map,
    title: titulo,
    icon: icon
  });
  marker.addListener("click", function() {
    infowindow.open(map, marker);
  });
   return marker
};

let infowindow;

const loadData = map => {
  events.forEach(event => {
    //console.log(events.name)
    let infowindow = new google.maps.InfoWindow({
      content:
        "<div><strong>" +
        event.name +
        "</strong><br>" +
        "Description: " +
        event.description + "</br>" +
        `<a href="/events/${event._id}" class="btn btn-outline-success"><i class="fas fa-eye"></i> View event</a>`

      ,maxWidth: 400
    });
    addMarker(
      event.name,
      {
        lat: event.location.coordinates[0],
        lng: event.location.coordinates[1]
      },
      map,
       'https://res.cloudinary.com/drlexgkiu/image/upload/v1545159229/yetyamaps.png',
      infowindow
    );
  });
};
