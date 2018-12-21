let map;
document.addEventListener("DOMContentLoaded", () => {
  // const map =  'hola' //document.getElementById('map')




  //addmaker('A ver si sale', {lat:40.4045385,lng: -3.6988189}, map)

  

  // google.maps.event.addListener(map, 'click',
  // function(event){
  //   //addMarker('Evento Nuevo',event.latLng,map)
  //   console.log(`Esta son las coordenadas ${event.latLng}`)
  //   new google.maps.Marker({
  //     position:event.latLng ,
  //     map,
  //     title: 'Evento Nuevo, aqui se lia'
  //   })
  // })

  loadData()

  // calculates distance between two points in km's
//   function calcDistance(p1, p2) {
    

//     return (
//       google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000
//     ).toFixed(2);
//   }

$('.carousel.carousel-multi-item.v-2 .carousel-item').each(function(){
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));

  for (var i=0;i<1;i++) {
    next=next.next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
  }
});


});
