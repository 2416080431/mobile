var service={
	login: function(username,password,callback){
		$.ajax({
			type:"post",
			url:"http://h6.duchengjiu.top/shop/api_user.php",
			data:{
				"status": "login",
        "username": username,
        "password": password
			},
			contentType:"application/x-www-form-urlencoded",
			success:function(response){
				callback(response);
			}
		});
	},
	
	
}
