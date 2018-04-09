/**
 *
 * @fanz
 */
import React from 'react'
import MyTable from '../../../common/table'
import $ from 'jquery'
import {Local} from "../../../common/utils";
import Pagination from "../../../common/pagination";
const tableHead=['序号','日志编号','操作ID','姓名','时间','内容']

export default class AdminLog extends React.Component {
    state={
        data:[],
        page:1
    };
    componentDidMount(){
        this.getAdminLog()
    }

    changePage(page){
        this.setState({page},()=>{this.getAdminLog()})
    }

    getAdminLog(){
        $.get(Local+'/getAdminLog',{page:this.state.page})
            .then(res=>{
                this.setState({data:res.data,total:res.total})
            })
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
                    onChange={this.changePage.bind(this)}
                />
            </div>
        )
    }
}