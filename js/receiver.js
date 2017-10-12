$(function() {

	var token = localStorage.getItem("token");
	service.receiver(token, function(response) {
		console.log(response);
		var obj = response.data;
		for(var i=0; i<obj.length; i++){
			$(".y-list").append("<div class='y-addressDetail'>" +
			"<a href='change_receiver.html' class='y-addressEdit'></a>" +
			"<h4 class='y-detailTitle'>" +
			"<span>" + obj[i].consignee + "</span>" +
			"<span>" + obj[i].mobile + "</span>" +
			"</h4>" +
			"<p class='y-site'>" + obj[i].address + "</p>" +
			"<span class='default-add'>默认地址</span>" +
			"</div>");
		}
			
	})
	

})