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

	getGoodsType:function(callback){
		$.ajax({
			type:"get",
			url:"http://h6.duchengjiu.top/shop/api_cat.php",
			success:function(response){
				callback(response);
			}
		});
	},
	
	listGoodsType:function(callback){
		var cat_id = getQueryString("cat_id");
		console.log(cat_id);
		$.ajax({
			type:"get",
			url:"http://h6.duchengjiu.top/shop/api_goods.php?cat_id="+cat_id,
			success:function(response){
				callback(response);
			}
		});
	},
	
	Details: function(goods_id){
		$.ajax({
			type:"get",
			url:"http://h6.duchengjiu.top/shop/api_goods.php?goods_id="+goods_id,
			data:{"goods_id": goods_id},
			success:function(responseText){
				var obj = responseText.data;
				$(".big").append("<div class='swiper-container'>"+
						"<div class='swiper-wrapper'>"+
							"<div class='swiper-slide'><img class='img' src='"+obj[0].goods_thumb+"'/></div>"+
						"</div>"+
						"<div class='swiper-pagination'></div>"+
					"</div>"+
					"<div class='Commodity_name'>"+obj[0].goods_name+"</div>"+
					"<div class='Price'><span class='RMB'>￥</span>"+obj[0].price+"</div>"+
					"<div class='Discount'>"+obj[0].goods_desc+"</div>");
					
					
				
			}
		});
	}
}


function getQueryString(name) {
	  var search = location.search.substr(1);
	  //abc=123&a=&ccc=abc
	  //(^|&)   (&|$)
	  //abc=([^&]*)
	  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	  var result = search.match(reg);
	  // if (result === null) return null;
	  // return decodeURIComponent(result[2]);
	  return result === null ? null : decodeURIComponent(result[2]);
	}