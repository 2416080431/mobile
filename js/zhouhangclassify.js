$(function() {
	
	service.getGoodsType(function(response) {
		if(response.code === 0) {
			var obj = response.data;
			for(var i=0; i<obj.length; i++){
				$(".wy-content").append("<a href='zhouhanglist.html?cat_id="+obj[i].cat_id+"'><div class='w1'><span>"+obj[i].cat_name+"</span></div></a>");
			}
			$(".wy-content").append("<div class='w2'><img src='img/zhou/9.png'/></div>");
			
		}
	})

})