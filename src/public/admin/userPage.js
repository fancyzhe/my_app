/**
 *
 * @fanz
 */

import React from "react";
import {Dialog, IconButton, IconMenu, MenuItem, Paper, RaisedButton, TextField} from "material-ui";
import ContentAdd from 'material-ui/svg-icons/content/add';
import Download from 'material-ui/svg-icons/file/file-download';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import './admin.css'
import MyTable from "../../common/table";
import {ALL_VALUE, Local} from "../../common/utils";
import $ from 'jquery';
import Select from "../../common/select";
import {AddUser} from "./addUser";

    //管理员居民信息管理界面

const tableHead = ['序号','ID','姓名','身份证号','省份','城市','小区','楼栋','房间号'];

let cell;
let edit=true;

class UserPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            data:[],
            town:[],
            currentTown: ALL_VALUE,
            edit:true,
            dialog:false,
            cell:'',
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
        this.setState({
            currentTown: value,
        }, () => {
            this.getUser()
        });
    };

    getCell=(e)=>{
        const data =this.state.data;
        cell=data[e];
        console.log(cell);
        cell?edit=false:edit=true;
        console.log(edit);
    };

    searchById(){}

    componentDidMount(){
        this.getUser();
        this.getTown();
    }

    addUser(){
        this.setState({dialog:true})
    }

    handleClose = () => {
        this.setState({dialog: false})
    };

    render(){
        return(
            <div style={{'textAlign':'center'}}>
                <Paper className="paper mt5" zDepth={5} style={{textAlign:'left'}}>
                    <Dialog
                        open={this.state.dialog}
                        title="添加用户"
                        onRequestClose={this.handleClose}
                    >
                        <AddUser />
                    </Dialog>
                    <p className="inline ml30">小区名</p>
                    <Select
                        className="inline"
                        data={this.state.town}
                        value={this.state.currentTown}
                        onChange={this.changeSelect}
                    />
                    <TextField hintText="输入身份证号或者ID号"/>
                    <RaisedButton
                        label="搜索"
                        primary={true}
                        onClick={()=>this.searchById()}
                        className="ml10"
                    />
                    <RaisedButton
                        className="ml100"
                        label="删除"
                        disabled={edit}
                    />
                    <RaisedButton
                        className="ml10"
                        label="编辑"
                        disabled={edit}
                    />
                    <IconMenu
                        iconButtonElement={<IconButton
                            style={{position: 'relative', top: '5px'}}><MoreVertIcon/></IconButton>}
                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        className="ml10"
                    >
                        <MenuItem primaryText="增加小区" onClick={() => this.addUser()} leftIcon={<ContentAdd/>}/>
                        <MenuItem primaryText="导出Excel" leftIcon={<Download/>}/>
                    </IconMenu>
                    <MyTable
                        height="600px"
                        tableHeader={tableHead}
                        tableData={this.state.data}
                        onClickCell={this.getCell.bind(this)}
                    />
                </Paper>
            </div>
        )
    }
}

export  default UserPage