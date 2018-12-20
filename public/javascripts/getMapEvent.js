const mapa = new google.maps.Map(document.getElementById("mapa"), {
  zoom: 15,
  center: {
    lat: 42.4197351,
    lng: -3.7040427
  }
});


let marker;

google.maps.event.addListener(mapa, "click", function(event) {

  
  if (marker) {marker.setMap(null)}
  marker = new google.maps.Marker({
    position: event.latLng,
    map: mapa,
    title: "Aqui estara nuestro evento!"
  });
  let infowindow = new google.maps.InfoWindow({
    content: "Tu estas Aqui!",
    maxWidth: 400
  });
  marker.addListener("click", function() {
    infowindow.open(mapa, marker);
  });
  document.querySelector("input[name=latitude]").value =  event.latLng.lat();
  document.querySelector("input[name=longitude]").value =  event.latLng.lng();

  console.log(event.latLng.lat())
  
});

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

geolocateMe()
  .then(center => {
    //console.log(`esto es Longitud ${center.lng} y esto es lat ${center.lat}`);
    mapa.setCenter(center);
  })
  .catch(() => {
    console.log("Aqui catch geolocateme");
    geolocateMe();
  });

const addMarker = (titulo, posicion, mapa, icon, infowindow) => {
  let marker = new google.maps.Marker({
    position: posicion,
    mapa,
    title: titulo
  });
  marker.addListener("click", function() {
    infowindow.open(mapa, marker);
  });
  return marker;
};
