/**
 *
 * @fanz
 */
import React from 'react'
import MyTable from "../../../common/table";
import {Local} from "../../../common/utils";
import $ from 'jquery';
import Pagination from "../../../common/pagination";

const tableHead=['序号','登陆日志ID','登陆ID','姓名','时间'];
export default class LoginLog extends React.Component {
    state={
        data:[],
        page:1
    };

    chagePage(page){
        this.setState({page},()=>{this.getLoginLog()})
    }

    getLoginLog(){
        $.get(Local+'/getLoginLog',{page:this.state.page})
            .then(res=>this.setState({data:res.data,total:res.total}))
    }

    componentDidMount(){
        this.getLoginLog()
    }

    render() {
        return (
            <div>
                <MyTable
                    tableHeader={tableHead}
                    tableData={this.state.data}
                    selectable={false}
                />
                <Pagination
                    total={this.state.total}
                    onChange={this.chagePage.bind(this)}
                />
            </div>
        )
    }
}