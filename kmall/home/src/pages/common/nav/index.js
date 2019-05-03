
require('./index.css')
var _user = require('service/user')
var _util = require('util')
var nav = {
	init:function(){
		this.bindEvent();
		this.loadUsername();
		return this;
	},
	bindEvent:function(){
		//1.绑定退出事件
		$('#logout').on('click',function(){
			_user.logout(function(result){
				window.location.reload();
			},function(msg){
				_util.showErrorMsg(msg)
			})
		})
	},
	loadUsername:function(){
		_user.getUsername(function(data){
			$('.not-login').hide();
			$('.login')
			.show()
			.find('.username')
			.text(data.username)
		})
	}
}

module.exports = nav.init();