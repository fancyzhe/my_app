/**
 *
 * @fanz
 */

import React from "react";
import {MuiThemeProvider} from "material-ui/styles/index";
import {
  Dialog,
  Divider,
  Drawer,
  FontIcon,
  List,
  ListItem,
  makeSelectable,
  MenuItem,
  Paper,
  Subheader
} from "material-ui";
import {BottomNavigation, BottomNavigationItem} from "material-ui/BottomNavigation/index";
import {Link} from "react-router";
import Cost from "./user/cost";
import History from "./user/history";
import './user/user.css'
import $ from 'jquery'
import _ from 'lodash'
import {Local} from "../common/utils";
import ChangeUserInfo from "./user/changeInfo";
import ChangeUserPwd from "./user/changePwd";

let SelectableList = makeSelectable(List);

class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      open: false,
      url: '',
      Msg: '',
      dialog: false,
      pwdDialog: false
    }
  }

  reLogin() {
    sessionStorage.clear()
  }

  getMsg() {
    $.get(Local + '/getMsgByUser', {town: sessionStorage.townName})
    .then(res => {
      this.setState({
        Msg: res
      })
    })
  }

  changePerson() {
    this.setState({
      dialog: true
    })
  }

  changePsw() {
    this.setState({
      pwdDialog: true
    })
  }

  select = (index) => this.setState({selectedIndex: index});

  adminBtn() {
    return (
    <div className="center">
      <Paper className="paper" zDepth={5}>
        <h1>公告</h1>
        <SelectableList style={{textAlign: 'left'}}>
          {
            _.map(this.state.Msg, item => (
            <div>
              <ListItem>{item.time}&nbsp;&nbsp;&nbsp;&nbsp;{item.text}</ListItem>
              <Divider style={{width:'100%'}}/>
            </div>
            ))
          }
        </SelectableList>
      </Paper>
      <MuiThemeProvider>
        <Drawer
        open={this.state.open}
        width={150}
        docked={false}
        openSecondary={true}
        onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem>
            <FontIcon>
              {sessionStorage.name}
            </FontIcon>
          </MenuItem>
          <MenuItem onClick={() => {
            this.changePerson()
          }}>修改个人信息</MenuItem>
          <MenuItem onClick={() => {
            this.changePsw()
          }}>修改密码</MenuItem>
          <Link to={'/'} style={{'textDecoration': 'none'}}><MenuItem
          onClick={this.reLogin.bind(this)}>重新登录</MenuItem></Link>
        </Drawer>
      </MuiThemeProvider>
    </div>
    )
  }

  getTown() {
    $.get(Local + '/getTownName', {id: sessionStorage.id})
    .then(
    res => {
      sessionStorage.townName = res.data.town
    }
    )
  }

  handleClose = () => {
    this.setState({dialog: false})
  };
  pHandleClose = () => {
    this.setState({pwdDialog: false})
  };

  componentDidMount() {
    sessionStorage
    .townName && this.getMsg();
    this.getTown()
  }

  adminPage() {
    const select = this.state.selectedIndex;
    return (
    <div>
      {
        select === 0 ? <Cost/>
        : select === 1 ? <History/>
        : this.adminBtn()
      }
    </div>
    )
  }

  render() {

    const recentsIcon = <FontIcon className="material-icons">缴费</FontIcon>;
    const nearbyIcon = <FontIcon className="material-icons">系统操作</FontIcon>;

    return (
    <MuiThemeProvider>
      <Paper zDepth={1} className="nav_bottom">
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
          label="Cost"
          icon={recentsIcon}
          onClick={() => {
            this.select(0);
          }}
          />
          <BottomNavigationItem
          label="Setting"
          icon={nearbyIcon}
          onClick={(open) => {
            this.select(2);
            this.setState({open})
          }}
          />
        </BottomNavigation>
      </Paper>
      {
        this.adminPage()
      }
      <Dialog
      title="修改个人信息"
      open={this.state.dialog}
      onRequestClose={this.handleClose}
      >
        <ChangeUserInfo/>
      </Dialog>
      <Dialog
      title="修改个人信息"
      open={this.state.pwdDialog}
      onRequestClose={this.pHandleClose}
      >
        <ChangeUserPwd/>
      </Dialog>

    </MuiThemeProvider>
    )
  }
}

export default User