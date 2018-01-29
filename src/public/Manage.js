/**
 *
 * @fanz
 */

import React from 'react'
import Adminbtn from "../common/admin_btn";

class Manage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }



    render() {
        return (
            <div>
                <Adminbtn></Adminbtn>
            </div>
        )
    }
}

export default Manage