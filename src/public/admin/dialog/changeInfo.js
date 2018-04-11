/**
 *
 * @fanz
 */

import React from "react";
import {Divider, RaisedButton, Snackbar, TextField} from "material-ui";
import $ from 'jquery'
import {Local} from "../../../common/utils";
import _ from 'lodash'


class ChangeInfo extends React.Component {

    state = {
        data: []
    };

    submitInfo() {
        const {name, phone, weixinCode} = this.state.data;
        console.log(name, phone, weixinCode);
        $.post(Local + '/postAdmin', {id: sessionStorage.id, name, phone, weixinCode})
            .then(res=>{
                console.log(res);
                res&&this.setState({open:true})
            })
    }

    componentWillMount() {
        $.get(Local + '/getAdmin', {id: sessionStorage.id})
            .then(res => {
                this.setState({data: res.data[0]})
            })
    }

    setName=(e, v)=> {
        this.setState({
            data:_.merge(this.state.data,{name: v})
        })
    };

    setPhone=(e, v) =>{
        this.setState({
            data:_.merge(this.state.data,{phone: v})
        })
    };

    setWecode=(e, v) =>{
        this.setState({
            data:_.merge(this.state.data,{weixinCode: v})
        })
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };


    render() {
        const {name, phone, weixinCode} = this.state.data;
        return (
            <div>
                <Snackbar
                    open={this.state.open}
                    className="fixed"
                    message="修改成功"
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose}
                />
                id:
                <TextField
                    disabled={true}
                    name="id"
                    className="w100 ml10"
                    value={sessionStorage.id}
                />
                <div style={{display: sessionStorage.townName !== 'null' ? 'inline ml10' : 'none'}}>
                    管理小区:
                    <TextField
                        disabled={true}
                        name="town"
                        value={sessionStorage.townName}
                        className="w100 ml10"
                    />
                </div>
                <Divider/>
                姓名：
                <TextField
                    name="name"
                    className="w150 mr10"
                    value={name}
                    onChange={this.setName.bind(this)}
                />
                电话：
                <TextField
                    name="phone"
                    className="w150 mr10"
                    value={phone}
                    onChange={this.setPhone.bind(this)}
                />
                微信号：
                <TextField
                    name="weixinCode"
                    className="w150 mr10"
                    value={weixinCode}
                    onChange={this.setWecode.bind(this)}
                />
                <RaisedButton
                    className="btn_changeInfo"
                    label="提交"
                    primary={true}
                    onClick={this.submitInfo.bind(this)}
                />
            </div>
        )
    }

}

export default ChangeInfo;