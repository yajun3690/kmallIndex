
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

const defaultState = fromJS({
	name:'',
	price:'',
	stock:'',
	images:'',
	detail:'',
	categoryId:'',
	description:'',
	parentCategoryId:'',

	categoryIdValidateStatus:'',
	categoryIdHelp:'',
	imagesValidateStatus:'',
	imagesIdHelp:'',
	productValidateStatus:'',
	productIdHelp:'',


	isPageFecthing:false ,
	isSaveFecthing:false ,

	list:[],
	current:1,
	pageSize:0,
	total:2,
	keyword:'',

})
export default (state=defaultState,action)=>{
	if(action.type == types.SET_PAGE){
		return state.merge({
			list:fromJS(action.payload.list),
			current:action.payload.current,
			pageSize:action.payload.pageSize,
			total:action.payload.total,
			keyword:action.payload.keyword || ''				
		})
	}
	if(action.type == types.PAGE_REQUEST){
		return state.set('isPageFecthing',true)
	}
	if(action.type == types.PAGE_DONE){
		return state.set('isPageFecthing',false)
	}
	if(action.type == types.SET_CATEGORY_ID){
		return state.merge({
			parentCategoryId:action.payload.parentCategoryId,
			categoryId:action.payload.categoryId,
			categoryIdValidateStatus:'',
			categoryIdHelp:''
		})
	}
	if(action.type == types.SET_IMAGES){
		return state.merge({
			images:action.payload,
			imagesValidateStatus:'',
			imagesIdHelp:''
		})
	}
	if(action.type == types.SET_DETAIL){
		return state.merge({
			detail:action.payload,
			productValidateStatus:'',
			productIdHelp:''
		})
	}
	if(action.type == types.SET_CATEGORY_ERROR){
		return state.merge({
			categoryIdValidateStatus:'error',
			categoryIdHelp:'请选择商品分类'
		})
	}
	if(action.type == types.SET_IMAGES_ERROR){
		return state.merge({
			imagesValidateStatus:'error',
			imagesIdHelp:'请选择商品图片'
		})
	}
	if(action.type == types.SET_DETAIL_ERROR){
		return state.merge({
			productValidateStatus:'error',
			productIdHelp:'请输入商品描述'
		})
	}
	if(action.type == types.SAVE_REQUEST){
		return state.set('isSaveFecthing',true)
	}
	if(action.type == types.SAVE_DONE){
		return state.set('isSaveFecthing',false)
	}
	if(action.type == types.SET_PRODUCT_DETAIL){
		return state.merge({
			images:action.payload.images,
			detail:action.payload.detail,
			name:action.payload.name,
			price:action.payload.price,
			stock:action.payload.stock,
			description:action.payload.description,
			categoryId:action.payload.category._id,
			parentCategoryId:action.payload.category.pid,
		})
	}	
	return state;
}