/**
 *
 * @fanz
 */

import React from "react";
import {FontIcon, Paper} from 'material-ui';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import {MuiThemeProvider} from "material-ui/styles/index";
import './css/bottom_nav.css'
import 'react-bootstrap'
import Adminbtn from "./admin_btn";
import UserPage from "../public/admin/userPage";
import ManagePage from "../public/admin/managePage";

class BottomNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        }
    }

    select = (index) => this.setState({selectedIndex: index});

    adminBtn() {
        return (
            <Adminbtn/>
        )
    }

    adminPage() {
        const select = this.state.selectedIndex;
        return (
           <div>
               {
                    select === 0 ? this.userPage()
                                 : select === 1 ? this.managementPage()
                                                : this.adminBtn()
               }
           </div>
        )
    }

    userPage(){
        return(
            <UserPage />
        )
    }

    managementPage(){
        return(
            <ManagePage />
        )
    }


    render() {

        const recentsIcon = <FontIcon className="material-icons">居民信息</FontIcon>;
        const favoritesIcon = <FontIcon className="material-icons">水电费管理</FontIcon>;
        const nearbyIcon = <FontIcon className="material-icons">系统操作</FontIcon>;

        return (
            <MuiThemeProvider>
                <Paper zDepth={1} className="nav_bottom">
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                        <BottomNavigationItem
                            label="user"
                            icon={recentsIcon}
                            onClick={() => {
                                this.select(0);
                            }}
                        />
                        <BottomNavigationItem
                            label="Favorites"
                            icon={favoritesIcon}
                            onClick={() => {
                                this.select(1)
                            }}
                        />
                        <BottomNavigationItem
                            label="setting"
                            icon={nearbyIcon}
                            onClick={() => {
                                this.select(2);
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

export default BottomNav