import { Input, Upload, Form, Icon, message, Button } from 'antd';
import React, { Component } from 'react';
import { api, Accesskey, Secretkey, bucket, publicBucketDomain } from '../config.json'
import qiniu from "qiniu"
import axios from 'axios'

class BookSeek extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: JSON.parse(localStorage.getItem("userinfo")).user_id,
            Accesskey: Accesskey,
            Secretkey: Secretkey,
            token: '',
            bucket: bucket,
            mac: '',
            bucketManager: '',
            imageUrl: '',
            upLoading: false,
        }
    }

    getToken = () => {
        var mac = new qiniu.auth.digest.Mac(this.state.Accesskey, this.state.Secretkey);
        var options = {
            scope: this.state.bucket,
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken = putPolicy.uploadToken(mac);
        console.log(uploadToken);
        // this.state.token = uploadToken;
        var config = new qiniu.conf.Config();
        var bucketManager = new qiniu.rs.BucketManager(mac, config);
        this.setState({
            token: uploadToken,
            mac: mac,
            bucketManager: bucketManager
        })
        return {
            token: uploadToken,
            mac: mac,
            bucketManager: bucketManager
        }
    }

    componentDidMount() {
        this.getToken();
    }

    beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!')
        }
        return isJPG && isLt2M
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({
                upLoading: true,
            })
            return
        }
        if (info.file.status === 'done') {
            console.log(info.file.response);
            var Url = this.getUrl(info.file.response.key);
            console.log(Url);
            this.setState({
                imageUrl: Url,
                upLoading: false
            })
        }
        //console.log(this.state.upLoading);
    }

    getUrl = (key) => {
        return "http://" + this.state.bucketManager.publicDownloadUrl(publicBucketDomain, key);
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.upLoading && !this.state.imageUrl) {
            message.warning("请等待图片上传完毕");
        }
        else {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    axios.post(api + "/api/bookseek", {
                        bookName: values.book_name,
                        seekPrice: values.seekPrice,
                        category: values.category,
                        message: values.message,
                        username: this.state.username,
                        pic: this.state.imageUrl
                    })
                        .then(response => {
                            let data = response.data;
                            console.log(response);
                            if (data.status === -1) {
                                message.error(data.msg);
                            }
                            else {
                                message.success(data.msg);
                                this.props.history.push({ pathname: '/bookseek', state: {seekid: data.status} })
                            }
                        })
                        .catch(error => {
                            console.log("未知错误")
                        })
                }
            });
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="书名">
                    {getFieldDecorator('book_name', {
                        rules: [{ required: true, message: '请输入书名！' }],
                    })(
                        <Input prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Bookname" style={{ width: '400px' }} />
                    )}
                </Form.Item>
                <Form.Item label="求购价格">
                    {getFieldDecorator('seekPrice', {
                        rules: [{ required: true, message: '请输入求购价！' }],
                    })(
                        <Input prefix={<Icon type="money-collect" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Seekprice" style={{ width: '400px' }} />
                    )}
                </Form.Item>
                <Form.Item label="类别">
                    {getFieldDecorator('category', {
                        rules: [{ required: true, message: '请输入类别！' }],
                    })(
                        <Input prefix={<Icon type="profile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Category" style={{ width: '400px' }} />
                    )}
                </Form.Item>
                <Form.Item label="卖家留言">
                    {getFieldDecorator('message', {
                        rules: [{ required: false, message: '请输入ISBN' }],
                    })(
                        <Input prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Message" style={{ width: '400px' }} />
                    )}
                </Form.Item>
                <Form.Item label="上传图片">
                    <Upload.Dragger
                        name="file"
                        action="https://upload.qiniup.com"
                        beforeUpload={this.beforeUpload}
                        onChange={this.handleChange}
                        data={this.getToken}
                        showUploadList={false}>
                        {this.state.imageUrl ?
                            <img style={{ height: "102px", width: "102px" }} src={this.state.imageUrl} alt="pic" /> :
                            <div>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">发送图书封面.</p>
                            </div>
                        }
                    </Upload.Dragger>
                </Form.Item>
                <Form.Item style={{ textAlign: "center", margin: "auto" }}>
                    <Button type="primary" htmlType="submit" style={{ width: '150px'}}>
                        发布求购
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

BookSeek = Form.create()(BookSeek);
export default BookSeek;