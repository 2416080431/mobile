$(function(){
	$("#koukou").on("touchstart",function(){
		var oName = $("#name").val();
		var oKey = $("#key").val();
		var confirm = $("#confirm").val();
		if(oKey != confirm){
			$(".modal-body p").text("两次密码不相同");
			$("#registerModal").modal("show");
		}else{
			service.register(oName,oKey,function(response){
				console.log(response);
				if(response.code === 0){
					window.location.href="login.html";
				}else{
					$(".modal-body p").text(response.message);
					$("#registerModal").modal("show");
				}
			})
		}
		
	});
	
	
})