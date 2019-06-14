import {
    Form, Input, Select, Button, Table
} from 'antd';
import React, { Component } from 'react';

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
    scopedSlots: { customRender: 'pic' },
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
    scopedSlots: { customRender: 'state' },
}];

class SearchForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue())

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="Content" style={{textAlign: "center"}}>
                <Form layout="inline" onSubmit={this.handleSubmit} style={{ textAlign: "center" }}>
                    <FormItem>{
                        getFieldDecorator('choice', {
                            initialValue: 1,
                            rules: [{ required: true, message: '请选择！' }],
                        })(
                            <Select style={{ maxWidth: 80 }}>
                                <Option value={1}>书名</Option>
                                <Option value={2}>编号</Option>
                                <Option value={3}>价格</Option>
                            </Select>
                        )
                    }
                    </FormItem>
                    <FormItem>{
                        getFieldDecorator('contetnt', {
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
                <div style={{ background: '#ECECEC', minHeight: '200px', maxWidth: '600px', textAlign: "center", margin: "auto"}}>
                    <Table columns={columns} dataSource={[]} />
                </div>
            </div>
        );
    }
}

SearchForm = Form.create()(SearchForm);

export default SearchForm