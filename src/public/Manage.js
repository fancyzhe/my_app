/**
 *
 * @fanz
 */

import React from 'react'
import BottomNav from "./admin/bottom_nav";
import {browserHistory} from "react-router";


class Manage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }


    render() {
        if (sessionStorage.admin == 2) {
            browserHistory.push('/');
        }
        return (
            <div>
                <BottomNav/>
            </div>
        )
    }
}


export default Manage