var service={
	
	///////////////////登录
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

	
	///////////////////////////注册
	register: function(name,key,callback){
		console.log(name,key);
		$.ajax({
			type:"post",
			url:"http://h6.duchengjiu.top/shop/api_user.php",
			data:{
				"status": "register",
        "username": name,
        "password": key
			},
			contentType:"application/x-www-form-urlencoded",
			success:function(response){
				callback(response);
			}
		});
	},
	
	//////////////////////获取商品分类
	getGoodsType:function(callback){
		$.ajax({
			type:"get",
			url:"http://h6.duchengjiu.top/shop/api_cat.php",
			success:function(response){
				callback(response);
			}
		});
	},
	
	////////////////////获取类型的商品
	listGoodsType:function(callback){
		var cat_id = getQueryString("cat_id");
		$.ajax({
			type:"get",
			url:"http://h6.duchengjiu.top/shop/api_goods.php?cat_id="+cat_id,
			success:function(response){
				callback(response);
			}
		});
	},
	
	////////////////////////////商品详情
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
	},
	
	///////////////////////////获取收货地址
	receiver: function(token,callback){
		$.ajax({
			type:"get",
			url:"http://h6.duchengjiu.top/shop/api_useraddress.php?token="+token,
			contentType:"application/x-www-form-urlencoded",
			success:function(response){
				callback(response);
			}
		});
	},
	
	///////////////////////////添加收货地址
	change_receiver: function(token,yname,ycellphone,ydits,callback){
		$.ajax({
			type:"post",
			url:"http://h6.duchengjiu.top/shop/api_useraddress.php?status=add&token="+token,
			contentType:"application/x-www-form-urlencoded",
			data:{
				"address_name":3,
				"consignee":yname,
				"country":2,
				"province":2,
				"city":3,
				"district":3,
				"address":ydits,
				"zip_code":3,
				"mobile":ycellphone,
				"emall":9,
				"tel":10,
				"bestting":11,
				"sign_building":12
			},
			success:function(response){
				callback(response);
			}
		});
	},
	
	///////////////////////////删除收获地址
	delete_receiver: function(token,address_id,callback){
		$.ajax({
			type:"get",
			url:"http://h6.duchengjiu.top/shop/api_useraddress.php?status=delete&address_id="+address_id+"&token="+token,
			contentType:"application/x-www-form-urlencoded",
			success:function(response){
				callback(response);
			}
		});
	},
	
	/////////////////////////////加入购物车
	to_cart: function(goods_id){
		$.ajax({
			type:"post",
			url:"http://h6.duchengjiu.top/shop/api_cart.php?token="+ localStorage.token,
			data:{"goods_id":goods_id,"number":1},
			contentType:"application/x-www-form-urlencoded",
			success:function(response){
				console.log(response);
		        if (response.code === 0) {
		            if (localStorage.username) {
		            	$("#toCartModal .modal-body p").text("成功添加到购物车");
		            	 $("#toCartModal").modal("show");
		            }else {
		            	location.href = 'login.html';
		            }
		           
		        }
			}
		});
	},
	
	//////////////////////////搜索商品
	search: function(){
		var search_text = getQueryString("search_text");
		console.log(search_text);
		$.ajax({
			type:"get",
			url:"http://h6.duchengjiu.top/shop/api_goods.php?search_text="+search_text,
			data:{"search_text":search_text},
			success:function(response){
				console.log(response);
			
				var data = response.data;
				if (data != '') {
					for (var i=0 ;i<data.length;i++) {
					var oDiv = $("<a class='list-box' href='Details.html?goods_id="+data[i].goods_id+"'></a>")
				oDiv.append("<div class='list-box1'><img src='"+data[i].goods_thumb+"'/></div>");
				oDiv.append("<div class='list-box2'><p>"+data[i].goods_name+"</p>￥<em>"+data[i].price+"</em><br><span>999评价&nbsp;&nbsp;100%好评&nbsp;&nbsp;你还在等什么</span></div>");
				$(".list").append(oDiv);
					}
				}else {
					alert('没有搜索项');
					location.href = 'index.html';
				}
			}
		});
	},
	
	/////////////////////////////////////获取购物车商品
	getCart: function(callback){
		var token = localStorage.token;
		$.ajax({
			type:"get",
			url:"http://h6.duchengjiu.top/shop/api_cart.php?token="+token,
			success: function(response){
				callback(response);
			}
		});
	},
	
	/////////////////////////////////////下订单
	header: function(token,address_id,total_prices,callback){
		$.ajax({
			type:"post",
			url:"http://h6.duchengjiu.top/shop/api_order.php?token="+token+"&status=add&debug=1",
			data:{
        "address_id": address_id,
        "total_prices": total_prices
			},
			contentType:"application/x-www-form-urlencoded",
			success:function(response){
				callback(response);
			}
		});
	},
}




$(function(){
	/////////////////////显示底部导航购物车商品数量
	service.getCart(function(response){
		var obj = response.data;
		if(obj.length == 0){
			$(".cart_count").css("display","none");
		}else{
			$(".cart_count").text(obj.length);
		}
	});
	
	//////////////////////////////阻止未登录就访问购物车和我的
	$(".goToCart").on("touchstart",function(event){
		if(!localStorage.token){
			event.preventDefault();
			location.href="login.html"
		}
	});
	$(".goToMy").on("touchstart",function(event){
		if(!localStorage.token){
			event.preventDefault();
			location.href="login.html"
		}
	})
	
})



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