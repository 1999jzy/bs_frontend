import {
    Form, Input, Select, Button, Table, Avatar
} from 'antd';
import React, { Component } from 'react';
import axios from 'axios';
import { api } from '../config.json'
import history from '../common/history'

const { Option } = Select;
const FormItem = Form.Item;

const columns = [{
    title: "编号",
    dataIndex: 'bookid',
    key: 'bookid',
}, {
    title: '缩略图',
    dataIndex: 'pic',
    key: 'pic',
    render: text => {
        //console.log(text)
        return(
            <Avatar src={text} shape="square"/>
        )
    }
}, {
    title: '书名',
    dataIndex: 'bookname',
    key: 'bookname',
}, {
    title: '类别',
    dataIndex: 'category',
    key: 'category',
}, {
    title: '',
    dataIndex: 'state',
    key: 'state',
    render: (text, record) => {
        if (text === '0') {
            return (
                <span>
                    <a onClick={()=>{
                        history.push({pathname:"/bookbuy",state:{bookid:record["key"]}})
                    }}>
                        前往购买
                    </a>
                </span>
            )
        }
        else {
            return (
                <span>
                    <a onClick={()=>{
                        history.push({pathname:"/bookshow",state:{bookid:record["key"]}})
                    }}>
                        前往查看
                    </a>
                </span>
            )
        }
    }
}];

class SearchForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataSource : []
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue())

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                axios.post(api + "/api/searchbook", {
                    choice: values.choice,
                    content: values.content
                })
                    .then(response => {
                        console.log(response)
                        this.setState({
                            dataSource: response.data
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="Content" style={{ textAlign: "center" }}>
                <Form layout="inline" onSubmit={this.handleSubmit} style={{ textAlign: "center" }}>
                    <FormItem>{
                        getFieldDecorator('choice', {
                            initialValue: "1",
                            rules: [{ required: true, message: '请选择！' }],
                        })(
                            <Select style={{ maxWidth: 80 }}>
                                <Option value={"1"}>书名</Option>
                                <Option value={"2"}>编号</Option>
                                <Option value={"3"}>类别</Option>
                            </Select>
                        )
                    }
                    </FormItem>
                    <FormItem>{
                        getFieldDecorator('content', {
                            rules: [{ required: true, message: '请输入查询内容！' }],
                        })(
                            <Input style={{ width: 400 }}>

                            </Input>
                        )
                    }
                    </FormItem>
                    <FormItem>
                        <Button icon="search" htmlType="submit" />
                    </FormItem>
                </Form>
                <div style={{ background: '#ECECEC', maxWidth: '800px', textAlign: "center", margin: "auto" }}>
                    <Table columns={columns} dataSource={this.state.dataSource} pagination={{pageSize:4}}/>
                </div>
            </div>
        );
    }
}

SearchForm = Form.create()(SearchForm);

export default SearchForm