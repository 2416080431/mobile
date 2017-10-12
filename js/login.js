$(function(){
	var login_button = $(".login-red-button")[0];
	
	login_button.addEventListener("touchstart",function(){
		var oUsername = $("#username").val();
		var oPass = $("#password").val();
		service.login(oUsername,oPass,function(response){
			console.log(response);
			if(response.code === 0){
				localStorage.setItem("token",response.data.token);
				localStorage.setItem("username",response.data.username);
				if(localStorage.backurl) location.href=localStorage.backurl;
				else location.href="index.html";
			}else{
				$(".modal-body p").text(response.message);
				$("#myModal").modal("show");
			}
		});
	})
})