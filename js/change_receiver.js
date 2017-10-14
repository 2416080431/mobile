$(function(){
// 添加收货地址
	$(".y-getAddress").on('touchstart',function(){
		var token = localStorage.getItem("token");
		var yname=$(".y-name").val();
		var ycellphone=$(".y-cellphone").val();
		var ydits = $("#province option:selected").text()+ $("#city option:selected").text()+" "+ $(".y-dits").val();
		console.log(ydits);
		service.change_receiver(token,yname,ycellphone,ydits,function(response){	
			location.href="receiver.html";		
		})
	})
})
	

