/**
 *
 * @fanz
 */

import React from 'react'
import {Drawer, MenuItem, RaisedButton} from "material-ui";
import {MuiThemeProvider} from "material-ui/styles/index";

class Manage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <RaisedButton
                        label="Toggle Drawer"
                        onClick={this.handleToggle}
                    />
                    <Drawer open={this.state.open}>
                        <MenuItem>Menu Item</MenuItem>
                        <MenuItem>Menu Item 2</MenuItem>
                    </Drawer>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default Manage