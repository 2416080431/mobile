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
    fetchGoodsCategory: function(callback){
      // $.get(shop.config.API_PREFIX + 'api_cat.php', callback, 'json');
      $.ajax({
        url: shop.config.API_PREFIX + 'api_cat.php?format=jsonp',
        dataType: 'jsonp',
        jsonpCallback: "getCategory",
        success: callback
      });
    },
    updateCart: function(goods_id, number, callback) {
      var data = {
        "goods_id": goods_id,
        "number": number
      };
      $.post(shop.config.API_PREFIX + 'api_cart.php?token='+shop.base.business.getToken(), data, callback, 'json');
    },
    fetchCart: function(callback){
      $.get(shop.config.API_PREFIX + 'api_cart.php', "token="+shop.base.business.getToken(), callback, 'json');
    }
  }
};


//更新购物车的方法
function updateCartInfo(goods_id, goods_number, callback) {
  shop.api.updateCart(goods_id, goods_number, function(response) {
    //加入购物车了之后把商品ID和对应的数量存储到本地
    shop.base.business.saveGoodsInfoOfCart(goods_id, goods_number);
    callback(response);
  });
};


$(function(){
    		//立即结算按钮
    		$('#checkout').click(function(){
    			location.assign('checkout.html?total='+  $('#payMoneyTxt').text());
    		});
		
			shop.api.fetchCart(function(response){
			    
			    if (response.data.length > 0) {
			      	for (var i = 0; i < response.data.length; i++) {
				        var obj = response.data[i];
				        obj.subtotal = parseInt(obj.goods_price) * parseInt(obj.goods_number);
				        var goods = $('<div class="cart-body-part"></div>');
				        
				        var goodsHead = $('<div class="part-head"></div>');
				        var goodsBody = $('<div class="part-body"></div>');
				        var bodyContent = $('<div class="body-content"></div>');
				        var bodyCheckbox = $('<div class="body-checkbox"></div>');
				        var bodyPic = $('<div class="body-pic"></div>');
				        var bodyDescribe = $('<div class="body-describe"></div>');
				        var bodyDescribeH1 = $('<h1></h1>');
				        var bodyDescribeP = $('<p class="cart_goods_spec">规格：</p>');
				        var bodyDescribeDiv = $('<div class="cart_goods_price"></div>');
				        var bodyDescribeDivPrice = $('<div class="goods_price">¥</div>');
				        var bodyDescribeDivNumber = $('<div class="goods_number"></div>');
				        
			
			        	$('#cart-body').append($(goods));
			        	goods.append($(goodsHead));
			        	goods.append($(goodsBody));
			        	//购物列表头部
			        	goodsHead.append($('<span>江苏蓝之蓝旗舰店</span>'));
			        	goodsHead.append($('<a href="#" class="part-dele" id="Delete" onclick="deleteGoods(this)"></a>'));
			        	//购物列表主体
			        	goodsBody.append($(bodyContent));
			        	bodyContent.append($(bodyCheckbox));
			        	bodyContent.append($(bodyPic));
			        	bodyContent.append($(bodyDescribe));
			        	
			        	bodyCheckbox.append($('<input type="checkbox" class="chkbox">'));
			        	bodyCheckbox.append($('<input type="hidden" class="goods_id" value="'+obj.goods_id+'"/>'));
			        	
			        	bodyPic.append($('<a href=""></a>').append($('<img src="'+ obj.goods_thumb +'" />')));
			        	
			        	bodyDescribe.append($(bodyDescribeH1));
			        	bodyDescribe.append($(bodyDescribeP));
			        	bodyDescribe.append($(bodyDescribeDiv));
			        	bodyDescribeH1.append($('<a href="" class="cart_goods_dec">'+ obj.goods_name +'</a>'));
			        	bodyDescribeP.append($('<span>红色</span>'));
			        	bodyDescribeP.append($("，"));
			        	bodyDescribeP.append($('<span>23</span>'));
			        	bodyDescribeDiv.append($(bodyDescribeDivPrice));
			        	bodyDescribeDivPrice.append($('<span class="num font-15">'+ obj.goods_price +'</span>'));
			        	bodyDescribeDiv.append($(bodyDescribeDivNumber));
			        	bodyDescribeDivNumber.append($('<button class="left-button" id="left-button" onclick="minusGoods(this)">-</button>'));
			        	bodyDescribeDivNumber.append($('<input class="center-text" id="center-text" onblur="setGoods(this)" onkeydown="stepSetGoods(this, event)"/>').val(obj.goods_number));
			        	bodyDescribeDivNumber.append($('<button class="right-button" id="right-button" onclick="plusGoods(this)">+</button>'));
			        	
			      	};
			      	
			      	//购物车底部
			      	var chooseAll = $('<div class="chooseAll"></div>');
			      	$('#cart-foot').append($(chooseAll));
			      	
			      	chooseAll.html("&nbsp;&nbsp;<label for='selectAll'>全选</label>");
			      	chooseAll.append($('<input type="checkbox" id="selectAll" onclick="selectAll(this)" />'));
			      	
			      	var cartTotal = $('<div class="cart-total" id="cart-total">合计：</div>');
			      	$('#cart-foot').append($(cartTotal));
			      	var cartTotalP = $('<p>￥</p>');
			      	cartTotal.append($(cartTotalP));
			      	cartTotalP.append($('<span></span>'));
			      	
			      	$('#cart-foot').append($('<a href="header.html">去结算</a>'));
			      	showSum();
			    }
			}); //ajax方法结束
    	});
		
		$('#Delete').click(function () {
			var inputs = $('.goods input:checked');
			for(var i = 0; i < inputs.length; i++){
				var goods_id = document.getElementsByClassName('goods_id')[0].value;
				var goodsL = inputs[i].parentNode.parentNode;
				goodsL.parentNode.removeChild(goodsL);
				updateCartInfo(goods_id, 0, function () { });
			}
		});
		
		//显示总价
		function showSum() {
		    var goods = document.getElementsByClassName('cart-body-part');
		    var sum = 0;
		    var num = 0;
		    var price = 0;
		    var money = 0;
		    var amount = 0;
		    for (var i = 0; i < goods.length; i++){
		        var goodsS = goods[i];
		        price = parseInt($(goodsS).children("div:last-child").children("div").children('div:last-child').children('div:first').children('div:first').children('span:first').text()) ;
		        num = parseInt($(goodsS).children("div:last-child").children("div").children('div:last-child').children('div:first').children('div:last-child').children("input").val());
		        sum = price * num;
		        if($(goodsS).children("div:last-child").children("div").children('div:first').children("input").is(':checked')){
		            money += sum;
		            amount += num;
		            
		        }
		    }
		    $('#cart-total').children('p:first').children('span:first').text(money);
		}
		
		
		$('#cart-body').click(function (event) {
		    // 全局委托方法
		    // 全选
		    if(event.target.id === 'selectAll'){
		    	var selected = event.target.checked;
		    	// console.log(selected);
		    	var checkboxs = document.getElementsByClassName('chkbox');
		    	// console.log(checkboxs);
		    	for(var i = 0; i < checkboxs.length; i++){
		    		checkboxs[i].checked = selected;
		    	}
		    	showSum();
		    	return;
		    }
		
		    if(event.target.type === 'checkbox'){
		        showSum();
		        checkSelectAll();
		    }
		});
		function selectAll(obj) {
		     $('input[type="checkbox"]').prop('checked', obj.checked);
		    console.log(obj);
		    showSum();
		}
		function checkSelectAll() {
		    var goods_count = $('input:checkbox').filter('[class = "chkbox"]').length;
		    if($('input:checkbox').filter('[class = "chkbox"]').filter(":checked").length !== goods_count) {
		        $('#selectAll').prop('checked', false);
		    } else {
		        $('#selectAll').prop('checked', true);
		    }
		}
		// 删除某件商品
		function deleteGoods(obj) {
	    $("#deleteCatModal").modal("show");
	    $("#deleteCatModal .btn-primary").on("touchstart",function(){
	    	var del = obj.parentNode.nextSibling.querySelector('#left-button');
		    var Shop = obj.parentNode.parentNode.parentNode;
		    updataCart(del, 0);
		    var goods = obj.parentNode.parentNode;
		    Shop.removeChild(goods);
		    $("#deleteCatModal").modal("hide");
	    });
		}
		// 加某件商品
		function plusGoods(obj) {
		    updataCart(obj, '+1')
		}
		// 减某件商品
		function minusGoods(obj) {
		    updataCart(obj, '-1');
		}
		//设置某件商品
		function setGoods(obj) {
		    var num = parseInt($(obj).val());
		    if(num < 1 || isNaN(num)) $(obj).val(1);
		    if(num > 10) $(obj).val(10);
		    updataCart(obj, $(obj).val());
		}
		//键盘事件
		function stepSetGoods(obj, event) {
		    var event = event || window.event;
		    event.preventDefault();
		    if(event.keyCode === 40){
		        minusGoods(obj)
		    } else if(event.keyCode === 38){
		        plusGoods(obj);
		    }
		}
		function updataCart(obj, num) {
		    var Shop = obj.parentNode;
		    var goods_id = Shop.parentNode.parentNode.parentNode.querySelector('input[type=hidden]').value;
		    var goods_number = Shop.getElementsByClassName('center-text')[0];
//		    console.log(goods_number.value);
		    var goods_number_value = parseInt(goods_number.value);
		    var goods_price = document.getElementsByClassName('num font-15')[0];
		    var goods_price_value = parseInt(goods_price.innerText);
		    if(num === '-1' && goods_number_value <= 1){
		        return;
		    }
		    if(num === "+1" && goods_number_value >= 10){
		        return;
		    }
		    if(num === '-1') {
		        goods_number_value--;
		    } else if(num === '+1') {
		        goods_number_value++;
		    } else if(num > 0) {
		        goods_number_value = num;
		    } else {
		        goods_number_value = 0;
		    }
		    goods_number.value = goods_number_value;
		    updateCartInfo(goods_id, goods_number_value, function () {});
		    showSum();
		}