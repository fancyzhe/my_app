/**
 *
 * @fanz
 */

import React from "react";
import {AppBar, Badge, Dialog, Divider, Drawer, FontIcon, IconButton, Menu, MenuItem, Paper} from 'material-ui';
import {MuiThemeProvider} from "material-ui/styles/index";
import 'react-bootstrap'
import $ from 'jquery';
import UserPage from "./page/userPage";
import ManagePage from "./page/managePage";
import {Link} from "react-router";
import './bottom_nav.css';
import '../../index.css'
import ChangeInfo from "./dialog/changeInfo";
import {Local} from "../../common/utils";
import MoneyPage from "./page/moneyPage";
import MsgPage from "./page/msgPage";
import UserCostLog from "./page/usercostLog";
import CostLog from "./page/costLog";
import LoginLog from "./page/loginLog";
import AdminLog from "./page/adminLog";

const nav = [
    '居民信息',
    '水电费管理',
    '充值卡管理',
    '公告管理',
    '居民缴费日志',
    '水电费登记日志',
    '登陆日志',
    '操作日志'
];

class BottomNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            open: false,
            name: '',
            changeInfoDialog: false
        }
    }

    reLogin() {
        //清楚登陆信息的缓存
        sessionStorage.clear()

    }

    changeInfo() {
        this.setState({
            changeInfoDialog: true
        });
    }

    handleClose = () => {
        this.setState({changeInfoDialog: false})
    };


    select = (index) => this.setState({selectedIndex: index});


    adminPage() {
        return (
            <div>
                <div className="left" style={{width: '20%'}}>
                    <Menu>
                        <MenuItem
                            primaryText="居民信息"
                            leftIcon={<i className="mdui-icon material-icons">accessibility</i>}
                            style={{width: '285px'}}
                            onClick={() => this.select(0)}
                        />
                        <MenuItem
                            primaryText="水电费管理"
                            leftIcon={<i className="mdui-icon material-icons">view_headline</i>}
                            style={{width: '285px'}}
                            onClick={() => this.select(1)}
                        />
                        <MenuItem
                            primaryText="充值卡管理"
                            style={{width: '285px'}}
                            leftIcon={<i className="mdui-icon material-icons">attach_money</i>}
                            onClick={()=>this.select(2)}
                        />
                        <MenuItem
                            primaryText="公告管理"
                            style={{width: '285px'}}
                            leftIcon={<i className="mdui-icon material-icons">add_alert</i>}
                            onClick={()=>this.select(3)}
                        />
                        <Divider/>
                        <MenuItem
                            primaryText="居民缴费日志"
                            style={{width: '285px'}}
                            leftIcon={<i className="mdui-icon material-icons">touch_app</i>}
                            onClick={()=>this.select(4)}
                        />
                        <MenuItem
                            primaryText="水电费登记日志"
                            style={{width: '285px'}}
                            leftIcon={<i className="mdui-icon material-icons">insert_chart</i>}
                            onClick={()=>this.select(5)}
                        />
                        <MenuItem
                            primaryText="登陆日志"
                            style={{width: '285px'}}
                            leftIcon={<i className="mdui-icon material-icons">mouse</i>}
                            onClick={()=>this.select(6)}
                        />
                        <MenuItem
                            primaryText="操作日志"
                            style={{width: '285px'}}
                            leftIcon={<i class="mdui-icon material-icons">supervisor_account</i>}
                            onClick={()=>this.select(7)}
                        />
                        <Divider/>
                        <MenuItem
                            primaryText="修改个人信息"
                            style={{width: '285px'}}
                            leftIcon={<i className="mdui-icon material-icons">edit</i>}
                            onClick={this.changeInfo.bind(this)}
                        />
                        <Link to='/' style={{textDecoration: 'none'}}>
                            <MenuItem
                                primaryText="安全退出"
                                style={{width: '285px'}}
                                leftIcon={<i className="mdui-icon material-icons">power_settings_new</i>}
                                onClick={this.reLogin}
                            />
                        </Link>
                    </Menu>
                </div>
                <div className="grey left" style={{width: '80%'}}>
                    <Paper className="paper mt10 ml30" zDepth={5} style={{textAlign: 'left'}}>
                        {
                            this.changePage()
                        }
                    </Paper>
                </div>
            </div>
        )
    }

    changePage() {
        switch (this.state.selectedIndex) {
            case 0 :
                return (<UserPage/>);
            case 1 :
                return (<ManagePage/>);
            case 2 :
                return(<MoneyPage />);
            case 3:
                return(<MsgPage />);
            case 4:
                return(<UserCostLog />);
            case 5:
                return(<CostLog />);
            case 6:
                return(<LoginLog />);
            case 7:
                return(<AdminLog />)
        }
    }

    componentDidMount() {

    }

    render() {

        return (
            <MuiThemeProvider>
                <div className="mdui-toolbar mdui-color-theme blue" style={{color: 'white'}}>
                    <i className="mdui-icon material-icons">cached</i>
                    <a href="javascript:" className="mdui-typo-headline">
                        {sessionStorage.admin === 2 ? '用户操作' : '管理员操作'}
                    </a>
                    <a href="javascript:" className="mdui-typo-title">
                        {nav[this.state.selectedIndex]}
                    </a>
                    <div className="mdui-toolbar-spacer"/>
                    <a href="javascript:" style={{marginRight: '10%'}}>
                        {sessionStorage.name}
                    </a>
                </div>
                <Dialog
                    title="修改个人信息"
                    open={this.state.changeInfoDialog}
                    onRequestClose={this.handleClose}
                >
                    <ChangeInfo/>
                </Dialog>
                {
                    this.adminPage()
                }
            </MuiThemeProvider>
        )
    }
}

export default BottomNav