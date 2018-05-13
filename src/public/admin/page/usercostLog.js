/**
 *
 * @fanz
 */
import React from 'react'
import MyTable from '../../../common/table'
import $ from 'jquery'
import {Local} from "../../../common/utils";
import Pagination from "../../../common/pagination";

const tableHead = ['序号','日志ID','时间','用户ID','名字','操作'];
export default class UserCostLog extends React.Component {


    constructor(props){
        super(props);
        this.state ={
            page:1,
            tableData:[],
            total:0
        }
    }

    getCost(){
        $.get(Local+'/getUserCostLog',{page:this.state.page})
            .then(res=>{
                this.setState({tableData:res.data,total:res.total})
            })
    }

    changePage(page){
        this.setState({
            page
        },()=>{this.getCost()})
    }

    componentDidMount(){
        this.getCost();
    }


    render() {
        return (
            <div>
                <MyTable
                    tableHeader={tableHead}
                    tableData={this.state.tableData}
                    selectable={false}
                    height="600px"
                />
                <Pagination
                    total={this.state.total}
                    onChange={this.changePage.bind(this)}
                />
            </div>
        )
    }
}