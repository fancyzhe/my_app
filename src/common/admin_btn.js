/**
 *
 * @fanz
 */

//系统操作的按钮

import React from 'react'
import {Drawer, MenuItem, RaisedButton} from "material-ui";
import {MuiThemeProvider} from "material-ui/styles/index";

class Adminbtn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});


    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <RaisedButton onClick={this.handleToggle} label="系统操作"/>
                    <Drawer
                        open={this.state.open}
                        width={100}
                        docked={false}
                        openSecondary={true}
                        onRequestChange={(open) => this.setState({open})}
                    >
                        <MenuItem>退出登录</MenuItem>
                        <MenuItem>重新登录</MenuItem>
                    </Drawer>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default Adminbtn