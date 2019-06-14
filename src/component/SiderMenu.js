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

    render(){
        return(
            <Sider>
                
            </Sider>
        )
    }
}