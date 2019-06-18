import {
    Form, Icon, Input, Button, message
} from 'antd';
import React, { Component } from 'react';
import axios from 'axios';
import { api } from './config.json'

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                console.log("register sucess")
                //localStorage.setItem('userinfo', JSON.stringify(values));
                //console.log(localStorage.getItem('userinfo'))
                axios.post(api + "/api/register", {
                    username: values.user_id,
                    password: values.password,
                    email: values.email
                }).then(response => {
                    console.log(response);
                    let data = response.data;
                    if (data.status === 1) {
                        message.success(data.msg)
                        setTimeout(() => {
                            this.props.history.push({ pathname: '/login', state: values });
                        }, 200);
                    }
                    else if (data.status === -1) {
                        message.error(data.msg)
                    }
                }).catch(error => {
                    console.log("Error in register:", error);
                })
                // message.success("成功注册")
                // setTimeout(() => {
                //     this.props.history.push({ pathname: '/login', state: values });
                // }, 200);
            }
            else {
                console.log("register fail")
            }
        })
    }

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
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
                    offset: 2,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        const { getFieldDecorator } = this.props.form;

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{
                position: 'absolute',
                top: '15%',
                left: '25%'
            }}>
                <Form.Item label="用户名">
                    {getFieldDecorator('user_id', {
                        rules: [{ required: true, message: '请输入用户名！' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" style={{ width: '400px' }} />
                    )}
                </Form.Item>
                <Form.Item label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ],
                    })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-mail" style={{ width: '400px' }} />)}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                min: 6,
                                message: 'Please input your password!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="password" style={{ width: '400px' }} />)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="confirm password" style={{ width: '400px' }} onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="/login"> Have an account? </a>
                </Form.Item>
            </Form>
        )
    }
}

RegisterForm = Form.create()(RegisterForm);
export default RegisterForm;