require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('util/pagination')
require('./index.css')
var _util = require('util')
var _product = require('service/product')
var _cart = require('service/cart')
var _nav = require('pages/common/nav')
var tpl = require('./index.tpl')
var page = {

	init:function(){
		this.$elem = $('.cart-box');
		this.totalCartPrice = 0;
		this.loadCart();
		this.bindEvent();
	},
	loadCart:function(){
		var _this=this
		_cart.getCart(function(cart){
			_this.renderCart(cart);
		},function(){
			_this.$elem.html('<p class="empty-msg">加载购物车失败</p>')
		})
		var html = _util.render(tpl,{});
		this.$elem.html(html)
	},
	renderCart:function(cart){
		_nav.loadCartCount();
			if(cart.cartList.length>0){
				//缓存最新的总价格，用于跳转页面
				this.totalCartPrice = cart.totalCartPrice
				//处理图片
				cart.cartList.forEach(function(item){
					item.product.mainImg = item.product.images.split(',')[0]
				})
				var html = _util.render(tpl,cart);
				this.$elem.html(html)
			}else{
				this.$elem.html('<p class="empty-msg">购物车空空如也</p>')
			}		
	},
	bindEvent:function(){
		var _this = this; 
		//1,单条商品选中或取消，事件代理
		this.$elem.on('click','.select-one',function(){
			var $this = $(this)
			var productId = $this.parents('.product-item').data('product-id')
			//选中
			if($this.is(':checked')){
				_cart.selectOne({productId:productId},function(cart){
					_this.renderCart(cart);
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}else{
				_cart.unselectOne({productId:productId},function(cart){
					_this.renderCart(cart);
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}
		})
		//2.全选/全不选
		this.$elem.on('click','.select-all',function(){
			var $this = $(this)
			if($this.is(':checked')){
				_cart.selectAll(function(cart){
					_this.renderCart(cart);
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}else{
				_cart.unselectAll(function(cart){
					_this.renderCart(cart);
				},function(msg){
					_util.showErrorMsg(msg)
				})
			}
		})	
		//3.删除一条
		this.$elem.on('click','.delete-one',function(){
			if(_util.confirm('您确定是否删除此条购物车记录？')){
				var $this = $(this)
				var productId = $this.parents('.product-item').data('product-id')
				_cart.deleteOne({productId:productId},function(cart){
					_this.renderCart(cart)
				},function(msg){
					_util.showErrorMsg(msg)
				})
				
			}
		})	
		//4.删除选中购物车记录
		this.$elem.on('click','.delete-selected',function(){
			if(_util.confirm('您确定是否删除选中的购物车记录？')){
				var $this = $(this)
				_cart.deleteSelected(function(cart){
					_this.renderCart(cart)
				},function(msg){
					_util.showErrorMsg(msg)
				})
				
			}
		})
		//5.更新数量
		this.$elem.on('click','.count-btn',function(){
			var $this =$(this);
			var productId = $this.parents('.product-item').data('product-id')
			var $input = $this.siblings('.count-input');
			var stock = $input.data('stock');
			var current = parseInt($input.val());
			var newCount = 0;
			if($(this).hasClass('plus')){
			//增加数量
				if(current == stock){
					_util.showErrorMsg('商品数量已经超出库存了');
					return;
				}
				newCount = current + 1;
			}else if($(this).hasClass('minus')){
			//减少数量
				if(current ==1){
					_util.showErrorMsg('商品数量最少为1');
					return;
				}
				newCount = current - 1;
			}
			_cart.updateCount({productId:productId,count:newCount},function(cart){
				_this.renderCart(cart);
			},function(msg){
				_util.showErrorMsg(msg)
			})
		})	
		//6.去结算
		this.$elem.on('click','.btn-submit',function(){
			if(_this.totalCartPrice>0){
				window.location.href = './order-confirm.html'
				
			}else{
				_util.showErrorMsg('请选择商品后再提交');
			}
		})								
	}

}
$(function(){
	page.init();
})