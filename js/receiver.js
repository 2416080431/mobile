$(function(){
	var token = localStorage.getItem("token");
	service.receiver(token, function(response) {
		console.log(response);
		var obj = response.data;
		for(var i=0; i<obj.length; i++){
			$(".y-list").append("<div class='y-addressDetail'>"+
			"<a class='y-addressEdit' data-id='"+obj[i].address_id+"'></a>" +
			"<h4 class='y-detailTitle'>" +
			"<span>" + obj[i].consignee + "</span>&nbsp&nbsp" +
			"<span>" + obj[i].mobile + "</span>" +
			"</h4>" +
			"<p class='y-site'>" + obj[i].address + "</p>" +
			"<span class='default-add'>默认地址</span>" +
			"</div>");
		}
		
		$(".y-addressEdit").on("touchstart",function(){
		var token = localStorage.getItem("token");
		var address_id = this.dataset.id;
		console.log(this);
		service.delete_receiver(token,address_id,function(response){
			location.reload();
		})
	})

	})

	
	
})
