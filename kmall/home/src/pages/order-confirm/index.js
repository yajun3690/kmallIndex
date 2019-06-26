require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
var shippingTpl = require('./shipping.tpl')
var productTpl = require('./product.tpl')
var page = {

	init:function(){
		this.$shippingBox=$('.shipping-box');
		this.$productBox=$('.product-box');
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.loadShipping();
		this.loadProductList();
	},

	bindEvent:function(){
		var _this=this					
	},	
	loadShipping:function(){
		var html = _util.render(shippingTpl,{});
		this.$shippingBox.html(html)				
	},	
	loadProductList:function(){
		var html = _util.render(productTpl,{});
		this.$productBox.html(html)							
	}

}
$(function(){
	page.init();
})