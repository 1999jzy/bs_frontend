import {
    Table, Avatar, Layout, Breadcrumb
} from 'antd';

import React, { Component } from 'react';
import axios from 'axios';
import { api } from '../config.json'
import history from '../common/history'
import HeaderBar from '../common/HeaderBar'

const { Content, Footer } = Layout;


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
}, {
    title: '求购状态',
    dataIndex: 'state',
    key: 'state',
    render: (text, record) => {
        if (text === 0) {
            return (
                <span>
                    <a onClick={() => {
                        history.push({ pathname: "/bookseek", state: { seekid: record["seekId"] } })
                    }}>
                        前往提供
                    </a>
                </span>
            )
        }
        else {
            return (
                <span>
                    <a onClick={() => {
                        history.push({ pathname: "/bookseek", state: { seekid: record["seekId"] } })
                    }}>
                        前往查看
                    </a>
                </span>
            )
        }
    }
}];

class SeekAll extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }


    componentDidMount() {
        axios.get(api + "/api/seekAll")
            .then(response => {
                console.log(response)
                this.setState({
                    dataSource: response.data
                })
            })
            .catch(error => {
                console.log(error)
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
            <div className="Content">
                <Layout style={{ minHeight: '100vh' }}>
                    <HeaderBar username={name} logout={this.logout} />
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Seek</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ background: '#fff', padding: 24, minHeight: 280, marginLeft: "20%", marginRight: "20%" }}>
                            <Table columns={columns} dataSource={this.state.dataSource} pagination={{ pageSize: 8 }} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>BS©2019 Created by jzy</Footer>
                </Layout >
            </div>
        );
    }
}


export default SeekAll