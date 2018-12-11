function startMap() {
  const ironhackMDR = {
  	lat: 40.3925362,
    lng: -3.6982669
  };
  const map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 15,
      center: ironhackMDR
    }
  );

  const myMarker = new google.maps.Marker({
    position: {
      lat: 40.3925362,
      lng: -3.6982669
    },
    map: map,
    title: "I'm Ironhack Madrid!"
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(user_location);

      // Add a marker for your user location
      const ironhackMDR = new google.maps.Marker({
        position: {
          lat: user_location.lat,
          lng: user_location.lng
        },
        map: map,
        title: "You are here"
      });

    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }


}

startMap();


