$(function(){
		var total_prices = 0;
		service.getCart(function(response){
			console.log(response);
			if(response.code === 0){
				var obj = response.data;
				for (var i = 0;i<obj.length;i++) {
					var oDiv = $("<div class='list-box'></div>");
					oDiv.append("<div class='list-box1'><img src='"+obj[i].goods_thumb+"'/></div>");
					oDiv.append("<div class='list-box2'><p>"+obj[i].goods_name+"</p>￥<em>"+obj[i].goods_price+"</em><br><span>数量x"+obj[i].goods_number+"</span></div>");
					$(".list").append(oDiv);
					total_prices += obj[i].goods_price * obj[i].goods_number;
				}
				$(".money-box em").text(total_prices);
			}
		});
		
		
		
		$("#add-order").on("touchstart",function(){
			var token = localStorage.token;
			var address_id = 20;
			service.header(token,address_id,total_prices,function(response){
				console.log(response);
				if(response.code === 0){
					$("#addOrderModal").modal("show");
				}
			})
		})
		
		
	});

