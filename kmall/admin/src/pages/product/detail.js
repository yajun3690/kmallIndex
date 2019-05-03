import { actionCreator } from './store'
import React,{ Component } from 'react'
import { connect } from 'react-redux'
import CategorySelector from './category-selector.js'
import {
  Form, Input, InputNumber,Breadcrumb ,  Col,
} from 'antd';
import Layout from 'common/layout'

import './detail.css'
class ProductDetail extends Component{
	constructor(props){
		super(props);
		this.state = {
			productId:this.props.match.params.productId
		}
	}
	componentDidMount(){
		if(this.state.productId){
			this.props.handleProductDetail(this.state.productId)
		}
	}
    render(){
    	 const { getFieldDecorator } = this.props.form;
    	 const {
			name,
			price,
			stock,
			images,
			detail,
			categoryId,
			description,
			parentCategoryId,
    	 }=this.props
    	 let imgbox = '';
    	 if(images){
    	 	imgbox = images.split(',').map((url,index)=><li key={index}><img src={url}/></li>)

    	 }
		 const formItemLayout = {
		      labelCol: {
		        xs: { span: 24 },
		        sm: { span: 8 },
		      },
		      wrapperCol: {
		        xs: { span: 24 },
		        sm: { span: 16 },
		      },
		    };
		    const tailFormItemLayout = {
		      wrapperCol: {
		        xs: {
		          span: 24,
		          offset: 0,
		        },
		        sm: {
		          span: 16,
		          offset: 8,
		        },
		      },
		    };
        return (
        	<div className="ProductDetail">
        		<Layout> 
			        <Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>首页</Breadcrumb.Item>
						<Breadcrumb.Item>商品管理</Breadcrumb.Item>
						<Breadcrumb.Item>查看商品</Breadcrumb.Item>
			        </Breadcrumb>
			         <Form {...formItemLayout}>
						<Form.Item label='商品名称'>
							{getFieldDecorator('name', {
							rules: [{ required: true, message: '请输入商品名称' }],
							initialValue:name
							})(
								<Input  disabled={true} style={{width:200}}/>
							)}
						</Form.Item>
						<Form.Item label='商品描述'>
							{getFieldDecorator('description', {
							rules: [{ required: true, message: '请输入商品描述' }],
							initialValue:description
							})(
								<Input  disabled={true}  style={{width:200}}/>
							)}
						</Form.Item>
						<Form.Item 
							label='商品分类'
							required={true}
						>
							<CategorySelector 
								parentCategoryId={parentCategoryId}
								categoryId={categoryId}
								disabled={true} 
							/>
						</Form.Item>
						<Form.Item label='商品价格'>
							{getFieldDecorator('price', {
							rules: [{ required: true, message: '请输入商品价格' }],
							initialValue:price
							})(
								<InputNumber 
									disabled={true} 
								/>
							)}
						</Form.Item>
						<Form.Item label='商品库存'>
							{getFieldDecorator('stock', {
							rules: [{ required: true, message: '请输入商品库存' }],
							initialValue:stock
							})(
								<InputNumber 
									disabled={true} 
								/>
							)}
						</Form.Item>
						<Form.Item 
							label='商品图片'
							required={true}
						>
							<ul className='imgbox'>{imgbox}</ul>
						</Form.Item>
						<Form.Item 
							label='商品描述'
						>
							<div dangerouslySetInnerHTML={{__html:detail}}></div>
						</Form.Item>
			         </Form>
        		</Layout>
        	</div>
        )
    }
}
const WrappedProductDetail = Form.create()(ProductDetail);
const mapStateToProps = (state)=>{
	return{
		name:state.get('product').get('name'),
		price:state.get('product').get('price'),
		stock:state.get('product').get('stock'),
		images:state.get('product').get('images'),
		detail:state.get('product').get('detail'),
		categoryId:state.get('product').get('categoryId'),
		description:state.get('product').get('description'),
		parentCategoryId:state.get('product').get('parentCategoryId'),
	}
}
const mapDispathToProps = (dispath)=>{
	return{
		handleProductDetail:(productId)=>{
			const action = actionCreator.getProductDetailAction(productId)
			dispath(action)			
		},

	}
}
export default connect(mapStateToProps,mapDispathToProps)(WrappedProductDetail)

