import React,{ Component } from 'react'
import {Route,Switch} from "react-router-dom"
import ProductSave from './save.js'
import ProductDetail from './detail.js'
import ProductList from './list.js'

class Product extends Component{
    render(){
        return (
        	<Switch>
        		<Route exact path='/product/save/:productId?' component={ProductSave} />
        		<Route exact path='/product/detail/:productId?' component={ProductDetail} />
        		<Route exact path='/product/' component={ProductList} />
        	</Switch>
        )
    }
}


export default Product



