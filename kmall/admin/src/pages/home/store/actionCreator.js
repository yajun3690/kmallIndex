
import * as types from './actionTypes.js'
import { request } from 'util';
import { ADMIN_COUNT} from 'api'


const setCountAction = (payload)=>{
	return {
		type:types.SET_COUNT,
		payload
	}
}

export const getCountAction = ()=>{
	return (dispath)=>{
		request({
			url:ADMIN_COUNT
		})
		.then(result=>{
			if(result.code == 0){
				const action = setCountAction(result.data)
				dispath(action)
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
}


