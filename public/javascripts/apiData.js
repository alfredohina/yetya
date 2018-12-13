let eventsInfo = [];

const getApiData = () => {
  axios.get(/maps/apievents)
    .then(events => {
      console.log(events);
      events.forEach(event => {
        let eventInfo = {
          position: {
            lat: event.location.latitude,
            lng: event.location.longitude
          },
          name: event.title
        };
        eventsInfo.push(eventInfo);
      });
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          let location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          drawMap(location);
        });
      }
    })
    .catch(err => console.log(err));
};

const drawMap = obj => {
  let mapa = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: { obj }
  });

  let userMaker = new google.maps.Maker({
    position: obj,
    title: "Estas aqui"
  });
  userMaker.setMap(mapa);
  let markers = eventsInfo.map(event => {
    return new google.maps.marker({
      position: event.position,
      title: event.name,
      map: mapa
    });
  });
};

getApiData();
