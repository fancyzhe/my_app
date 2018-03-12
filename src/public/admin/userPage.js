/**
 *
 * @fanz
 */

import React from "react";
import {Paper} from "material-ui";
import './admin.css'
import MyTable from "../../common/table";
import {Local} from "../../common/utils";
import $ from 'jquery';

    //管理员居民信息管理界面

const tableHead = ['序号','ID','姓名','身份证号','省份','城市','小区','楼栋','房间号','历史记录','备注']

class UserPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }

    getUser(){
        $.get(Local+'/getUser')
            .then(res=>{
                this.setState({
                    data:res.data
                })
            })
    }

    componentDidMount(){
        this.getUser()
    }

    render(){
        return(
            <div style={{'textAlign':'center'}}>
                <Paper className="paper" zDepth={5} >
                    <MyTable
                        height="600px"
                        tableHeader={tableHead}
                        tableData={this.state.data}
                    />
                </Paper>
            </div>
        )
    }
}

export  default UserPage