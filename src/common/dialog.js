/**
 *
 *
 * @fanz
 */

import React from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

//警告框

export default class myDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true
        }
    }

    handleClose = ()=>{this.setState({dialogOpen:false})};

    render() {
        const {label, content, open,actions} = this.props;
        return (
            <Dialog
                title={label}
                actions={actions}
                open={open}
                modal={false}
                onRequestClose={this.handleClose}
            >
                {{content}}
            </Dialog>
        )
    }
}