let map;
document.addEventListener("DOMContentLoaded", () => {

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
