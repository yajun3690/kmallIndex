
import * as types from './actionTypes.js'
import { message } from 'antd'
import { request } from 'util';
import { 
	GET_USERS,
	ADD_CATEGORY,
	GET_CATEGORIES,
	UPDATE_CATEGORY_NAME,
	UPDATE_CATEGORY_ORDER,
} from 'api'

const getPageRequestAction = ()=>{
	return {
		type:types.PAGE_REQUEST
	}
} 
const getPageDoneAction = ()=>{
	return {
		type:types.PAGE_DONE
	}
} 
const setPageAction = (payload)=>{
	return {
		type:types.SET_PAGE,
		payload
	}
}
const getAddRequestAction = ()=>{
	return {
		type:types.ADD_REQUEST
	}
} 
const getAddDoneAction = ()=>{
	return {
		type:types.ADD_DONE
	}
} 
const setLevelOneCategoriesAction = (payload)=>{
	return {
		type:types.SET_LEVEL_ONE_CATEGORIES,
		payload
	}
} 

export const getPageAction = (pid,page)=>{
	return (dispath)=>{
		dispath(getPageRequestAction())
		request({
			url:GET_CATEGORIES,
			data:{
				page:page,
				pid:pid
			}
		})
		.then(result=>{
			if(result.code ==0){
				dispath(setPageAction(result.data))
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
			dispath(getPageDoneAction())
		})
	}
}

export const getAddAction = (values)=>{
	return (dispath)=>{
		dispath(getAddRequestAction())
		request({
			method:'post',
			url:ADD_CATEGORY,
			data:values
		})
		.then(result=>{
			console.log(result)
			if(result.code ==0){
				if(result.data){
					console.log(result)
					dispath(setLevelOneCategoriesAction(result.data))
				}
				message.success('添加分类成功')
			}else if(result.code ==1)(
				message.error(result.message)
				)
		})
		.catch(err=>{
			console.log(err)
			message.error('添加分类失败')
		})
		.finally(()=>{
			dispath(getAddDoneAction())
		})
	}
}
export const getLevelOneCategoriesAction = (values)=>{
	return (dispath)=>{
		request({
			url:GET_CATEGORIES,
			data:{
				pid:0
			}
		})
		.then(result=>{
				dispath(setLevelOneCategoriesAction(result.data))
		})
		.catch(err=>{
			console.log(err)
		})
	}
}
export const getUpdateOrderAction = (pid,id,newOrder)=>{
	return (dispath,getState)=>{
		const state = getState().get('category')
		request({
			method:'put',
			url:UPDATE_CATEGORY_ORDER,
			data:{
				pid:pid,
				id:id,
				order:newOrder,
				page:state.get('current')
			}
		})
		.then(result=>{
			if(result.code ==0){
				message.success('更新排序成功')
				dispath(setPageAction(result.data))
				// dispath(setLevelOneCategoriesAction(result.data))
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
}
export const getShowUpdateNameModalAction = (updateId,updateName)=>{
	return {
		type:types.SHOW_UPDATE_NAME_MODAL,
		payload:{
			updateId,
			updateName
		}
	}
}
export const getCloseUpdateNameModalAction = ()=>{
	return {
		type:types.CLOSE_UPDATE_NAME_MODAL
	}
}
export const getUpdateNameChangeAction = (payload)=>{
	return {
		type:types.UPDATE_NAME_CHANGE,
		payload
	}
}
export const getUpdateNameAction = (pid)=>{
	return (dispath,getState)=>{
		const state = getState().get('category')
		request({
			method:'put',
			url:UPDATE_CATEGORY_NAME,
			data:{
				pid:pid,
				id:state.get('updateId'),
				name:state.get('updateName'),
				page:state.get('current')
			}
		})
		.then(result=>{
			if(result.code ==0){
				message.success('修改名称成功')
				dispath(getCloseUpdateNameModalAction())
				dispath(setPageAction(result.data))
				// dispath(setLevelOneCategoriesAction(result.data))
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
}