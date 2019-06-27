import React, { Component } from 'react';
import HeaderBar from './common/HeaderBar'
import SiderMenu from './component/SiderMenu'
import { Layout, Breadcrumb, message, Icon } from 'antd';
import history from '../src/common/history'
import { Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import Userinfo from './component/Userinfo';
import BookAdd from './component/BookAdd'
import BookSeek from './component/BookSeek'
import Mybuy from './component/Mybuy';
import Mysell from './component/MySell';
import Chatlist from './component/Chatlist';
import MySeek from './component/MySeek';

const { Content, Footer, Header } = Layout;

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    logout = () => {
        localStorage.removeItem("userinfo");
        history.push('/home');
        message.error("请先登录")
    }

    render() {

        let name;
        if (localStorage.getItem('userinfo') == null) {
            history.push('/home')
        }
        else {
            name = JSON.parse(localStorage.getItem('userinfo')).user_id;
        }
        return (
            <div className="User">
                <Layout style={{ minHeight: '100vh' }}>
                    <HeaderBar username={name} logout={this.logout} />
                    <Layout>
                        <SiderMenu collapsed={this.state.collapsed} />
                        <Layout>
                            <Header style={{ background: '#fff', padding: 0 }}>
                                <Icon
                                    className="trigger"
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                />
                            </Header>
                            <Content style={{ padding: '0 50px' }}>
                                <Breadcrumb style={{ margin: '16px 0' }}>
                                    <Breadcrumb.Item>User</Breadcrumb.Item>
                                </Breadcrumb>
                                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                                    <Switch>
                                        <Route exact path='/user' component={Userinfo} />
                                        <Route exact path='/user/info' component={Userinfo} />
                                        <Route exact path='/user/addBook' component={BookAdd} />
                                        <Route exact path='/user/seekBook' component={BookSeek} />
                                        <Route exact path='/user/myBuy' component={Mybuy} />
                                        <Route exact path='/user/mySell' component={Mysell} />
                                        <Route exact path='/user/mySeek' component={MySeek} />
                                        <Route exact path='/user/myMsg' component={Chatlist} />
                                    </Switch>
                                </div>
                            </Content>

                            <Footer style={{ textAlign: 'center' }}>BS©2019 Created by jzy</Footer>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default User;