
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

const defaultState = fromJS({
	isFetching:false
})

export default (state=defaultState,action)=>{
	if(action.type == types.LOGIN_REQUEST){
		//发送登录请求前 把isFetching 改为加载状态并且返回一个新的数据
		//当数据返回为store时,执行 mapStateToProps方法重新映射数据
		//UI组建中的this.props中的数据发生改变，导致UI页面发生改变

		return state.set('isFetching',true)
	}
	if(action.type == types.LOGIN_DONE){
		//发送登录请求前 把isFetching 改为加载状态并且返回一个新的数据
		//当数据返回为store时,执行 mapStateToProps方法重新映射数据
		//UI组建中的this.props中的数据发生改变，导致UI页面发生改变

		return state.set('isFetching',false)
	}
	return state;
}