$(function(){
	var login_button = $(".login-red-button")[0];
	
	login_button.addEventListener("touchstart",function(){
		var oUsername = $("#username").val();
		var oPass = $("#password").val();
		service.login(oUsername,oPass,function(response){
			if(response.code === 0){
				localStorage.setItem("token",response.data.token);
				localStorage.setItem("username",response.data.username);
				
//				service.receiver(response.data.token,function(response){
//					if(response.code === 0){
//						var obj = response.data[0];
//						
//						var address = {
//							"address_id":obj.address_id,
//							"name":obj.consignee,
//							"mobile":obj.mobile,
//							"address":obj.address
//						}
//						address = JSON.stringify(address);
//						localStorage.address=address
//						console.log(localStorage.address);
//					}
//					
//				});
				
				if(localStorage.backurl) location.href=localStorage.backurl;
				else location.href="index.html";
			}else{
				$(".modal-body p").text(response.message);
				$("#myModal").modal("show");
			}
		});
	})
})