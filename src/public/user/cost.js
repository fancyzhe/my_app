/**
 *
 * @fanz
 */

import React from "react";
import {Paper, RaisedButton, Snackbar, TextField} from "material-ui";
import $ from 'jquery'
import './user.css'
import _ from 'lodash'
import {Local} from "../../common/utils";

class Cost extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      msg: {},
      cost: {},
      open: false,
      barMsg: '',
    }
  }

  getAdminMsg() {
    sessionStorage.townName &&
    $.get(Local + '/getAdminMsg', {townName: sessionStorage.townName})
    .then(res => {
      this.setState({
        msg: res.data[0]
      })
    })
  }

  getCost() {
    $.get(Local + '/getCostByUser', {id: sessionStorage.id})
    .then(res => {
      this.setState({
        cost: res.data[0]
      })
    })
  }

  changePayId = (e, v) => {
    this.setState({
      payId: v
    })
  };

  changePayPwd = (e, v) => {
    this.setState({
      payPwd: v
    })
  };

  payManage() {
    const {payId, payPwd} = this.state;
    $.get(Local + "/payManage", {payId, payPwd, id: sessionStorage.id, name: sessionStorage.name})
    .then(res => {
      if (res) {
        this.setState({
          barMsg: '充值成功',
          open: true
        }, () => {
          this.setClean();
          this.getCost()
        })
      } else {
        this.setState({
          barMsg: '充值失败',
          open: true
        })
      }
    })
  }

  setClean(){
    this.setState({
      payId:'',
      payPwd:'',
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  payWater() {
    const {payId, payPwd} = this.state;
    $.get(Local + "/payWater", {payId, payPwd, id: sessionStorage.id, name: sessionStorage.name})
    .then(res => {
      if (res) {
        this.setState({
          barMsg: '充值成功',
          open: true
        }, () => {
          this.setClean();
          this.getCost()
        })
      } else {
        this.setState({
          barMsg: '充值失败',
          open: true
        })
      }
    })
  }

  componentDidMount() {
    this.getAdminMsg();
    this.getCost();
  }

  render() {
    const {water, manage} = this.state.cost;
    return (
    <div style={{'textAlign': 'center'}}>
      <Paper className="paper" zDepth={5}>
        <div className="costMsg">
          您当前的水费余额为
          <a href="#">{water}</a>;
          <br/>
          电费余额为
          <a href="">{manage}</a>。
          <br/>
          请联系你的管理员购买充值卡进行充值水电费。
          <br/>
          <RaisedButton
          className="ml10 mt10"
          primary={true}
          label="获取管理员信息"
          onClick={() => this.getAdminMsg()}
          />
        </div>

        <div className="adminMsg">
          姓名：
          <i className="mdui-icon material-icons">&#xe5c8;</i>
          <TextField
          className="w100"
          value={_.get(this.state.msg, 'name')}
          disabled={true}
          />
          <br/>
          电话号码：
          <i className="mdui-icon material-icons">&#xe61d;</i>
          <TextField
          className="w100"
          value={_.get(this.state.msg, 'phone')}
          disabled={true}
          />
          <br/>
          微信号：
          <i className="mdui-icon material-icons">&#xe60e;</i>
          <TextField
          className="w100"
          value={_.get(this.state.msg, 'weixinCode')}
          disabled={true}
          />

        </div>
        <div>
          <TextField
          hintText="充值卡账号"
          value={this.state.payId}
          onChange={this.changePayId}
          />
          <RaisedButton
          className="ml10"
          label="充值水费"
          onClick={() => this.payWater()}
          />
          <br/>
          <TextField
          type="password"
          hintText="密码"
          value={this.state.payPwd}
          onChange={this.changePayPwd}
          />
          <RaisedButton
          className="ml10"
          label="充值电费"
          onClick={() => this.payManage()}
          />
        </div>
        <Snackbar
        open={this.state.open}
        message={this.state.barMsg}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
        />
      </Paper>

    </div>)
  }
}

export default Cost