import React, { Component } from 'react';
import { wsUrl } from '../config.json'
import { Button, Row, Col, Form, Input, Comment, Icon, List, message, Avatar } from 'antd';
import axios from 'axios';
import { api } from '../config.json'
import moment from 'moment'

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
            msg: '',
            ava: '',
            anotherAva: '',
            avaUsername: ''
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

    componentWillMount() {
        axios.post(api + "/api/init", {
            username: this.state.username,
        })
            .then(response => {
                console.log(response)
                let data = response.data
                this.setState({
                    ava: data.face,
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

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
            const msg = JSON.parse(evt.data)
            msg.time = moment(msg.time).format("YYYY-MM-DD HH:mm:ss")
            console.log(msg)
            if (msg.chatId === this.state.curchat) {
                //console.log(msg.chatId + "," + this.state.curchat)
                let chatMsg = this.state.chatmsg
                chatMsg.push(msg)
                this.setState({
                    chatmsg: chatMsg
                })
            }
        }

        ws.onclose = () => {

        }

        this.setState({
            ws: ws
        })
    }

    scrollToBottom = () => {
        var div = document.getElementById('msgarea');
        div.scrollTop = div.scrollHeight
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentWillUnmount() {
        this.state.ws.close()
        this.setState({
            curchat: ''
        })
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

        if (!this.state.msg) {
            message.warn("请输入聊天信息")
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
                    <Col span={6}>
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
                        >
                            {this.state.chatlist.map((item, index) => {
                                return (
                                    <List.Item
                                        key={item.chatId}
                                        style={{
                                            padding: "10px",
                                            cursor: "pointer",
                                            background: item.chatId === this.state.curchat ? "lightskyblue" : null
                                        }}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.face} />}
                                            onClick={() => {
                                                console.log(item.chatId)
                                                let chatMsg = []
                                                axios.post(api + "/api/chatMsg", {
                                                    chatId: item.chatId
                                                })
                                                    .then(response => {
                                                        chatMsg = response.data
                                                        console.log(chatMsg)
                                                        this.setState({
                                                            curchat: item.chatId,
                                                            chatmsg: chatMsg,
                                                            anotherAva: item.face,
                                                            anotherUser: item.username
                                                        })
                                                    })
                                                    .catch(error => {
                                                        console.log(error)
                                                    })
                                            }}
                                            title={item.username}
                                            description={item.email}

                                        >
                                        </List.Item.Meta>
                                    </List.Item>
                                )
                            })}
                        </List>
                    </Col>
                    <Col span={1}>
                        <div style={{ float: "left", width: "1px", height: "400px", background: "darkgray", marginLeft: "50px" }}></div>
                    </Col>
                    <Col span={17} >
                        <div id="msgarea" className="chat-box"
                            style={{ height: "300px", overflow: "auto", marginLeft: "100px" }}
                        >
                            {this.state.chatmsg.map((item, index) => {
                                return (
                                    <Comment key={item.msgId}
                                        avatar={
                                            <Avatar
                                                src={item.sender === this.state.username ? this.state.ava : this.state.anotherAva}
                                                alt="Han Solo"
                                            />
                                        }
                                        content={item.content}
                                        datetime={<span>{item.time}</span>}
                                        author={<a>{item.sender}</a>}
                                    >

                                    </Comment>
                                )
                            })}

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
                                    style={{ paddingLeft: "100px" }}
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
