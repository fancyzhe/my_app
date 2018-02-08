import React from "react";

import {Link,browserHistory} from "react-router";
import {TextField, RaisedButton} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import "./login.css"

/**
 *
 * @fanz
 */

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id:'',
            pwd:'',
            errorIdText: '',
            errorPwdText: '',
            status:false
        }
    }

    check() {
        const {id, pwd} = this.state;
        browserHistory .push('/user')

    }


    setPwd(e,pwd){
        this.setState({pwd});
        pwd.length > 8 ? this.setState({errorPwdText: "密码不能超过八位~"}) : this.setState({errorPwdText: ""});
    }

    setId(e,id){
        this.setState({id});
        id.length > 8 ? this.setState({errorIdText: "用户名不能超过八位~"}) : this.setState({errorIdText: ""});
    }

    componentDidMount(){
    }

    render() {

        const {errorIdText,errorPwdText,status} = this.state;

        return (
            <div>
                <div className="login">
                    <form className="form">
                        <div className="img_login"><img/></div>
                        <MuiThemeProvider>
                            <TextField
                                hintText="输入你的用户名"
                                floatingLabelText="用户名"
                                fullWidth={true}
                                errorText={errorIdText}
                                onChange={(e,v) => this.setId(e,v)}
                            />
                            <TextField
                                hintText="输入你的密码"
                                floatingLabelText="密码"
                                fullWidth={true}
                                type="password"
                                errorText={errorPwdText}
                                onChange={(e,v)=> this.setPwd(e,v)}
                            />
                            <RaisedButton
                                    label="登陆"
                                    primary={true}
                                    className="btn_login"
                                    onClick={this.check.bind(this)}
                            />
                            <Link to={'/Forget'} className = "a_login">
                                忘记密码...
                            </Link>
                        </MuiThemeProvider>
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginForm