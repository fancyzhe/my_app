/**
 *
 *
 * @fanz
 */
import React from "react";
import {RaisedButton, Snackbar, TextField} from "material-ui";
import $ from 'jquery';
import {Local} from "../../common/utils";

export default class ChangeUserPwd extends React.Component {

  state = {
    curPwd: '',
    newPwd: '',
    rePwd: '',
    open:'',
    msg:'',
    id:sessionStorage.id,
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
    const {newPwd, rePwd} = this.state;
    if (rePwd === newPwd) {
      $.post(Local + '/changePwd', this.state)
      .then(res => {
        if (res) {
          this.setState({open: true,msg:"修改成功"})
        } else {
          this.setState({open: true,msg:"修改失败"})
        }
      })
    } else {
      this.setState({
        open: true,msg:"两次密码不一致"
      })
    }
  }

  render() {

    const {curPwd, newPwd, rePwd,msg,open} = this.state;
    return (<div>
      <Snackbar
      open={open}
      className="fixed"
      message={msg}
      autoHideDuration={2000}
      onRequestClose={this.handleRequestClose}
      />
      当前密码：
      <TextField
      name="phone"
      type="password"
      className="w150 mr10"
      value={curPwd}
      onChange={this.setCurPwd.bind(this)}
      />
      <br/>
      新的密码：
      <TextField
      name="phone"
      type="password"
      className="w150 mr10"
      value={newPwd}
      onChange={this.setNewPwd.bind(this)}
      />
      <br/>
      确认密码：
      <TextField
      name="phone"
      type="password"
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