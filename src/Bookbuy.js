import { message, Layout, Breadcrumb, Row, Col, Card, Button, Form, Select, Icon, Input } from 'antd';
import React, { Component } from 'react';
import { api } from './config.json'
import HeaderBar from './common/HeaderBar'
import axios from 'axios'

const { Meta } = Card;
const { Content, Footer } = Layout;
const { Option } = Select;

class Bookbuy extends Component {
    constructor(props) {
        super(props);
        if (this.props.location.state) {
            var { bookid } = this.props.location.state;
            bookid = bookid.toString()
        }
        else{
            bookid = "0"
        }
        this.state = {
            user_id: JSON.parse(localStorage.getItem('userinfo')).user_id,
            bookid: bookid,
            bookName: '',
            bookUrl: '',
            category: '',
            content: '',
            pic: '',
            priceNow: '',
            priceOri: '',
            state: '',
            username: ''
        }
        console.log(this.state.bookid)
    }

    componentDidMount() {
        console.log({
            bookId: this.state.bookid.toString()
        })
        axios.post(api + "/api/bookshow", {
            bookId: this.state.bookid
        })
            .then(response => {
                console.log(response);
                let data = response.data
                this.setState({
                    bookName: data.bookName,
                    bookUrl: data.bookUrl,
                    category: data.category,
                    content: data.content,
                    pic: data.pic,
                    priceNow: data.priceNow,
                    priceOri: data.priceOri,
                    state: data.state,
                    username: data.userName
                })
            })
            .catch(error => {
                console.log(error)
                message.error("未找到本书")
            })
    }

    logout = () => {
        localStorage.removeItem("userinfo");
        this.props.history.push('/home');
        message.error("请先登录")
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue())

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                if (this.state.user_id === this.state.username) {
                    message.warn("你不能购买你自己的书籍")
                }
                else {
                    axios.post(api + "/api/orderCreate", {
                        bookid: this.state.bookid,
                        bookname: this.state.bookName,
                        buyer: this.state.user_id,
                        seller: this.state.username,
                        ordertype: values.choice,
                        address: values.address
                    })
                        .then(response => {
                            console.log(response)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            }
        })
    }

    render() {
        let name;
        if (localStorage.getItem('userinfo') == null) {
            this.props.history.push('/home')
        }
        else {
            name = JSON.parse(localStorage.getItem('userinfo')).user_id;
        }

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 14 },
        };

        return (
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <HeaderBar username={name} logout={this.logout} />
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Bookbuy</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                            <Row>
                                <Col span={12}>
                                    <div style={{ textAlign: "center", margin: "15% 25%" }}>
                                        <Card
                                            hoverable
                                            style={{ width: 240 }}
                                            cover={<img alt="example" src={this.state.pic ? this.state.pic : "statics/empty.jpg"} />}
                                        >
                                            <Meta title={this.state.bookName} description={
                                                <div>
                                                    原价：￥{this.state.priceOri}
                                                    <br />
                                                    现价：￥{this.state.priceNow}
                                                    <br />
                                                    类型：{this.state.category}
                                                    <br />
                                                    {this.state.state ? "已售出" : "未售出"}
                                                    <br />
                                                    <a >卖家信息</a>
                                                    <br />
                                                    <a href={this.state.bookUrl}>外部链接</a>
                                                </div>
                                            } />
                                        </Card>
                                    </div>
                                </Col>
                                <Col span={12} >
                                    <Row style={{ margin: "15% 0" }}>
                                        <br />
                                        <br />
                                        <br />
                                        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                            <Form.Item label="交易方式">{
                                                getFieldDecorator('choice', {
                                                    initialValue: "1",
                                                    rules: [{ required: true, message: '请选择！' }],
                                                })(
                                                    <Select style={{ maxWidth: 200 }}>
                                                        <Option value={"1"}>线下交易</Option>
                                                        <Option value={"2"}>邮寄</Option>
                                                    </Select>
                                                )
                                            }
                                            </Form.Item>
                                            <Form.Item label="地址">
                                                {getFieldDecorator('address', {
                                                    rules: [{ required: true, message: '请输入地址！', min: 6 }],
                                                })(
                                                    <Input prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Address" style={{ width: '200px' }} />
                                                )}
                                            </Form.Item>
                                            <Form.Item>
                                                <Button type="primary" disabled={this.state.state !== 0} htmlType="submit" style={{ margin: "0 72%" }}>
                                                    {this.state.state ? "已售出" : "购买"}
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Content>

                    <Footer style={{ textAlign: 'center' }}>BS©2019 Created by jzy</Footer>
                </Layout >
            </div>
        )
    }
}

Bookbuy = Form.create()(Bookbuy)
export default Bookbuy;