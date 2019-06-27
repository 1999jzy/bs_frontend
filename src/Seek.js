import { message, Layout, Breadcrumb, Row, Col, Card, Button } from 'antd';
import React, { Component } from 'react';
import { api } from './config.json'
import HeaderBar from './common/HeaderBar'
import axios from 'axios'
const { Meta } = Card;
const { Content, Footer } = Layout;


class Seek extends Component {
    constructor(props) {
        super(props);

        if (this.props.location.state) {
            var { seekid } = this.props.location.state;
            seekid = seekid.toString()
        }
        else {
            seekid = "0"
        }

        this.state = {
            seekid: seekid,
            bookName: '',
            category: '',
            content: '',
            pic: '',
            seekPrice: '',
            state: '',
            username: ''
        }
        console.log(this.state.seekid)
    }

    componentDidMount() {
        console.log({
            seekid: this.state.seekid.toString()
        })
        axios.post(api + "/api/seekshow", {
            seekid: this.state.seekid
        })
            .then(response => {
                console.log(response);
                let data = response.data
                this.setState({
                    bookName: data.bookName,
                    category: data.category,
                    content: data.message,
                    pic: data.pic,
                    seekPrice: data.seekPrice,
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
                                            cover={<img alt="example" src={this.state.pic ? this.state.pic : "statics/empty.jpg"} />}
                                        >
                                            <Meta title={this.state.bookName} description={
                                                <div>
                                                    <br />
                                                    收购价：￥{this.state.seekPrice}
                                                    <br />
                                                    类型：{this.state.category}
                                                    <br />
                                                    {this.state.state ? "已提供" : "暂无人提供"}
                                                    <br />
                                                    <a >求购人:{this.state.username}</a>
                                                    <br />
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
                                            <Button
                                                type="primary" disabled={this.state.state !== 0}
                                                onClick={() => {
                                                    axios.post(api + "/api/supply", {
                                                        seekid: this.state.seekid
                                                    })
                                                        .then(response => {
                                                            console.log(response);
                                                            let data = response.data
                                                            if (data.status === 1) {
                                                                message.success(data.msg);
                                                                this.forceUpdate();
                                                            }
                                                        })
                                                        .catch(error => {
                                                            console.log(error)
                                                            message.error("未找到本书")
                                                        })
                                                }}>
                                                {this.state.state ? "已提供" : "提供"}
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

export default Seek;