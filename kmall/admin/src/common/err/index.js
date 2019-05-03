import React,{ Component } from 'react'
import { Link } from "react-router-dom"
import { Alert } from 'antd';

import './index.css'

class Err extends Component{
    render(){
        return (
        	<div className="Err">
			    <Alert
			      message="服务器寻找不到此页面!"
			      description="若确认有此页面，请与管理员联系"
			      type="error"
			      showIcon
			    />
			    <Link to="/">返回首页</Link>
        	</div>
        )
    }
}


export default Err