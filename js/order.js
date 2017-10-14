$.getQueryString = function(name) {
  var search = location.search.substr(1);
  var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
  var r = search.match(reg);
  if (r === null) return null;
  return decodeURI(r[2]);
};
$.compile = function(templateStr, dictionObj) {
  return templateStr.replace(/\{([a-zA-Z0-9_]+)\}/g, function(match, $1) {
    return dictionObj[$1];
  });
};
//判断当前用户已登录则显示用户名，否则显示登录注册
if (localStorage.getItem('token')) {
  $('.header').html(localStorage.getItem('username')+'<span id="logout">退出</span>');
  $('#logout').click(function(){
    localStorage.clear();
    location.reload();
  });
}
//获取一个商品的DOM元素
function fetchGoodsDom(obj) {
  var oLi = document.createElement('li');
  var oA = document.createElement('a');
  oA.href = 'detail.html?goods_id=' + obj.goods_id;
  oLi.appendChild(oA);
  var oImage = document.createElement('img');
  oImage.src = obj.goods_thumb;
  var oP = document.createElement('p');
  oP.innerText = obj.goods_name;
  var oEm = document.createElement('em');
  oEm.innerText = "售价：" + obj.price;
  oA.appendChild(oImage);
  oA.appendChild(oP);
  oA.appendChild(oEm);
  return oLi;
}

//fetch 获取  goods 商品 category分类 detail详情 config配置
window.shop = {
  config: {
    API_PREFIX: "http://h6.duchengjiu.top/shop/",
    PAGESIZE: 10,
    USER_TOKEN: 'token',
    CART_PREFIX: 'cart_',//在本地存储商品ID和对应数量的时候使用
  },
  base: {
    storage: {
      "setItem": function(k, v) {
        return localStorage.setItem(k, v);
      },
      "getItem": function(k) {
        return localStorage.getItem(k);
      }
    },
    business: {
      "getToken": function() {
        return shop.base.storage.getItem(shop.config.USER_TOKEN);
      },
      "saveGoodsInfoOfCart": function(goods_id, number) {
        return shop.base.storage.setItem(shop.config.CART_PREFIX + goods_id, number);
      }
    }
  },
  api: {
    fetchOrder: function(callback){//获取当前用户的订单列表
      $.get(shop.config.API_PREFIX + 'api_order.php', "token="+shop.base.business.getToken(), callback, 'json');
    },
    addOrder: function(address_id, total_prices, callback){
      var data = {
        "address_id": address_id,
        "total_prices": total_prices
      };
      $.post(shop.config.API_PREFIX + 'api_order.php?token='+shop.base.business.getToken()+'&status=add', data, callback, 'json');
    },
    cancelOrder: function(){

    }
  }
};

var oOrder = document.querySelector('#order');
        shop.api.fetchOrder(function(response){
          var html = '';
          for (var i = 0; i < response.data.length; i++){
            var obj = response.data[i];//订单信息
            var allNumber = 0;
            var sumTotal = 0;
            html += '<li>';
            html += '<div class="order-each-head"><div>单号：<span>'+obj.order_id+'</span></div><span>交易成功</span></div>';
            for (var j = 0; j < obj.goods_list.length; j++){
              var goods = obj.goods_list[j];//商品列表
              allNumber += parseInt(goods.goods_number);
              goods.subtotal = goods.goods_price * goods.goods_number;
							sumTotal += goods.subtotal;
              html += '<div class="order-goods">'
              			+'<div class="order-each-content">'
							+'<div class="order-goods-pic">'
								+'<a href="">'
									+'<img src="'+goods.goods_thumb+'" />'
								+'</a>'
							+'</div>'
							+'<div class="order-goods-describe">'
								+'<h1>'
									+'<a href="" class="order_goods_dec">'+goods.goods_name+'</a>'
								+'</h1>'
								+'<p class="order_goods_spec">'
									+'规格：'
									+'<span>红色</span>'
									+'，'
									+'<span>23</span>'
								+'</p>'
								+'<div class="order_goods_price">'
									+'<div class="order_each_price">'
										+'¥'
										+'<em class="num font-15">'+goods.goods_price+'</em>'
									+'</div>'
									+'<div class="order_goods_number">'
										+'数量x'
										+'<span>'+goods.goods_number+'</span>'
									+'</div>'
								+'</div>'
							+'</div>'
						+'</div>'
            }
            html += '</div>';
            html += '<div class="order-each-total">'
						+'<p>'
							+'(含运费￥0.00)'
						+'</p>'
						+'<p class="price-red">'
							+'总金额：￥'
							+'<span>'+sumTotal+'</span>'
						+'</p>'
						+'<p>'
							+'共'
							+'<span>'+allNumber+'</span>'
							+'件商品，'
						+'</p>'
					+'</div>'
					+'<div class="order-each-operation">'
						+'<button>评价</button>'
						+'<button data-id="'+obj.order_id+'" class="cancel-order">再来一单</button>'
					+'</div>'
				 	+'</li>'
          }
          $('#order').html(html);
        });
        
        oOrder.onclick = function(event) {
			event = event || window.event;
			var target = event.target || event.srcElement;
			if (target.className === 'cancel-order') {
				if (!confirm('确认要取消订单吗?')) {
					return;
				}
				var order_id = target.dataset.id;
				myajax.post('http://h6.duchengjiu.top/shop/api_order.php?token='+localStorage.token+'&status=cancel', {order_id}, function(err, responseText) {
					var json = JSON.parse(responseText);
					if (json.code === 0) {
						alert('订单取消成功');
					}
				});
			}
		}



