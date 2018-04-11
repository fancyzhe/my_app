/**
 *
 * @fanz
 */
import React from 'react'
import MyTable from '../../../common/table'
import Pagination from "../../../common/pagination";
import {Local} from "../../../common/utils";
import $ from 'jquery'

const tableHead= ['序号','管理员','用户ID','用户','水费','电费','时间'];
export default class CostLog extends React.Component{
    state={
        data:[],
        page:1,
        total:0
    };

    getCostLog(){
        $.get(Local + '/getCostLog',{page:this.state.page})
            .then(res=>this.setState({data:res.data}))
    }

    componentDidMount(){
        this.getCostLog()
    }

    changePage(page){
        this.setState({page},()=>this.getCostLog())
    }
    render(){
        return(
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