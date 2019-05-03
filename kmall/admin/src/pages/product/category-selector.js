

import React,{ Component } from 'react'
import { Select } from 'antd';
import { request } from 'util'
import { GET_CATEGORIES } from 'api'
const Option = Select.Option;
class CategorySelector extends Component{
	constructor(props){
		super(props);
		this.state={
			levelOneCategories:[],
			levelTowCategories:[],
			levelOneId:'',
			levelTowId:'',
			isChanged:false,
			needLoadLevelTwo:false
		}
		this.handleLevelOneChange=this.handleLevelOneChange.bind(this)
		this.handleLevelTowChange=this.handleLevelTowChange.bind(this)
	}
	componentDidMount(){
		this.loadLevelOneCategories();
	}
	static getDerivedStateFromProps(props,state){
		const { parentCategoryId,categoryId } = props;
		const levelOneIdChanged = parentCategoryId != state.levelOneId;
		const levelTowIdChanged = categoryId != state.levelTowId;
		//新增商品时,不更新state
		if(state.levelOneId && !parentCategoryId && !categoryId){
			return null;
		}
		//分类ID没有改变,不更新state
		if(!levelOneIdChanged && !levelTowIdChanged){
			return null;
		}
		if(state.isChanged){
			return null;
		}
		//更新state
		if(parentCategoryId == 0){
			return {
				levelOneId:categoryId,
				levelTowId:'',
				isChanged:true
			}
		}else{
			return {
				levelOneId:parentCategoryId,
				levelTowId:categoryId,
				isChanged:true,
				needLoadLevelTwo:true
			}			
		}

		return null;
	}
	componentDidUpdate(){
		if(this.state.needLoadLevelTwo){
			this.loadLevelTowCategories();
			this.setState(()=>({needLoadLevelTwo:false}))
		}
	}	
	loadLevelOneCategories(){
		request({
			url:GET_CATEGORIES,
			data:{
				pid:0
			}
		})
		.then(result=>{
			// console.log(result)
			if(result.code==0){
				this.setState(()=>({levelOneCategories:result.data}))
			}
		})
	}
	handleLevelOneChange(value){
		this.setState(()=>({levelOneId:value,levelTowId:''}),()=>{
			this.loadLevelTowCategories()
			this.onValueChange();
		})
	}
	handleLevelTowChange(value){
		this.setState(()=>({levelTowId:value}),()=>{
			this.onValueChange();
		})
	}
	loadLevelTowCategories(){
		request({
			url:GET_CATEGORIES,
			data:{
				pid:this.state.levelOneId
			}
		})
		.then(result=>{
			if(result.code==0){
				this.setState(()=>({levelTowCategories:result.data}))
			}
		})
	}
	onValueChange(){
		const { getCategoryId } = this.props
		const { levelOneId,levelTowId } = this.state
		if(levelTowId){
			getCategoryId(levelOneId,levelTowId)
		}else{
			getCategoryId(0,levelOneId)
		}
	}
    render(){
    	const {disabled} = this.props
    	const {levelOneCategories,levelTowCategories,levelOneId,levelTowId}  = this.state;
    	const levelOneOptions = levelOneCategories.map(category=><Option key={category._id} value={category._id} style={{width:200}}>{category.name}</Option>)
    	const levelTowOptions = levelTowCategories.map(category=><Option key={category._id} value={category._id} style={{width:200}}>{category.name}</Option>)
        return  (
        	<div className='CategorySelector'>
        		<Select 
        			style={{width:217,marginRight:10}}
        			onChange={this.handleLevelOneChange}
        			value={levelOneId}
        			disabled={disabled}
        		>
        			{levelOneOptions}
        		</Select>
        		{
        			levelTowOptions.length?
		        		<Select 
		        			style={{width:217,marginRight:10}}
		        			onChange={this.handleLevelTowChange}
		        			value={levelTowId}
		        			disabled={disabled}
		        		>
		        			{levelTowOptions}
		        		</Select>
		        	:
		        		null
        		}
        	</div>
        )
    }
}
const mapStateToProps = (state)=>{
	return{

	}
}
const mapDispathToProps = (dispath)=>{
	return{

	}
}

export default CategorySelector