/**
 *
 * @fanz
 */
import React from 'react'
import MyTable from '../../../common/table'
import Pagination from "../../../common/pagination";
import {ALL_VALUE, Local} from "../../../common/utils";
import $ from 'jquery'
import _ from 'lodash'
import Select from "../../../common/select";
import {Dialog, RaisedButton} from "material-ui";
import AddMsg from "../dialog/addMsg";
const tableHead = ['序号','公告编号','内容','小区名字','发布人','时间'];
export default class MsgPage extends React.Component{
    state={
        data:[],
        total:0,
        page:1,
        town:[],
        currentTown:ALL_VALUE,
        dialog:false
    };

    getMsg(){
        $.get(Local+'/getMsg',{page:this.state.page})
            .then(res=>{
                this.setState({data:res.data,total:res.total})
            })
    }

    componentDidMount(){
        this.getTown();
        this.getMsg()
    }

    getTown() {
        $.get(Local + '/getTown')
            .then(
                res => {
                    res.data.unshift({
                        id: ALL_VALUE,
                        name: '全部'
                    });
                    this.setState({
                        town: res.data,
                    })
                }
            )
    }

    changeSelect = (event, index, value) => {
        let town;
        _.map(this.state.town,item=>{
            if(item.id ===value){
                town=item.name
            }
        });
        this.setState({
            currentTown: value,
            query:_.merge(this.state.query,{
                town
            })
        });
    };

    addMsg(){
        this.setState({dialog:true})
    }

    handleClose = () => {
        this.setState({dialog: false})
    };

    changePage(page){
        this.setState({page},()=>{this.getMsg()})
    }

    render(){
        return(
            <div>
                <Dialog
                    open={this.state.dialog}
                    title="发布公告"
                    onRequestClose={this.handleClose}
                >
                    <AddMsg/>
                </Dialog>
                <p className="inline ml30">小区名</p>
                <Select
                    className="inline"
                    data={this.state.town}
                    value={this.state.currentTown}
                    onChange={this.changeSelect}
                />
                <RaisedButton
                    className="ml30"
                    primary={true}
                    onClick={this.addMsg.bind(this)}
                    label="发布公告"
                />
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