
import * as types from './actionTypes.js'
import axios from 'axios';
import { message } from 'antd'
import { request,setUserName } from 'util'
import { ADMIN_LOGIN } from 'api'
const getLoginRequestAction = ()=>{
	return {
		type:types.LOGIN_REQUEST
	}
} 
const getLoginDoneAction = ()=>{
	return {
		type:types.LOGIN_DONE
	}
} 
export const getLoginAction = (values)=>{
	return (dispatch)=>{
		//登陆按钮加载，改变state.login.isFectching为true
		//方法为派发action
		//dispatch把action派发到store，store把action转交给reduser
		dispatch(getLoginRequestAction());
        request({
                method:'post',
                url:ADMIN_LOGIN,
                data:values
        })
        .then(result=>{
            if(result.code == 0){//登录成功
            	//存储登陆信息
            	setUserName(result.data.username)
                //跳转到后台首页
                 window.location.href = "/"
            }else if(result.code == 1){
                message.error(result.message)
            }                       
        })
        .catch(err=>{
            console.log(err);
            message.error('网络请求失败,请稍后再试')
        })
        .finally(()=>{
            //2.让登录按钮处于活动状态
            dispatch(getLoginDoneAction())
        })


	}
}


