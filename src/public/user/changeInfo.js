/**
 *
 * @fanz
 */


import React from "react";
import {Divider, RaisedButton, Snackbar, TextField} from "material-ui";
import _ from "lodash";
import $ from 'jquery';
import {Local} from "../../common/utils";
import Select from "../../common/select";


export default class ChangeUserInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        sex: '男',
        phone: '',
        name: '',
        IDcard: '',
      },
      open: false
    }
  }

  getUserInfo() {
    let _this = this;
    $.get(Local + '/getUserInfo', {id: sessionStorage.id})
    .then(res => {
      _this.setState({data: res.data})
    })
  }

  updateUserInfo() {
    let _this = this;
    $.post(Local + '/updateUserInfo', this.state.data)
    .then(() => {
      _this.setState({open: true})
    })
  }

  componentDidMount() {
    this.getUserInfo()
  }

  setName = (e, v) => {
    this.setState({
      data: _.merge(this.state.data, {name: v})
    })
  };

  setPhone = (e, v) => {
    this.setState({
      data: _.merge(this.state.data, {phone: v})
    })
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const {phone, name, town, sex, IDcard} = this.state.data;
    return (
    <div>
      <Snackbar
      open={this.state.open}
      className="fixed"
      message="修改成功"
      autoHideDuration={2000}
      onRequestClose={this.handleRequestClose}
      />
      Id：
      <TextField
      disabled={true}
      name="id"
      className="w100 ml10"
      value={sessionStorage.id}
      />
      小区：
      <TextField
      disabled={true}
      name="id"
      className="w100 ml10"
      value={town}
      />
      性别：
      <TextField
      disabled={true}
      name="id"
      className="w100 ml10"
      value={sex}
      />
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
      <br/>
      身份证号：
      <TextField
      name="idCaed"
      className=" mr10"
      value={IDcard}
      onChange={this.setPhone.bind(this)}
      />
      <RaisedButton
      className="ml100"
      label="确认修改"
      onClick={() => this.updateUserInfo()}
      />
    </div>
    )
  }
}