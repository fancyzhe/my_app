import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route} from "react-router-dom";
import Manage from "./public/Manage";
import User from "./public/User";

const setTitle = title => ()=> document.title = title;

ReactDOM.render((
        <BrowserRouter>
            <div>
                <Route exact path = '/' component = {App} onEnter={setTitle('登陆')}/>
                <Route  path = '/manage' component = {Manage}  onEnter={setTitle('信息')}/>
                <Route  path = '/user' component = {User}  onEnter={setTitle('用户')}/>
            </div>
        </BrowserRouter>
    ),
    document.getElementById('root'));
registerServiceWorker();
