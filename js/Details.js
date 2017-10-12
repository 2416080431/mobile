$(function(){
	var goods_id = getQueryString("goods_id");
	service.Details(goods_id);
	
	
	
	var oTo_cart = $(".to_cart")[0];
	
	oTo_cart.addEventListener("touchstart", function(event){
		event = event || window.event;
      var target = event.target || event.srcElement;
      if (target.className === 'to_cart') {
        if (!localStorage.token) {
          alert('请先登录再购买');
          //把当前商品的详细地址存储到localStorage.backurl
          localStorage.backurl = location.href
          //跳转到登录页
          location.href = "login.html";
          return;
        }else{
        	service.to_cart(goods_id);
        }
      }
	})
	
})


$(function(){
	var oShopping_cart = $(".Shopping_cart")[0];
	
	oShopping_cart.addEventListener("touchstart", function(){
		if(localStorage.username) {
			location.href = "cart.html";
		} else {
			location.href = "login.html";
		}
	})
})