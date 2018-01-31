/**
 *
 * @fanz
 */

import React from "react";
import {Paper} from "material-ui";
import './admin.css'
import MyTable from "../../common/table";

    //管理员居民信息管理界面

class UserPage extends React.Component{

    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return(
            <div style={{'textAlign':'center'}}>
                <Paper className="paper" zDepth={5} >
                    <MyTable />
                </Paper>
            </div>
        )
    }
}

export  default UserPage