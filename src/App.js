import React from 'react';
import LoginForm from "./public/login/LoginForm";
import {Router, Route, browserHistory} from 'react-router';
import Manage from "./public/Manage";
import User from "./public/User";
import Forget from "./public/login/Forget";
import {setTitle} from "./common/utils";


class App extends React.Component {

    render() {
        if (!sessionStorage.name) {
            browserHistory.push('/');
        }
        return (
            <div>
                <Router history={browserHistory}>
                    <Route exact path='/' component={LoginForm} onEnter={setTitle('水电收费系统-登陆')}/>
                    <Route path='/manage' component={Manage} onEnter={setTitle('管理员界面')}/>
                    <Route path='/user' component={User} onEnter={setTitle('用户')}/>
                    <Route path='/forget' component={Forget} onEnter={setTitle('忘记密码')}/>
                </Router>
            </div>
        )
    }
}

export default App;
