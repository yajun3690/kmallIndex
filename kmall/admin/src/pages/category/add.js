import { actionCreator } from './store'
import React,{ Component } from 'react'
import { connect } from 'react-redux'
import {
	Col, 
	Row,
	Icon, 
	Form, 
	Input, 
	Button, 
	Select,
	Tooltip,
	Checkbox,
	Cascader,
	Breadcrumb ,
	AutoComplete,
} from 'antd';
const { Option } = Select;
import Layout from 'common/layout'
class CategoryAdd extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount(){
		this.props.getLevelOneCategories();
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    this.props.handleAdd(values);
		    window.location.href='/category'

		  }
		});
	}
    render(){
    	 const { getFieldDecorator } = this.props.form;
    	 const { isAddFecthing,levelOneCategories } = this.props
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
        	<div className="CategoryAdd">
        		<Layout> 
			        <Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>首页</Breadcrumb.Item>
						<Breadcrumb.Item>分类管理</Breadcrumb.Item>
						<Breadcrumb.Item>添加分类</Breadcrumb.Item>
			        </Breadcrumb>
			         <Form {...formItemLayout}>
						<Form.Item label='分类名称'>
							{getFieldDecorator('name', {
							rules: [{ required: true, message: '请输入分类名称' }],
							})(
								<Input  placeholder="分类名称" style={{width:300}} />
							)}
						</Form.Item>
						<Form.Item label='父级分类'>
							{getFieldDecorator('pid', {
							rules: [{ required: true, message: '请选择父级分类' }],
							})(
								<Select style={{ width:317 }}>
									<Option value="0" style={{ width:300 }}>根分类</Option>
									{
										levelOneCategories.map(category=>{
											return <Option style={{ width:300 }} key={category.get('_id')} value={category.get('_id')}>根分类/{category.get('name')}</Option>
										})
									}
								</Select>
							)}
						</Form.Item>
						<Form.Item {...tailFormItemLayout}>
							<Button 
								type="primary" 
								loading={isAddFecthing}
								onClick={this.handleSubmit}
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
const WrappedCategoryAdd = Form.create()(CategoryAdd);
const mapStateToProps = (state)=>{
	return{
		isAddFecthing:state.get('category').get('isAddFecthing'),
		levelOneCategories:state.get('category').get('levelOneCategories'),
	}
}
const mapDispathToProps = (dispath)=>{
	return{
		handleAdd:(values)=>{
			const action = actionCreator.getAddAction(values);
			dispath(action)
		},
		getLevelOneCategories:()=>{
			const action = actionCreator.getLevelOneCategoriesAction();
			dispath(action)
		}
	}
}
export default connect(mapStateToProps,mapDispathToProps)(WrappedCategoryAdd)

