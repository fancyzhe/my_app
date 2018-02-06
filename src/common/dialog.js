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

    handleClose=() => {this.setState({open:false})};

    render() {

        const {text,sure} = this.props;
        console.log(1);

        const actions= [
            <FlatButton
                label="取消"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="确定"
                primary={true}
                onClick={sure}
            />
        ];

        return (
            <div>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    {text}
                </Dialog>
            </div>
        )
    }
}