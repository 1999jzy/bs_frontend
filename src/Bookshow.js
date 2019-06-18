import { message, Layout, Breadcrumb, Row, Col, Card, Button } from 'antd';
import React, { Component } from 'react';
import { api } from './config.json'
import HeaderBar from './common/HeaderBar'
import axios from 'axios'
const { Meta } = Card;
const { Content, Footer } = Layout;


class Bookshow extends Component {
    constructor(props) {
        super(props);
        var { bookid } = this.props.location.state;
        bookid = bookid.toString()
        this.state = {
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
                    username: data.username
                })
            })
            .catch(error => {
                console.log(error)
                message.error("未找到本书")
            })
    }

    logout = () => {
        localStorage.removeItem("userinfo");
        this.forceUpdate();
    }

    handleButton = () =>{
        if (localStorage.getItem('userinfo') == null) {
            message.error("请先登录")
        }
        else {
            this.props.history.push({pathname: '/bookbuy', state: {bookid: this.state.bookid}})
        }
    }

    render() {
        let name;
        if (localStorage.getItem('userinfo') == null) {
            name = '游客'
        }
        else {
            name = JSON.parse(localStorage.getItem('userinfo')).user_id;
        }
        return (
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <HeaderBar username={name} logout={this.logout} />
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Bookshow</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                            <Row>
                                <Col span={12}>
                                    <div style={{ textAlign: "center", margin: "15% 25%" }}>
                                        <Card
                                            hoverable
                                            style={{ width: 240 }}
                                            cover={<img alt="example" src={this.state.pic ? this.state.pic : "http://psx59ycao.bkt.clouddn.com/35574339ab3c813.jpg"} />}
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
                                <Col span={12} style={{ textAlign: "center" }}>
                                    <Row style={{ margin: "15% 25%" }}>
                                        <Col>
                                            内容简介:
                                        </Col>
                                        <br />
                                        <Col>
                                            <div style={{ background: "#ececec", padding: "20px", }}>
                                                <p>{this.state.content}</p>
                                            </div>
                                        </Col>
                                        <br />
                                        <br />
                                        <br />
                                        <Col>
                                            <Button type="primary" disabled={this.state.state !== 0} onClick={()=>this.handleButton()}>
                                                {this.state.state ? "已售出" : "购买"}
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Content>

                    <Footer style={{ textAlign: 'center' }}>BS©2019 Created by jzy</Footer>
                </Layout >
            </div >
        )
    }
}

export default Bookshow;