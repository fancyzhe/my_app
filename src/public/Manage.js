/**
 *
 * @fanz
 */

import React from 'react'
import BottomNav from "../common/bottom_nav";

class Manage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }



    render() {
        return (
            <div>
                <BottomNav/>
            </div>
        )
    }
}

export default Manage