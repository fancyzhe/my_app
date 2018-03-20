import React from "react";
import $ from 'jquery';
import {Link, browserHistory} from "react-router";
import {TextField, RaisedButton, Paper, Snackbar} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import "./login.css"
import {Local} from "../../common/utils";

/**
 *
 * @fanz
 */

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            pwd: '',
            admin: '',
            errorIdText: '',
            errorPwdText: '',
            err:false,
            status: false,
        }
    }

    check() {
        const {id, pwd, errorPwdText, errorIdText} = this.state;
        pwd.length === 0 ? this.setState({errorPwdText: "密码不能为空"}) : this.setState({errorPwdText: "", status: true});
        id.length === 0 ? this.setState({errorIdText: "用户名不能为空"}) : this.setState({errorIdText: "", status: true});
        let thiz = this;
        if (errorPwdText === '' && errorIdText === '') {
            $.post(Local + '/login_post', {'id': this.state.id, 'password': this.state.pwd}, function (res, req) {
                thiz.setState({admin: res.data.admin,name:res.data.name})
            }).then(() => {
                const {admin,name} = this.state;
                if (admin) {
                    sessionStorage.name = name;
                    sessionStorage.admin = admin;
                    admin === 1 && browserHistory.push('/manage');
                    admin === 2 && browserHistory.push('/user');
                } else {
                    this.setState({
                        err: true
                    });
                }
            });

        }
    }

    handleRequestClose = () => {
        this.setState({
            err: false,
        });
    };


    setPwd(e, pwd) {
        this.setState({pwd});
        pwd.length > 8 ? this.setState({errorPwdText: "密码不能超过八位~"}) : this.setState({errorPwdText: ""});
    }

    setId(e, id) {
        this.setState({id});
        id.length > 8 ? this.setState({errorIdText: "用户名不能超过八位~"}) : this.setState({errorIdText: ""});
    }

    componentDidMount() {

    }

    render() {

        const {errorIdText, errorPwdText} = this.state;

        return (
            <div>
                <div className="login">
                    <MuiThemeProvider>
                        <Paper className="form" zDepth={3}>
                            <div className="img_login"><img src={require('../../img/logo.png')}
                                                            width="100px" height="100px"/></div>
                            <TextField
                                hintText="输入你的用户名"
                                floatingLabelText="用户名"
                                fullWidth={true}
                                errorText={errorIdText}
                                onChange={(e, v) => this.setId(e, v)}
                            />
                            <TextField
                                hintText="输入你的密码"
                                floatingLabelText="密码"
                                fullWidth={true}
                                type="password"
                                errorText={errorPwdText}
                                onChange={(e, v) => this.setPwd(e, v)}
                            />
                            <RaisedButton
                                label="登陆"
                                primary={true}
                                className="btn_login"
                                onClick={() => this.check()}
                            />
                            <Link to={'/Forget'} className="a_login">
                                忘记密码...
                            </Link>
                            <Snackbar
                                open={this.state.err}
                                message="密码错误!"
                                autoHideDuration={4000}
                                onRequestClose={this.handleRequestClose}
                            />
                        </Paper>
                    </MuiThemeProvider>
                </div>
            </div>
        )
    }
}

export default LoginForm