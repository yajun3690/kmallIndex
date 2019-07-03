import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducer.js'

//1.store是负责整个数据的管理(获取最新的state,派发action,监听state的改变)
//2.整个应用只有一个store
//3.创建store时第一个参数需要传入一个函数(reducer)

// const store = createStore(reducer)

// console.log(process.env.NODE_ENV)
const middleware = [thunk]

if(process.env.NODE_ENV != 'production'){
	const logger = createLogger({});
	middleware.push(logger)
}

const store = createStore(reducer,applyMiddleware(...middleware))

export default store