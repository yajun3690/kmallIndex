import { actionCreator } from './store'
import React,{ Component } from 'react'
import { connect } from 'react-redux'
import CategorySelector from './category-selector.js'
import {
  Form, Input, InputNumber,Breadcrumb , Row, Col, Button,
} from 'antd';
import Layout from 'common/layout'
import UploadImage from 'common/upload-image'
import RichEditor from 'common/rich-editor'
import { UPLOAD_PRODUCT_IMAGE,UPLOAD_PRODUCT_DETAIL_IMAGE } from 'api'
class ProductSave extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			productId:this.props.match.params.productId
		}
	}
	componentDidMount(){
		if(this.state.productId){
			this.props.handleProductDetail(this.state.productId)
		}
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		    values.id = this.state.productId;
		    this.props.handleSave(err,values)

		});
	}
    render(){
    	 const { getFieldDecorator } = this.props.form;
    	 const {
    	 	handleCategoryId,
    	 	handleImages,
    	 	handleDetail,
    	 	categoryIdValidateStatus,
    	 	categoryIdHelp,
    	 	imagesValidateStatus,
    	 	imagesIdHelp,
    	 	productValidateStatus,
    	 	productIdHelp,
    	 	isSaveFecthing,


			name,
			price,
			stock,
			images,
			detail,
			categoryId,
			description,
			parentCategoryId,



    	 }=this.props
    	 let fileList = [];
    	 if(images){
    	 	fileList = images.split(',').map((url,index)=>({
    	 		uid:index,
    	 		status:'done',
    	 		url:url,
    	 		response:url
    	 	}))

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
        	<div className="ProductSave">
        		<Layout> 
			        <Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>首页</Breadcrumb.Item>
						<Breadcrumb.Item>商品管理</Breadcrumb.Item>
						<Breadcrumb.Item>添加商品</Breadcrumb.Item>
			        </Breadcrumb>
			         <Form {...formItemLayout}>
						<Form.Item label='商品名称'>
							{getFieldDecorator('name', {
							rules: [{ required: true, message: '请输入商品名称' }],
							initialValue:name
							})(
								<Input  placeholder="商品名称" style={{width:200}}/>
							)}
						</Form.Item>
						<Form.Item label='商品描述'>
							{getFieldDecorator('description', {
							rules: [{ required: true, message: '请输入商品描述' }],
							initialValue:description
							})(
								<Input  placeholder="商品描述" style={{width:200}}/>
							)}
						</Form.Item>
						<Form.Item 
							label='商品分类'
							required={true}
							validateStatus={categoryIdValidateStatus}
							help={categoryIdHelp}
						>
							<CategorySelector 
								getCategoryId={(pid,id)=>{
									handleCategoryId(pid,id)
								}}
								parentCategoryId={parentCategoryId}
								categoryId={categoryId}
							/>
						</Form.Item>
						<Form.Item label='商品价格'>
							{getFieldDecorator('price', {
							rules: [{ required: true, message: '请输入商品价格' }],
							initialValue:price
							})(
								<InputNumber 
									min={0}
								/>
							)}
						</Form.Item>
						<Form.Item label='商品库存'>
							{getFieldDecorator('stock', {
							rules: [{ required: true, message: '请输入商品库存' }],
							initialValue:stock
							})(
								<InputNumber 
									min={0}
								/>
							)}
						</Form.Item>
						<Form.Item 
							label='商品图片'
							required={true}
							validateStatus={imagesValidateStatus}
							help={imagesIdHelp}						
						>
							<UploadImage 
                                action={UPLOAD_PRODUCT_IMAGE}
                                max={3}
                                getFileList={(fileList)=>{
                                    handleImages(fileList)
                                }}
                                fileList={fileList}
							/>
						</Form.Item>
						<Form.Item 
							label='商品描述'
							required={true}
							validateStatus={productValidateStatus}
							help={productIdHelp}
						>
							<RichEditor 
								 url={UPLOAD_PRODUCT_DETAIL_IMAGE}
								 getRichEditorValue={(value)=>{
								 	handleDetail(value)
								 }}
								 detail={detail}
							/>
						</Form.Item>
						<Form.Item {...tailFormItemLayout}>
							<Button 
								type="primary" 
								onClick={this.handleSubmit}
								loading={isSaveFecthing}
							>
							提交
							</Button>
						</Form.Item>      	
			         </Form>
        		</Layout>
        	</div>
        )
    }
}
const WrappedProductSave = Form.create()(ProductSave);
const mapStateToProps = (state)=>{
	return{
		categoryIdValidateStatus:state.get('product').get('categoryIdValidateStatus'),
		imagesValidateStatus:state.get('product').get('imagesValidateStatus'),
		productValidateStatus:state.get('product').get('productValidateStatus'),
		categoryIdHelp:state.get('product').get('categoryIdHelp'),
		imagesIdHelp:state.get('product').get('imagesIdHelp'),
		productIdHelp:state.get('product').get('productIdHelp'),
		isSaveFecthing:state.get('product').get('isSaveFecthing'),

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
		handleCategoryId:(pid,id)=>{
			const action = actionCreator.getSetCategoryIdAction(pid,id)
			dispath(action)			
		},
		handleImages:(fileList)=>{
			const action = actionCreator.getSetImagesAction(fileList)
			dispath(action)			
		},
		handleDetail:(value)=>{
			const action = actionCreator.getSetDetailAction(value)
			dispath(action)			
		},
		handleSave:(err,values)=>{
			const action = actionCreator.getSaveAction(err,values)
			dispath(action)			
		},
		handleProductDetail:(productId)=>{
			const action = actionCreator.getProductDetailAction(productId)
			dispath(action)			
		},

	}
}
export default connect(mapStateToProps,mapDispathToProps)(WrappedProductSave)

