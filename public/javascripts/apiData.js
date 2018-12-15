

const getApiData = () => {
  console.log("aqui llega");

  axios.get("/maps/apievents").then(events => {
    
    // console.log(events.data.location.latitude)
    // console.log(events.data.location.longitude)
    // console.log(events.data.title)

      // events.forEach(events =>
      //   addMarker(
      //     events.data.title,
      //     {
      //       lat: events.data.location.latitude,
      //       lng: events.data.location.longitude
      //     },
      //     map
      //   )
      // )
    
      //addMarker(eventInfo);

      events.data.forEach(e => {
        console.log(e)
        if(e.location)
        addMarker(
              e.title,
              {
                lat: e.location.latitude,
                lng: e.location.longitude
              },
              map
            )
        
      });

      // let eventInfo = {
      //   position: {
      //     lat: events.data.location.latitude,
      //     lng: events.data.location.longitude
      //   },
      //   name: events.data.title
      // }


      //  addMarker(eventInfo.name,eventInfo.position,map)
    
    
    
  })
}

// events.forEach(event => {
//   let eventInfo = {
//     position: {
//       lat: event.location.latitude,
//       lng: event.location.longitude
//     },
//     name: event.title
//   };
//   eventsInfo.push(eventInfo);
// });

getApiData();
