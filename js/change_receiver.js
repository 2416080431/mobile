$(function(){
// 添加收货地址
	$(".y-getAddress").on('touchstart',function(){
		var token = localStorage.getItem("token");
		var yname=$(".y-name").val();
		var ycellphone=$(".y-cellphone").val();
		var ydits=$(".y-dits").val();
		service.change_receiver(token,yname,ycellphone,ydits,function(response){	
			location.href="receiver.html";		
		})
	})
})
	

