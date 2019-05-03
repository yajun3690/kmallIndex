require('pages/common/nav')
require('pages/common/search')
var _side = require('pages/common/side')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
var _user = require('service/user')
var tpl = require('./index.tpl')
var page = {
	init:function(){
		this.onload();
		this.loadUserInfo();
	},
	onload:function( ){
		_side.render('user-center')

	},
	loadUserInfo:function( ){
		_user.getUserInfo(function(user){
			var html = _util.render(tpl,{
				user:user
			})
			$('.side-content').html(html)
		})

	},

}
$(function(){
	page.init();
})