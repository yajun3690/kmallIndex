import React,{ Component } from 'react'
import { connect } from 'react-redux'
//引入login相关的action
//相当于引用‘./store/index.js’中的actionCreator
//./store/index.js’中的actionCreator是引入./actionCreator中所有的action的别名
import { actionCreator } from './store'


import axios from 'axios'
import {
  Form, Icon, Input, Button, message,
} from 'antd';

import './index.css'

class NormalLoginForm extends Component {
  constructor(props){
  	super(props);
  	this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleLogin(values);

      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    	<div className="Login">
			<Form className="login-form">
			<Form.Item>
			  {getFieldDecorator('username', {
			    rules: [{ required: true, message: '请输入用户名!' },{ pattern: /^[a-z0-9_]{3,6}$/, message: '用户名为3到6位的字母,数字或者下划线!' }],
			  })(
			    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
			  )}
			</Form.Item>
			<Form.Item>
			  {getFieldDecorator('password', {
			    rules: [{ required: true, message: '请输入密码!' },,{ pattern: /^\w{3,6}$/, message: '密码为3到6位的字符!' }],
			  })(
			    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
			  )}
			</Form.Item>
			<Form.Item>
			  <Button type="primary" onClick={this.handleSubmit} className="login-form-button" loading={this.props.isFetching}>
			    登录
			  </Button>
			</Form.Item>
			</Form>
		</div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

const mapStateToProps = (state)=>{
  return {
    isFetching:state.get('login').get('isFetching')
  }
}
//connect 的第二个参数，定义方法，把dispath方法作为参数传递到这个方法当中
//返回一个对象，属性会映射到this.props上
//返回对象的属性对应的值是一个方法,派发action
const mapDispathToProps = (dispath)=>{
  return {
    handleLogin:(values)=>{
      //1,派发登陆action
      //2,登陆的action可以发送ajax请求
      //3，dispatch引用了redux-thunk派发的action可以是一个函数
      const action = actionCreator.getLoginAction(values);
      dispath(action)
    }
  }

}
export default connect(mapStateToProps,mapDispathToProps)(WrappedNormalLoginForm);

