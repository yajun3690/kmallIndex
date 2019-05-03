require('pages/common/footer')
require('pages/common/logo')
require('./index.css')
var _util = require('util')
$(function(){
	var type = _util.getParamFromUrl('type') || 'default'
	$('.'+type).show()
})