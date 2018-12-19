const mapa = new google.maps.Map(
  document.getElementById('mapa'), {
    zoom: 15,
    center: {
      lat: 42.4197351,
      lng: -3.7040427
    }
  }
);


google.maps.event.addListener(mapa, 'click', 
function(event){
  let marker = new google.maps.Marker({
    position: event.latLng,
    map: mapa,
    title: 'Aqui estara nuestro evento!'
  });
  
})

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

geolocateMe()
  .then(center => {
    console.log(`esto es Longitud ${center.lng} y esto es lat ${center.lat}`)  
    mapa.setCenter(center)
  })
  .catch(() => { 
    console.log('Aqui catch geolocateme')
    geolocateMe() 
  })


// google.maps.event.addListener(mapa, 'click', 
// function(event){
//   console.log(`Esta son las coordenadas ${event.latLng}`)
//   let marker = new google.maps.Marker({
//     position:event.latLng ,
//     mapa,
//     title: 'Evento Nuevo, aqui se lia'
//   })
//   return marker
// })

const addMarker = (titulo, posicion, mapa,icon,infowindow) => {
  let marker = new google.maps.Marker({
    position: posicion,
    mapa,
    title: titulo,
  });
  marker.addListener("click", function() {
    infowindow.open(mapa, marker);
  });
   return marker
};



