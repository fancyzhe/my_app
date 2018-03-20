/**
 *
 * @fanz
 */

import React from "react";
import {MuiThemeProvider} from "material-ui/styles/index";
import {Drawer, FontIcon, MenuItem, Paper} from "material-ui";
import {BottomNavigation, BottomNavigationItem} from "material-ui/BottomNavigation/index";
import {Link} from "react-router";
import Cost from "./user/cost";
import History from "./user/history";
import './user/user.css'

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            open: false,
            url: '',
        }
    }

    reLogin() {
        sessionStorage.clear()
    }


    select = (index) => this.setState({selectedIndex: index});

    adminBtn() {
        return (
            <div className="center">
                <Paper className="paper" zDepth={5}>
                    <h1>公告</h1>
                </Paper>
                <MuiThemeProvider>
                    <Drawer
                        open={this.state.open}
                        width={150}
                        docked={false}
                        openSecondary={true}
                        onRequestChange={(open) => this.setState({open})}
                    >
                        <MenuItem>查看个人信息</MenuItem>
                        <Link to={'/'} style={{'textDecoration': 'none'}}><MenuItem
                            onClick={this.reLogin()}>重新登录</MenuItem></Link>
                    </Drawer>
                </MuiThemeProvider>
            </div>
        )
    }

    adminPage() {
        const select = this.state.selectedIndex;
        return (
            <div>
                {
                    select === 0 ? this.costPage()
                        : select === 1 ? this.historyPage()
                        : this.adminBtn()
                }
            </div>
        )
    }

    costPage() {
        return (
            <Cost/>
        )
    }

    historyPage() {
        return (
            <History/>
        )
    }


    render() {

        const recentsIcon = <FontIcon className="material-icons">缴费</FontIcon>;
        const favoritesIcon = <FontIcon className="material-icons">历史记录</FontIcon>;
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
                            label="History"
                            icon={favoritesIcon}
                            onClick={() => {
                                this.select(1)
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
            </MuiThemeProvider>
        )
    }
}

export default User