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

class BottomNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        }
    }

    select = (index) => this.setState({selectedIndex: index});

    adminBtn(){
        console.log(1);
        return(<Adminbtn />)
    }

    render() {

        const recentsIcon = <FontIcon className="material-icons">用户操作</FontIcon>;
        const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
        const nearbyIcon = <FontIcon className="material-icons">系统操作</FontIcon>;

        return (
            <MuiThemeProvider>
                <Paper zDepth={1} className="nav_bottom">
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                        <BottomNavigationItem
                            label="user"
                            icon={recentsIcon}
                            onClick={() => this.select(0)}
                        />
                        <BottomNavigationItem
                            label="Favorites"
                            icon={favoritesIcon}
                            onClick={() => this.select(1)}
                        />
                        <BottomNavigationItem
                            label="setting"
                            icon={nearbyIcon}
                            onClick={() => {
                                this.select(2);
                                this.adminBtn()
                            }}
                        />
                    </BottomNavigation>
                </Paper>
            </MuiThemeProvider>
        )
    }
}

export default BottomNav