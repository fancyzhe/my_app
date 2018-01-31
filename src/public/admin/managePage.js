/**
 *
 * @fanz
 */

import * as React from "react";
import {Paper} from "material-ui";
import MyTable from "../../common/table";

    //管理员水电费管理页面

const tableHead = ['id','name', 'status'];

const tableData = [
    {
        name: 'John Smith',
        status: 'Employed',
    },
    {
        name: 'Randal White',
        status: 'Unemployed',
    },
    {
        name: 'Stephanie Sanders',
        status: 'Employed',
    },
    {
        name: 'Steve Brown',
        status: 'Employed',
    },
    {
        name: 'Joyce Whitten',
        status: 'Employed',
    },
    {
        name: 'Samuel Roberts',
        status: 'Employed',
    },
    {
        name: 'Adam Moore',
        status: 'Employed',
    },
];

class ManagePage extends React.Component{

    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return(
            <div style={{'textAlign':'center'}}>
                <Paper className="paper" zDepth={5} >
                    <MyTable
                        tableHeader={tableHead}
                        tableData={tableData}
                        showRowHover={true}
                        displayRowCheckbox={false}
                        className="table"
                    />
                </Paper>
            </div>
        )
    }
}

export default ManagePage