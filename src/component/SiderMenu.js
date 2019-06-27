import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderMenu extends Component {


    render() {
        return (
            <Sider
                theme="dark"
                trigger={null} collapsible collapsed={this.props.collapsed}
            >
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
                    <SubMenu
                        key="sub1"
                        title={<span><Icon type="star-o" /><span>发布图书</span></span>}
                    >
                        <Menu.Item key='/user/addBook'>
                            <Link to='/user/addBook'>
                                <Icon type="search" />
                                <span>发布新书</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key='/user/seekBook'>
                            <Link to='/user/seekBook'>
                                <Icon type="search" />
                                <span>发布求购</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={<span><Icon type="star-o" /><span>我的交易</span></span>}
                    >
                        <Menu.Item key="/user/myBuy">
                            <Link to='/user/myBuy'><span>我买到的</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/user/mySell">
                            <Link to='/user/mySell'><span>我卖出的</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/user/mySeek">
                            <Link to='/user/mySeek'><span>我的求购</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/user/myMsg">
                            <Link to='/user/myMsg'><span>我的消息</span></Link>
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