import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,browserHistory } from 'react-router';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Manage from "./public/Manage";
import User from "./public/User";
import Forget from "./public/login/Forget";

const setTitle = title => ()=> document.title = title;

ReactDOM.render(
        <Router history={browserHistory }>
            <Route exact path = '/' component = {App} onEnter={setTitle('登陆')}/>
            <Route  path = '/manage' component = {Manage}  onEnter={setTitle('信息')}/>
            <Route  path = '/user' component = {User}  onEnter={setTitle('用户')}/>
            <Route  path = '/forget' component = {Forget}  onEnter={setTitle('注册')}/>
        </Router>
    ,
    document.getElementById('root'));
registerServiceWorker();
