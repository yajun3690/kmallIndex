
import React,{ Component,Fragment } from 'react'
import { BrowserRouter as Router, Route,Redirect,Switch } from "react-router-dom";


import Login from 'pages/login'
import Home from 'pages/home'
import User from 'pages/user'
import Category from 'pages/category'
import Order from 'pages/order'
import Product from 'pages/product'
import Err from 'common/err'
import { getUserName } from 'util'

import './App.css'

//路由入口
class App extends Component{

	render(){
		//登陆判断
		//若无登陆返回登陆页面，禁止访问首页
		const ProtectRoute = ({component:Component,...rest})=>(
			<Route 
				{...rest}
				render={(props)=>{
					return getUserName()
					? <Component {...props} />
					: <Redirect to="/login" />
				}}
			/>
		)
		//若已登录 返回首页，禁止login登陆页面
		const LoginRoute = ({component:Component,...rest})=>{
			return getUserName()
			? <Redirect to="/" />
			: <Component {...rest} />
		}
		return( 
			<Router forceRefresh={true} >
				<div className="App">
					<Switch>
						<ProtectRoute exact path="/" component={Home} />
						{
							//当匹配到路由"/login"后,渲染Login组件
						}
						<LoginRoute path="/login" component={Login} />
						<ProtectRoute path="/user" component={User} />
						<ProtectRoute path="/category" component={Category} />
						<ProtectRoute path="/product" component={Product} />
						<ProtectRoute path="/order" component={Order} />
						<Route component={Err} />
					</Switch>
				</div>
			</Router>
		)
	}
}


export default App; 