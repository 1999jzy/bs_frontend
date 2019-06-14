import React, { Component } from 'react';
import { Menu, Layout, Icon , message} from 'antd';
import history from './history';
import { Link } from 'react-router-dom'

const { Header } = Layout;
const SubMenu = Menu.SubMenu;


class HeaderBar extends Component {

    // logout = () => {
    //     localStorage.removeItem("userinfo");
    //     this.forceUpdate();
    // }

    login = () => {
        if(localStorage.getItem('userinfo') == null)
            history.push('/login');
        else
            message.warn("您已登录")
    }

    UserJump = () => {
        if (localStorage.getItem('userinfo') == null) {
            message.warn("请先登录")
        }
        else {
            history.push('/user')
        }
    }

    render() {
        return (
            <Header style={{ background: '#fff', padding: 0 }}>
                {/* <Menu mode="horizontal"
                    style={{ lineHeight: '64px', width: '64px', float: 'left', marginLeft: '40px' }}>
                    <Link to="/home" style={{float: 'left', marginLeft: '18px'}}>主页</Link>
                </Menu> */}
                <Menu mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right', marginRight: '20px' }}
                >
                    <Menu.Item >
                        <Link to="/home" >主页</Link>
                    </Menu.Item>
                    <SubMenu
                        title={<span>
                            <Icon type="user" style={{ fontSize: 18, color: '#1890ff' }} /> {this.props.username}
                        </span>}
                    >
                        <Menu.Item key="登录" onClick={this.login} style={{ textAlign: 'center' }}>
                            <span>登录</span>
                        </Menu.Item>
                        <Menu.Item key="登出" onClick={this.props.logout} style={{ textAlign: 'center' }}>
                            <span>登出</span>
                        </Menu.Item>
                        <Menu.Item key="个人中心" onClick={this.UserJump} style={{ textAlign: 'center' }}>
                            <span>个人中心</span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
        );
    }
}

export default HeaderBar;