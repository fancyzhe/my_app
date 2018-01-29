import React from "react";
import {Link} from "react-router-dom";
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
            id:'1',
            pwd:''
        }
    }

    setCurrentOption(currentOptionName) {
        return currentOption => {
            this.setState({[currentOptionName]: currentOption});
        };
    }

    check(){
    }

    componentDidMount(){
        console.log(this.state);
    }

    render() {

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
                            />
                            <TextField
                                hintText="输入你的密码"
                                floatingLabelText="密码"
                                fullWidth={true}
                                type="password"
                                onChange={this.setCurrentOption('pwd')}
                            />
                            <Link to={'/Manage'}>
                                <RaisedButton
                                    label="登陆"
                                    primary={true}
                                    className="btn_login"
                                    onClick={this.check}
                                />
                            </Link>
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