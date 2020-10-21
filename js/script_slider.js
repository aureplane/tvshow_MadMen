$(document).ready(function(){

  function showSlide() {
      $('.list-episodes').slick({
        prevArrow: $('.arrows-prev'),
        nextArrow: $('.arrows-next'),
          infinite: false,
          speed: 300,
          slidesToShow: 5,
          slidesToScroll: 4,
          responsive: [
            {
              breakpoint: 1030,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: false,
                // dots: true
              }
            },
            {
              breakpoint: 600,
              settings: "unslick"
            },
            {
              breakpoint: 480,
              settings: "unslick"
            
            }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
}

setTimeout(showSlide, 1000)

});