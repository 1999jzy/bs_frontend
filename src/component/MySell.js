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
    title: '买家',
    dataIndex: 'buyer',
    key: 'buyer',
}, {
    title: '下单时间',
    dataIndex: 'ordertime',
    key: 'ordertime',
}, {
    title: '确认发货',
    dataIndex: 'scom',
    key: 'scom',
    render: (text, record) => {
        //console.log(text)
        return (
            <Icon
                type={text ? "check-circle" : "close-circle"}
                theme="twoTone"
                twoToneColor={text ? "#52c41a" : "#eb2f96"}
                onClick={() => {
                    axios.post(api + "/api/modifyScom", {
                        orderId: record['orderid']
                    })
                        .then(response => {
                            let data = response.data;
                            if (data.status === 1) {
                                message.success(data.msg)
                                //this.forceUpdate();
                                window.location.reload(true); 
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
    title: '买家确认收货',
    dataIndex: 'bcom',
    key: 'bcom',
    render: text => {
        //console.log(text)
        return (
            <Icon
                type={text ? "check-circle" : "close-circle"}
                theme="twoTone"
                twoToneColor={text ? "#52c41a" : "#eb2f96"} />
        )
    }
},{
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

class Mysell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: JSON.parse(localStorage.getItem('userinfo')).user_id,
            dataSource: []
        }
    }

    componentDidMount() {
        axios.post(api + "/api/mySell", {
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

export default Mysell;