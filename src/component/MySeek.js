import React, { Component } from 'react';
import { Table, Icon, Avatar } from 'antd';
import { api } from '../config.json'
import axios from 'axios'
//import history from '../common/history'

const columns = [{
    title: "编号",
    dataIndex: 'seekId',
    key: 'seekId',
}, {
    title: '缩略图',
    dataIndex: 'pic',
    key: 'pic',
    render: text => {
        //console.log(text)
        return (
            <Avatar src={text} shape="square" />
        )
    }
}, {
    title: '书名',
    dataIndex: 'bookname',
    key: 'bookname',
}, {
    title: '类别',
    dataIndex: 'category',
    key: 'category',
},{
    title: '求购时间',
    dataIndex: 'time',
    key: 'time',
}, {
    title: '有人提供',
    dataIndex: 'state',
    key: 'state',
    render: (text) => {
        //console.log(text)
        return (
            <Icon
                type={text ? "check-circle" : "close-circle"}
                theme="twoTone"
                twoToneColor={text ? "#52c41a" : "#eb2f96"}
                 />
        )
    }
}];

class MySeek extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: JSON.parse(localStorage.getItem('userinfo')).user_id,
            dataSource: [],
        }
    }

    componentDidMount() {
        axios.post(api + "/api/mySeek", {
            username: this.state.username
        }).then(response => {
            this.setState({
                dataSource: response.data
            })
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div style={{ background: '#ECECEC', textAlign: "center", margin: "auto" }}>
                <Table columns={columns} dataSource={this.state.dataSource} pagination={{ pageSize: 4 }} />
            </div>
        )
    }
}

export default MySeek;