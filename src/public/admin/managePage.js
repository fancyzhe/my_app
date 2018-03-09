/**
 *
 * @fanz
 */

import * as React from "react";
import $ from 'jquery'
import _ from 'lodash'
import {Checkbox, IconButton, IconMenu, MenuItem, Paper, TextField, Toggle} from "material-ui";
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MyTable from "../../common/table";
import RaisedButton from 'material-ui/RaisedButton';
import './admin.css'
import Select from "../../common/select";
import {Local, setStateP} from "../../common/utils";

//管理员水电费管理页面

const tableHead = ['序号', 'Id', '姓名', '小区', '所剩水费', '所剩电费'];

class ManagePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            town: [],
            currentTown: 1,
            //query
            townName: '',
            isOwe:true,
            findName:''
        }
    }

    changeSelect = (event, index, value) => {
        this.setState({
                currentTown: value,
                townName: this.state.town[value - 1]
            }, (() => {
                this.getCost()
            })
        )

    };

    getCost() {
        const {townName,isOwe,findName} =this.state;
        let query ={townName,isOwe,findName};
        console.log(query);
        $.get(Local + '/getCost', query)
            .then(res => {
                this.setState({
                    data: res.data
                })
            });
    }

    getTown() {
        $.get(Local + '/getTown')
            .then(
                res => {
                    res.data.unshift('全部');
                    this.setState({
                        town: res.data,
                    })
                }
            )
    }

    searchByName(){
        this.setState({findName:$('#search_text').val()},()=>{
            this.getCost()
        })
    }

    changeCheck(){
        this.setState({isOwe:!this.state.isOwe},()=>{
            this.getCost()
        });
    }

    componentDidMount() {
        this.getCost();
        this.getTown();
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <Paper className="paper" zDepth={5} style={{textAlign: 'left'}}>
                    <div className="paper_header">
                        <p>小区名:</p>
                        <Select
                            className="p_select"
                            data={this.state.town}
                            value={this.state.currentTown}
                            onChange={this.changeSelect}

                        />
                        <Checkbox
                            label="是否欠费"
                            className="p_checkbox"
                            checked={this.state.isOwe}
                            onClick={()=>this.changeCheck()}
                            style={{width: '130px', display: 'inline-block', position: 'relative', top: '10px'}}
                        />

                        <TextField
                            hintText="输入姓名进行搜索..."
                            id="search_text"
                            className="search_text"
                        />

                        <RaisedButton label="搜索"
                                      primary={true}
                                      onClick={()=>this.searchByName()}
                        />

                        <IconMenu
                            iconButtonElement={<IconButton
                                style={{position: 'relative', top: '5px'}}><MoreVertIcon/></IconButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            className="ml10"
                        >
                            <MenuItem primaryText="增加小区"/>
                            <MenuItem primaryText="导出Excel"/>
                        </IconMenu>

                    </div>
                    <MyTable
                        height={600}
                        tableHeader={tableHead}
                        tableData={this.state.data}
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