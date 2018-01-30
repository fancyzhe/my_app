/**
 *
 * @fanz
 */

import * as React from "react";
import {Paper} from "material-ui";

    //管理员水电费管理页面

class ManagePage extends React.Component{

    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return(
            <div style={{'textAlign':'center'}}>
                <Paper className="paper" zDepth={5} >
                    水电费管理系统
                </Paper>
            </div>
        )
    }
}

export default ManagePage