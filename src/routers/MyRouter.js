import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../common/history';
import Home from '../Home'
import LoginForm from '../Login'
import RegisterForm from '../Register'
import User from '../User'
import Bookshow from '../Bookshow'
import Bookbuy from '../Bookbuy'

class MyRoute extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/login' component={LoginForm}/>
                    <Route path='/register' component={RegisterForm}/>
                    <Route path="/home" component={Home} />
                    <Route path="/user" component={User}/>
                    <Route path="/bookshow" component={Bookshow}/>
                    <Route path="/bookbuy" component={Bookbuy}/>
                </Switch>
            </Router>
        );
    }
}

export default MyRoute;