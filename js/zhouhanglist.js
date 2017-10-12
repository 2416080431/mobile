$(function() {
	
	
	service.listGoodsType(function(response) {
		console.log(response);
		if(response.code === 0) {
			var obj = response.data;
			
			for(var i=0; i<obj.length; i++){
				var oDiv = $("<a class='list-box' href='Details.html?goods_id="+obj[i].goods_id+"'></a>")
				oDiv.append("<div class='list-box1'><img src='"+obj[i].goods_thumb+"'/></div>");
				oDiv.append("<div class='list-box2'><p>"+obj[i].goods_name+"</p>￥<em>"+obj[i].price+"</em><br><span>999评价&nbsp;&nbsp;100%好评&nbsp;&nbsp;你还在等什么</span></div>");
				$(".list").append(oDiv);
			}
			
		}
	})

})