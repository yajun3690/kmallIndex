require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
var tpl = require('./index.tpl')
var page = {

	init:function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){

	},

	bindEvent:function(){
							
	}

}
$(function(){
	page.init();
})