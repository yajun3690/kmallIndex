require('pages/common/nav')
require('pages/common/search')
var _side = require('pages/common/side')
require('pages/common/footer')
require('util/pagination')
require('./index.css')
var _util = require('util')
var _order = require('service/order')
var tpl = require('./index.tpl')
var page = {
	params:{
		page:_util.getParamFromUrl('page') || 1,
	},
	init:function(){
		this.$elem = $('.order-box');
		this.initPagination();
		this.onload();
		this.loadOrderList();
	},
	onload:function( ){
		_side.render('order-list')

	},
	initPagination:function(){
		var _this = this;
		this.$pagination = $('.pagination-box');
		this.$pagination.on('page-change',function(ev,value){
			_this.params.page = value;
			_this.loadOrderList();
		})
		this.$pagination .pagination();	
	},
	loadOrderList:function(){
		var _this = this
		_order.getOrderList(this.params,function(result){
			if(result.list.length>0){
				result.list.forEach(function(order){
					order.productList.forEach(function(product){
						product.image = product.images.split(',')[0]
					})
					order.createdTime = new Date(order.createdAt).toLocaleString()
				})
				var html = _util.render(tpl,{
					list:result.list
				})
				_this.$elem.html(html)
				//调用分页组件
				_this.$pagination.pagination('render',{
					current:result.current,
					total:result.total,
					pageSize:result.pageSize
				});
				
			}else{
				_this.$elem.html('<p class="empty-msg">您还没有订单记录</p>')
			}
		},function(msg){
			_util.showErrorMsg(msg)
		})

	},

}
$(function(){
	page.init();
})