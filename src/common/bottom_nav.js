/**
 *
 * @fanz
 */

import React from "react";
import {FontIcon, Paper} from 'material-ui';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import {MuiThemeProvider} from "material-ui/styles/index";
import './css/bottom_nav.css'


const recentsIcon = <FontIcon className="material-icons">用户操作</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn/>;

class BottomNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        }
    }

    select = (index) => this.setState({selectedIndex: index});

    render() {
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
                            label="Nearby"
                            icon={nearbyIcon}
                            onClick={() => this.select(2)}
                        />
                    </BottomNavigation>
                </Paper>
            </MuiThemeProvider>
        )
    }
}

export default BottomNav