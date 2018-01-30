/**
 *
 * @fanz
 */

//系统操作的按钮

import React from 'react'
import {Drawer, MenuItem, RaisedButton} from "material-ui";
import {MuiThemeProvider} from "material-ui/styles/index";
import {Link} from "react-router-dom";
import './css/admin_btn.css'
import {Label} from "react-bootstrap";

class Adminbtn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    reLogin(){
        //清楚登陆信息的缓存

    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <Label onClick={this.handleToggle}>系统操作</Label>
                    <Drawer
                        open={this.state.open}
                        width={100}
                        docked={false}
                        openSecondary={true}
                        onRequestChange={(open) => this.setState({open})}
                    >
                        <MenuItem>退出登录</MenuItem>
                        <Link to={'/'} style={{'textDecoration':'none'}}><MenuItem onClick={this.reLogin()}>重新登录</MenuItem></Link>
                    </Drawer>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default Adminbtn