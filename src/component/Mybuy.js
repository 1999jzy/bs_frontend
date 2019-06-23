import React, { Component } from 'react';
import {Table} from 'antd';

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
},  {
    title: '卖家确认收货',
    dataIndex: 'scom',
    key: 'scom',
}, {
    title: '确认收货',
    dataIndex: 'bcon',
    key: 'bcom',
}];

class Mybuy extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource : []
        }
    }
    render(){
        return(
            <div style={{ background: '#ECECEC',textAlign: "center", margin: "auto" }}>
                    <Table columns={columns} dataSource={this.state.dataSource} pagination={{pageSize:4}}/>
                </div>
        )
    }
}

export default Mybuy;