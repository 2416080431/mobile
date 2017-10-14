$(function(){
	var token = localStorage.getItem("token");
	service.receiver(token, function(response) {
		console.log(response);
		var obj = response.data;
		for(var i=0; i<obj.length; i++){
			$(".y-list").append("<div class='y-addressDetail'>"+
			"<a class='y-addressEdit receiver_id' data-id='"+obj[i].address_id+"'></a>" +
			"<h4 class='y-detailTitle'>" +
			"<span class='receiver_name'>" + obj[i].consignee + "</span>&nbsp&nbsp" +
			"<span class='receiver_cell'>" + obj[i].mobile + "</span>" +
			"</h4>" +
			"<p class='y-site'>" + obj[i].address + "</p>" +
			"</div>");
		}
		
		////////////////////////////////////删除收货地址
		function deleteAddress(){
			$(".y-addressEdit").on("touchstart",function(){
				var token = localStorage.getItem("token");
				var address_id = this.dataset.id;
				console.log(this);
				service.delete_receiver(token,address_id,function(response){
					location.reload();
				})
			})
		}

	/////////////////////////////////选择下单收货地址
	$(".y-addressDetail").on("touchstart",function(event){
		if(event.target.nodeName == "A"){
			deleteAddress();
		}else{
			var address_id = $(this).children(".receiver_id").data("id");
			var consignee = $(this).children("h4").children(".receiver_name").text();
			var mobile = $(this).children("h4").children(".receiver_cell").text();
			var address = $(this).children(".y-site").text();
			var address = {
				"address_id":address_id,
				"name":consignee,
				"mobile":mobile,
				"address":address
			};
			address = JSON.stringify(address);
			localStorage.address=address;
			location.href = "header.html";
		}
		
	})
	
	})
	
})
