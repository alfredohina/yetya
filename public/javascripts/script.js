// document.addEventListener('DOMContentLoaded', () => {


  const map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 15,
      center: {
        lat: 40.4197351,
        lng: -3.7040427
      }
    }
  );
  
  loadData(map);
  
  geolocateMe()
    .then(center => map.setCenter(center))
    .catch(e => console.log(e))

// }, false);



// function startMap() {
//   const ironhackMDR = {
//     lat: 40.3925362,
//     lng: -3.6982669
//   };
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 15,
//     center: ironhackMDR
//   });

//   const myMarker = new google.maps.Marker({
//     position: {
//       lat: 40.3925362,
//       lng: -3.6982669
//     },
//     draggable: true,
//     animation: google.maps.Animation.DROP,
//     map: map,
//     title: "I'm Ironhack Madrid!"
//   });

//   marker.addListener("click", toggleBounce);

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       function(position) {
//         const user_location = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         };

//         map.setCenter(user_location);
//         loadData(map);

//         // Add a marker for your user location
//         const ironhackMDR = new google.maps.Marker({
//           position: {
//             lat: user_location.lat,
//             lng: user_location.lng
//           },
//           map: map,
//           title: "You are here"
//         });
//       },
//       function() {
//         console.log("Error in the geolocation service.");
//       }
//     );
//   } else {
//     console.log("Browser does not support geolocation.");
//   }
// }



// function toggleBounce() {
//   if (marker.getAnimation() !== null) {
//     marker.setAnimation(null);
//   } else {
//     marker.setAnimation(google.maps.Animation.BOUNCE);
//   }
// }
