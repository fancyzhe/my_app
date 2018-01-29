import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route} from "react-router-dom";
import Manage from "./public/Manage";
import {setTitle} from "./common/uitls";

ReactDOM.render((
        <BrowserRouter>
            <div>
                <Route exact path = '/' component = {App} onEnter={setTitle('主页')}/>
                <Route  path = '/manage' component = {Manage}  onEnter={setTitle('信息')}/>
            </div>
        </BrowserRouter>
    ),
    document.getElementById('root'));
registerServiceWorker();
