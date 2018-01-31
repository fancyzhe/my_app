/**
 *
 * @fanz
 */

import * as React from "react";
import {Paper, TextField} from "material-ui";
import MyTable from "../../common/table";
import RaisedButton from 'material-ui/RaisedButton';
import './admin.css'
import Select from "../../common/select";

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
    },{
        name: 'Adam Moore',
        status: 'Employed',
    },{
        name: 'Adam Moore',
        status: 'Employed',
    },{
        name: 'Adam Moore',
        status: 'Employed',
    }
    ];

const selectData = ['万科','富力','恒大'];

class ManagePage extends React.Component{

    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return(
            <div style={{'textAlign':'center'}}>
                <Paper className="paper" zDepth={5} >
                    <div className="paper_header">

                        <Select
                            className="p_select"
                            data={selectData}
                        />

                        <TextField
                            hintText="输入搜索..."
                            className="search_text"
                        />

                        <RaisedButton label="搜索"/>

                        <RaisedButton
                            label="导出Excel"
                            className="p_btn"
                        />

                    </div>
                    <MyTable
                        height={600}
                        tableHeader={tableHead}
                        tableData={tableData}
                        displayRowCheckbox={true}
                        multiSelectable={true}
                        className="table"
                    />
                </Paper>
            </div>
        )
    }
}

export default ManagePage