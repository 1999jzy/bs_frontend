import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        }
    }

    render() {
        return (
            <Sider theme="dark">
                <Menu style={{ padding: '50px 0' }}
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                >
                    <Menu.Item key="/user">
                        <Link to='/user/info'>
                            <Icon type="user" /><span>个人信息</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='/user/'>
                        <Link to='/user/addBook'>
                            <Icon type="search" />
                            <span>发布图书</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={<span><Icon type="star-o" /><span>我的交易</span></span>}
                    >
                        <Menu.Item key="/user/myBuy">
                            <Link to='/user/myBuy'><span>我买到的</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/user/mySell">
                            <Link to='/user/mySell'><span>我卖出的</span></Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="7">
                        <Icon type="setting" />
                        <span>设置</span>
                    </Menu.Item>
                </Menu>
            </Sider >
        )
    }
}

export default SiderMenu;