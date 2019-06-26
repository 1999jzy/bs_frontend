import React, { Component } from 'react';
import { Table, Icon, message } from 'antd';
import { api } from '../config.json'
import axios from 'axios'
//import history from '../common/history'

const columns = [{
    title: '订单号',
    dataIndex: 'orderid',
    key: 'orderid',
}, {
    title: '书名',
    dataIndex: 'bookname',
    key: 'bookname',
}, {
    title: '卖家',
    dataIndex: 'seller',
    key: 'seller',
}, {
    title: '下单时间',
    dataIndex: 'ordertime',
    key: 'ordertime',
}, {
    title: '卖家确认发货',
    dataIndex: 'scom',
    key: 'scom',
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
}, {
    title: '确认收货',
    dataIndex: 'bcom',
    key: 'bcom',
    render: (text, record) => {
        //console.log(text)
        return (
            <Icon
                type={text ? "check-circle" : "close-circle"}
                theme="twoTone"
                twoToneColor={text ? "#52c41a" : "#eb2f96"}
                onClick={() => {
                    axios.post(api + "/api/modifyBcom", {
                        orderId: record['orderid']
                    })
                        .then(response => {
                            let data = response.data;
                            if (data.status === 1) {
                                message.success(data.msg)
                                window.location.reload(true);
                                //history.push("/user/myBuy")
                            }
                            else if (data.status === -1) {
                                message.error(data.msg)
                            }
                        })
                        .catch(error => {

                        })
                }} />
        )
    }
}, {
    title: '订单状态',
    dataIndex: 'state',
    key: 'state',
    render: text => {
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

class Mybuy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: JSON.parse(localStorage.getItem('userinfo')).user_id,
            dataSource: [],
        }
    }

    componentDidMount() {
        axios.post(api + "/api/myBuy", {
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

export default Mybuy;