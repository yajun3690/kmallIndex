
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

const defaultState = fromJS({
	list:[{
		  _id: '1',
		  username: 'admin',
		  isAdmin: true,
		  email:'502113690@qq.com',
		  phone:'18838472222',
		  createdAt:'2019-4-18 13:00:50'
	}],
	current:1,
	pageSize:0,
	total:0,
	isFecthing:false
})
export default (state=defaultState,action)=>{
	if(action.type == types.SET_PAGE){
		return state.merge({
			list:fromJS(action.payload.list),
			current:action.payload.current,
			pageSize:action.payload.pageSize,
			total:action.payload.total
		})
	}
	if(action.type == types.PAGE_REQUEST){
		return state.set('isFecthing',true)
	}
	if(action.type == types.PAGE_DONE){
		return state.set('isFecthing',false)
	}
	return state;
}