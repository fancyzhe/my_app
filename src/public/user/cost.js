/**
 *
 * @fanz
 */

import React from "react";
import {Paper, TextField} from "material-ui";
import $ from 'jquery'
import './user.css'
import _ from 'lodash'
import {Local} from "../../common/utils";

class Cost extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            msg: []
        }
    }

    getAdminMsg() {
        $.get(Local + '/getAdminMsg', {townName: sessionStorage.townName})
            .then(res => {
                this.setState({
                    msg: res.data
                })
            })
    }

    componentDidMount() {
        this.getAdminMsg();
    }

    render() {
        console.log(this.state.msg);
        return (<div style={{'textAlign': 'center'}}>
            <Paper className="paper" zDepth={5}>
                <i className="mdui-icon material-icons">&#xe5c8;</i>
                <TextField
                    value={_.get(this.state.msg,'phone')&&_.get(this.state.msg,'phone')}
                    disabled={true}
                />
                <i className="mdui-icon material-icons">&#xe61d;</i>

            </Paper>

        </div>)
    }
}

export default Cost