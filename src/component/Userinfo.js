import React, { Component } from 'react';
import { Row, Col, Upload, Avatar, message } from 'antd';
import { api, Accesskey, Secretkey, bucket, publicBucketDomain } from '../config.json'
import qiniu from 'qiniu';
import axios from 'axios';

class Userinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: JSON.parse(localStorage.getItem('userinfo')).user_id,
            Accesskey: Accesskey,
            Secretkey: Secretkey,
            token: '',
            bucket: bucket,
            mac: '',
            bucketManager: '',
            imageUrl: '',
            email: ''
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
        axios.post(api+"/api/init", {
            username: this.state.username,
        })
        .then(response => {
            console.log(response)
            let data = response.data
            this.setState({
                imageUrl: data.face,
                email: data.email
            })
        })
        .catch(error => {
            console.log(error)
        })
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
            return
        }
        if (info.file.status === 'done') {
            console.log(info.file.response);
            var Url = this.getUrl(info.file.response.key);
            console.log(Url);
            this.setState({
                imageUrl: Url
            })
            axios.post(api+"/api/changeAva", {
                username: this.state.username,
                pic: Url
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        }
        //console.log(this.imageUrl);
    }

    getUrl = (key) => {
        return "http://" + this.state.bucketManager.publicDownloadUrl(publicBucketDomain, key);
    }

    render() {
        return (
            < div >
                <Row>
                    <Col span={12} style={{ textAlign: "center" }}>
                        <Upload
                            name="file"
                            action="https://upload.qiniup.com"
                            beforeUpload={this.beforeUpload}
                            onChange={this.handleChange}
                            data={this.getToken}
                            showUploadList={false}
                        >
                            {this.state.imageUrl ? <Avatar size={256} src={this.state.imageUrl} alt="avatar" /> : <Avatar size={256} icon="user" />}
                        </Upload>
                    </Col>
                    <Col span={12} style={{ textAlign: "center" }}>
                        <br>
                        </br>
                        <br>
                        </br>
                        <Row>
                            <p>用户名：{this.state.username}</p>
                        </Row>
                        <br>
                        </br>
                        <Row>
                            <p>邮箱：{this.state.email}</p>
                        </Row>
                        <br>
                        </br>
                        <Row>
                            3
                        </Row>
                    </Col>
                </Row>
            </div >
        )
    }
}

export default Userinfo;