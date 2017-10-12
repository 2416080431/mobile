var mySwiperH = new Swiper(".swiper-container-horizontal",{
        autoplay:2000,
        loop:true,
        direction:'horizontal',
        autoplayDisableOnInteraction:false,
        pagination:".swiper-pagination",
        paginationClickable:true,
        prevButton:".swiper-button-prev",
        nextButton:".swiper-button-next",
       });
var mySwiperV = new Swiper(".swiper-container-vertical",{
        autoplay:2000,
        loop:true,
        direction:'vertical',
        autoplayDisableOnInteraction:false,
        pagination:".swiper-pagination",
        paginationClickable:true,
        prevButton:".swiper-button-prev",
        nextButton:".swiper-button-next",
       })