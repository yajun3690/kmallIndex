import React,{ Component } from 'react'
import {Route,Switch} from "react-router-dom"
import CategoryAdd from './add.js'
import CategoryList from './list.js'

class Category extends Component{
    render(){
        return (
        	<Switch>
        		<Route exact path='/category/add' component={CategoryAdd} />
        		<Route exact path='/category/:pid?' component={CategoryList} />
        		<Route exact path='/category' component={CategoryList} />
        	</Switch>
        )
    }
}


export default Category



