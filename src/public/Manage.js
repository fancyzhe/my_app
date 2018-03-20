/**
 *
 * @fanz
 */

import React from 'react'
import BottomNav from "../common/bottom_nav";
import {browserHistory} from "react-router";

class Manage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }



    render() {
        if(sessionStorage.admin!==1){
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