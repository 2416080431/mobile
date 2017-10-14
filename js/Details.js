$(function(){
	var goods_id = getQueryString("goods_id");
	service.Details(goods_id);
	
	
	
	var oTo_cart = $(".to_cart")[0];
	
	oTo_cart.addEventListener("touchstart", function(event){
		event = event || window.event;
      var target = event.target || event.srcElement;
      if (target.className === 'to_cart') {
        if (!localStorage.token) {
          $("#toCartModal .modal-body p").text("请先登录再购买");
		      $("#toCartModal").modal("show");
          //把当前商品的详细地址存储到localStorage.backurl
          localStorage.backurl = location.href
          //跳转到登录页
          $(".btn-primary").on("touchstart",function(){
          	location.href = "login.html";
          })
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
	});
	
	$("#toCartModal .btn-primary").on("touchstart",function(){
		$("#toCartModal").modal("hide");
	})
})