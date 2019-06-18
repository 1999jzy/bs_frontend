import {
    Form, Icon, Input, Button, Checkbox, message, Row
} from 'antd';
import React, { Component } from 'react';
import '../src/css/LoginForm.css';
import axios from 'axios';
import { api } from './config.json'

class LoginForm extends Component {
    // constructor(props) {
    //     super(props);
    // }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                console.log("login sucess")
                localStorage.setItem('userinfo', JSON.stringify(values));
                //console.log(localStorage.getItem('userinfo'))
                axios.post(api + "/api/login", {
                    username: values.user_id,
                    password: values.login_pwd,
                }).then(response => {
                    console.log(response);
                    let data = response.data;
                    if (data.status === 1) {
                        message.success(data.msg)
                        setTimeout(() => {
                            this.props.history.push({ pathname: '/home', state: values });
                        }, 200);
                    }
                    else if (data.status === -1) {
                        message.error(data.msg)
                    }
                }).catch(error => {
                    console.log("Error in login:", error);
                })
            }
            else {
                console.log("login fail")
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <br />
                <Row type="flex" justify="center">
                    <img src="statics/timg.jpg" alt="" width="100" height="100" />
                </Row>
                <br />
                <Row type="flex" justify="center">
                    <h1 className="login-space">请登录</h1>
                </Row>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Row type="flex" justify="center">
                        <Form.Item label="用户名">
                            {getFieldDecorator('user_id', {
                                rules: [{ required: true, message: '请输入用户名！' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" style={{ width: '400px' }} />
                            )}
                        </Form.Item>
                    </Row>
                    <Row type="flex" justify="center">
                        <Form.Item label="密码">
                            {getFieldDecorator('login_pwd', {
                                rules: [{ required: true, message: '请输入密码！' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" style={{ width: '400px' }} />
                            )}
                        </Form.Item>
                    </Row>
                    <Row type="flex" justify="center">
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                        </Form.Item>
                    </Row>
                    <Row type="flex" justify="center">
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '150px' }} className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Row>
                    <Row type="flex" justify="center">
                        Or <br></br>
                        <a href="/register"> register now!</a>
                    </Row>
                </Form>
            </div>
        );
    }
}

LoginForm = Form.create()(LoginForm);

export default LoginForm;