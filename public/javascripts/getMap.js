
const geolocateMe = () => {
  return new Promise( (resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }); 
      }, () => reject('Error in the geolocation service.'));
    } else {
      reject('Browser does not support geolocation.');
    }
  })
}


const addMarker = (title, position, map) => {
  return new google.maps.Marker({
    position,
    map,
    title
  });
}


const loadData = map => {
  console.log(events);
  events.forEach(events =>
    addMarker(
      events.name,
      {
        lat: events.location.coordinates[0],
        lng: events.location.coordinates[1]
      },
      map
    )
  );
};

