/**
 *
 *
 * @fanz
 */
import React from "react";
import {RaisedButton, Snackbar, TextField} from "material-ui";
import $ from 'jquery';
import {Local} from "../../common/utils";

export default class ChangeUserPwd extends React.component {

  state = {
    curPwd: '',
    newPwd: '',
    rePwd: '',
  };

  setCurPwd = (e, v) => {
    this.setState({
      curPwd: v
    })
  };


  setNewPwd = (e, v) => {
    this.setState({
      newPwd: v
    })
  };
  setRePwd = (e, v) => {
    this.setState({
      rePwd: v
    })
  };

  updateUserPwd() {
    $.post(Local + '/changePwd', this.state)
    .then(res => {
      if (res) {
        this.setState({open: true})
      } else {
        this.setState({open: false})
      }
    })
  }

  render() {

    const {curPwd, newPwd, rePwd} = this.state;
    return (<div>
      <Snackbar
      open={this.state.open}
      className="fixed"
      message="修改成功"
      autoHideDuration={2000}
      onRequestClose={this.handleRequestClose}
      />
      当前密码：
      <TextField
      name="phone"
      className="w150 mr10"
      value={curPwd}
      onChange={this.setCurPwd.bind(this)}
      />
      新的密码：
      <TextField
      name="phone"
      className="w150 mr10"
      value={newPwd}
      onChange={this.setNewPwd.bind(this)}
      />
      确认密码：
      <TextField
      name="phone"
      className="w150 mr10"
      value={rePwd}
      onChange={this.setRePwd.bind(this)}
      />
      <RaisedButton
      className="ml100"
      label="确认修改"
      onClick={() => this.updateUserPwd()}
      />
    </div>)
  }
}