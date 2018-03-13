/**
 *
 * @fanz
 */

import * as React from "react";
import $ from 'jquery'
import _ from 'lodash'
import {Checkbox, Dialog, IconButton, IconMenu, MenuItem, Paper, TextField, Toggle} from "material-ui";
import ContentAdd from 'material-ui/svg-icons/content/add';
import Download from 'material-ui/svg-icons/file/file-download';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MyTable from "../../common/table";
import RaisedButton from 'material-ui/RaisedButton';
import './admin.css'
import Select from "../../common/select";
import {ALL_VALUE, Local, setStateP} from "../../common/utils";
import {AddTown} from "./addTown";

//管理员水电费管理页面

const tableHead = ['序号', 'Id', '姓名', '小区', '所剩水费', '所剩电费'];


class ManagePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            town: '',
            currentTown: ALL_VALUE,
            dialogOpen: false,
            //query
            isOwe: true,
            findName: '',
            edit:true
        }
    }

    changeSelect = (event, index, value) => {
        this.setState({
            currentTown: value,
        }, () => {
            this.getCost()
        });
    };

    getCost() {
        const {currentTown, isOwe, findName} = this.state;
        let query = {currentTown, isOwe, findName};
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

    searchByName() {
        this.setState({findName: $('#search_text').val()}, () => {
            this.getCost()
        })
    }

    changeCheck() {
        this.setState({isOwe: !this.state.isOwe}, () => {
            this.getCost()
        });
    }

    handleClose = () => {
        this.setState({dialogOpen: false})
    };

    addTown() {
        this.setState({dialogOpen: true})
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
                        <Dialog
                            title="添加小区"
                            open={this.state.dialogOpen}
                            onRequestClose={this.handleClose}
                        >
                            <AddTown/>
                        </Dialog>
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
                            onClick={() => this.changeCheck()}
                            style={{width: '130px', display: 'inline-block', position: 'relative', top: '10px'}}
                        />

                        <TextField
                            hintText="输入姓名进行搜索..."
                            id="search_text"
                            className="search_text"
                        />

                        <RaisedButton label="搜索"
                                      primary={true}
                                      onClick={() => this.searchByName()}
                        />

                        <RaisedButton label="编辑"
                                      className="ml100"
                                      disabled={this.state.edit}
                        />

                        <IconMenu
                            iconButtonElement={<IconButton
                                style={{position: 'relative', top: '5px'}}><MoreVertIcon/></IconButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            className="ml10"
                        >
                            <MenuItem primaryText="增加小区" onClick={() => this.addTown()} leftIcon={<ContentAdd/>}/>
                            <MenuItem primaryText="导出Excel" leftIcon={<Download/>}/>
                        </IconMenu>

                    </div>
                    <MyTable
                        height="600px"
                        tableHeader={tableHead}
                        tableData={this.state.data}
                        className="table"
                    />
                </Paper>
            </div>
        )
    }
}

export default ManagePage