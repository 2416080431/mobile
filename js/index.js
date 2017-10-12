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
var mySwiperjingxun = new Swiper(".swiper-jingxuan",{
        direction:'horizontal',
        pagination:".swiper-pagination",
        paginationClickable:false,
        paginationType : 'fraction',
        prevButton:".swiper-pagination-current",
        nextButton:".swiper-pagination-total",
       })

//搜索
var oSearch = document.querySelector("#bar");	
var oBtn = $(".icon_search")[0];
oBtn.addEventListener("touchstart", function(){
	if(oSearch.value != '')
		location.href = 'search.html?search_text=' + oSearch.value;
		
})
