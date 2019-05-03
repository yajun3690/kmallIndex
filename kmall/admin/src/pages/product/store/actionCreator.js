
import * as types from './actionTypes.js'
import { message } from 'antd'
import { request } from 'util';
import { 
	GET_USERS,
	SAVE_PRODUCT,
	GET_PRODUCTS,
	UPDATE_PRODUCT_ORDER,
	UPDATE_PRODUCT_STATUS,
	GET_PRODUCT_DETAIL,
	SEARCH_PRODUCTS
} from 'api'

export const getSetCategoryIdAction = (pid,id)=>{
	return {
		type:types.SET_CATEGORY_ID,
		payload:{
			parentCategoryId:pid,
			categoryId:id
		}
	}
}
export const getSetImagesAction = (payload)=>{
	return {
		type:types.SET_IMAGES,
		payload
	}
}
export const getSetDetailAction = (payload)=>{
	return {
		type:types.SET_DETAIL,
		payload
	}
}

const setCategoryError=()=>{
	return {
		type:types.SET_CATEGORY_ERROR
	}
}
const setImagesError=()=>{
	return {
		type:types.SET_IMAGES_ERROR
	}
}
const setDetailError=()=>{
	return {
		type:types.SET_DETAIL_ERROR
	}
}
const getSaveRequestAction = ()=>{
	return {
		type:types.SAVE_REQUEST
	}
} 
const getSaveDoneAction = ()=>{
	return {
		type:types.SAVE_DONE
	}
} 
export const getSaveAction = (err,values)=>{
	return (dispath,getState)=>{
		const state = getState().get('product')
		const category = state.get('categoryId')
		const images = state.get('images')
		const detail = state.get('detail')
		let hasError = false;
		if(err){
			hasError = false;
		}
		if(!category){
			dispath(setCategoryError())
			hasError = true;
		}
		if(!images){
			dispath(setImagesError())
			hasError = true;			
		}
		if(!detail){
			dispath(setDetailError())
			hasError = true;			
		}
		if(hasError){
			return
		}
		let method = 'post'
		if(values.id){
			method = 'put'
		}
		dispath(getSaveRequestAction())
		request({
			method:method,
			url:SAVE_PRODUCT,
			data:{
				...values,
				category,
				images,
				detail

			}
		})
		.then(result=>{
			if(result.code==0){
				if(method =='post'){
					message.success('添加商品成功')
				}else{
					message.success('修改商品成功')
				}
				window.location.href='/product'
			}else{
				message.error(result.message)
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
			dispath(getSaveDoneAction())
		})
	}
}




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


export const getPageAction = (page)=>{
	return (dispath)=>{
		dispath(getPageRequestAction())
		request({
			url:GET_PRODUCTS,
			data:{
				page:page,

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


export const getUpdateOrderAction = (id,newOrder)=>{
	return (dispath,getState)=>{
		const state = getState().get('product')
		request({
			method:'put',
			url:UPDATE_PRODUCT_ORDER,
			data:{
				id:id,
				order:newOrder,
				page:state.get('current')
			}
		})
		.then(result=>{
			// console.log(result)
			if(result.code ==0){
				message.success('更新排序成功')
				dispath(setPageAction(result.data))
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
}		
export const getUpdateStatusAction = (id,newStatus)=>{
	return (dispath,getState)=>{
		const state = getState().get('product')
		request({
			method:'put',
			url:UPDATE_PRODUCT_STATUS,
			data:{
				id:id,
				status:newStatus,
				page:state.get('current')
			}
		})
		.then(result=>{
			if(result.code ==0){
				message.success('更新状态成功')
				// console.log(result)
				dispath(setPageAction(result.data))
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
}
const setProductDetailAction = (payload)=>{
	return {
		type:types.SET_PRODUCT_DETAIL,
		payload
	}
}
export const getProductDetailAction = (productId)=>{
	return (dispath,getState)=>{
		request({
			url:GET_PRODUCT_DETAIL,
			data:{
				id:productId,
			}
		})
		.then(result=>{
			if(result.code ==0){
				dispath(setProductDetailAction(result.data))
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
}


export const getSearchAction = (keyword,page)=>{
	return (dispath)=>{
		request({
			url:SEARCH_PRODUCTS,
			data:{
				keyword:keyword,
				page:page,
			}
		})
		.then(result=>{
			if(result.code ==0){
				dispath(setPageAction(result.data))
			}else if(result.code ==1){
				message.error(result.message)
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
}
