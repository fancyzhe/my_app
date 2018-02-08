import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Route} from "react-router";
import Manage from "./public/Manage";
import User from "./public/User";

const setTitle = title => ()=> document.title = title;

ReactDOM.render(
            <div>
                <Route exact path = '/' component = {App} onEnter={setTitle('登陆')}/>
                <Route  path = '/manage' component = {Manage}  onEnter={setTitle('信息')}/>
                <Route  path = '/user' component = {User}  onEnter={setTitle('用户')}/>
            </div>
    ,
    document.getElementById('root'));
registerServiceWorker();
