import React, { Component } from 'react';
import { wsUrl } from '../config.json'
import { Button, Row, Col, Form, Input, Comment, Icon, List, message } from 'antd';
import axios from 'axios';
import { api } from '../config.json'

class Chatlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: JSON.parse(localStorage.getItem('userinfo')).user_id,
            ws: '',
            chatlist: [],
            chatmsg: [],
            curchat: '',
            visible: false,
            msg: ''
        }
    }

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    componentDidMount() {
        axios.post(api + "/api/chatList", {
            user: this.state.username
        })
            .then(response => {
                console.log(response)
                this.setState({
                    chatlist: response.data
                })
            })

        let ws = ''

        if (this.state.ws) {
            this.state.ws.close()
        }

        else {
            ws = new WebSocket(wsUrl + this.state.username);
        }

        ws.onopen = (e) => {
            console.log(e)
        }

        ws.onmessage = (evt) => {
            console.log(evt.data);
        }

        ws.onclose = () => {

        }

        this.setState({
            ws: ws
        })
    }

    componentWillUnmount() {
        this.state.ws.close()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue())

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                axios.post(api + "/api/addChat", {
                    user: this.state.username,
                    anotherUser: values.chatter
                })
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }

        })
    }

    send = () => {
        if (!this.state.curchat) {
            message.error("请选择聊天对象")
            return
        }
        var msg = JSON.stringify({
            chatid: this.state.curchat,
            sender: this.state.username,
            msg: this.state.msg
        })

        this.state.ws.send(msg)

        this.setState({
            msg: ''
        })
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Row>
                    <Col span={6} style={{ textAlign: "center" }}>
                        <Row>
                            <Form layout="inline" onSubmit={this.handleSubmit} style={{ textAlign: "center" }}>
                                <Form.Item>{
                                    getFieldDecorator('chatter', {
                                        rules: [{ required: true, message: '请输入联系人' }],
                                    })(
                                        <Input style={{ width: "200px" }}>

                                        </Input>
                                    )
                                }
                                </Form.Item>
                                <Form.Item>
                                    <Button htmlType="submit">
                                        添加联系人
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Row>
                        <List
                            bordered={true}
                            itemLayout="horizontal"
                            slot="renderItem"
                        >
                            {this.state.chatlist.map((item, index) => {
                                return (
                                    <List.Item
                                        key={item.chatid}
                                        style={{
                                            padding: "10px",
                                            background: "lightskyblue",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <List.Item.Meta
                                            onClick={() => {
                                                console.log(item.chatid)
                                                this.setState({
                                                    curchat: item.chatid
                                                })
                                            }}
                                            description={item.user === this.state.username ? item.anotherUser : item.user}
                                        >
                                        </List.Item.Meta>
                                    </List.Item>
                                )
                            })}
                        </List>
                    </Col>
                    <Col span={18} style={{ textAlign: "center" }}>
                        <div id="msgarea" className="chat-box"
                            style={{ height: "300px", overflow: "auto" }}
                        >

                        </div>
                        <Row>
                            <Col span={23} >
                                <Input
                                    value={this.state.msg}
                                    onInput={(e) => {
                                        this.setState({
                                            msg: e.target.value
                                        })
                                    }}
                                    onPressEnter={this.send}
                                    style={{ paddingLeft: "200px" }}
                                    suffix={
                                        <Icon slot="suffix" onClick={this.send} type="caret-right" />
                                    }
                                >
                                </Input>
                            </Col>
                            <Col span={1} >

                            </Col>
                        </Row>
                    </Col>
                </Row>



            </div >
        )
    }
}

Chatlist = Form.create()(Chatlist);

export default Chatlist;
