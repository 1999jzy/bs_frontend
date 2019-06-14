import React, { Component } from 'react';
import HeaderBar from './common/HeaderBar'
import { Layout, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import SearchForm from './component/Search'
import BooksAll from './component/BooksAll'

const { Content, Footer } = Layout;


class Home extends Component {
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
      <div className="Home">
        <Layout style={{ minHeight: '100vh' }}>
          <HeaderBar username={name} logout={this.logout}/>

          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              <SearchForm />
              <BooksAll />
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>BS©2019 Created by jzy</Footer>

        </Layout>
      </div>
    );
  }
}

export default Home;
