$(function(){
	$(".login-red-button").click(function(){
		var oUsername = $("#username").val();
		var oPass = $("#password").val();
		service.login(oUsername,oPass,function(response){
			if(response.code === 0){
				localStorage.setItem("token",response.data.token);
				localStorage.setItem("username",response.data.username);
				window.location.href="index.html";
			}else{
				
			}
		})
	});
	
	
})