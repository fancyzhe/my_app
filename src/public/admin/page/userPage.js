/**
 *
 * @fanz
 */

import React from "react";
import {Dialog, IconButton, IconMenu, MenuItem, Paper, RaisedButton, TextField} from "material-ui";
import ContentAdd from 'material-ui/svg-icons/content/add';
import Download from 'material-ui/svg-icons/file/file-download';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import '../admin.css'
import MyTable from "../../../common/table";
import {ALL_VALUE, cleanParams, Local} from "../../../common/utils";
import $ from 'jquery';
import _ from 'lodash';
import Select from "../../../common/select";
import {AddUser} from "../dialog/addUser";
import Pagination from "../../../common/pagination";

//管理员居民信息管理界面

const tableHead = ['序号', 'ID', '姓名', '性别', '电话', '身份证号', '小区', '楼栋', '房间号'];

class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            town: [],
            currentTown: ALL_VALUE,
            edit: true,
            dialog: false,
            total: 0,
            e: '',
            adminTown: {
                display: 'none'
            },
            dir: '',
            query: {
                search: '',
                page: 1,
                town: ''
            }
        }
    }

    getUser() {
        $.get(Local + '/getUser', cleanParams(this.state.query))
            .then(res => {
                this.setState({
                    data: res.data,
                    total: res.total
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

    getMax() {
        $.get(Local + '/getMax', {id: sessionStorage.id})
            .then(
                res => {
                    this.setState({
                        max: res.data[0].max,
                        dir: res.data[0],
                    })
                }
            )
            .then(() => {
                this.state.max == 0 && this.getTown();
                if (this.state.max == 0) {
                    this.setState({
                        adminTown: {
                            display: 'inline-block'
                        },
                        query: _.merge(this.state.query, {
                            town: this.state.dir.townName
                        })
                    })
                } else {
                    this.setState({
                        query: _.merge(this.state.query, {
                            town: this.state.dir.townName
                        })
                    })
                }
                sessionStorage.townName = this.state.dir.townName
            })
            .then(() => {
                this.getUser()
            })
    }

    changeSelect = (event, index, value) => {
        let town;
        _.map(this.state.town, item => {
            if (item.id === value) {
                town = item.name
            }
        });
        this.setState({
            currentTown: value,
            query: _.merge(this.state.query, {
                town
            })
        }, () => {
            this.getUser()
        });
    };

    getCell = (e) => {
        console.log(e[0]);
        if (e[0] + 1) {
            this.setState({
                edit: false
            })
        } else this.setState({
            edit: true
        })
    };

    changePage(page) {
        this.setState(_.merge(this.state.query, {page}), () => {
            this.getUser()
        });
    }

    searchById() {
        this.setState({search: $('#search')})
    }

    componentDidMount() {
        this.getMax();
    }


    addUser() {
        this.setState({dialog: true})
    }

    handleClose = () => {
        this.setState({dialog: false})
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.dialog}
                    title="添加用户"
                    onRequestClose={this.handleClose}
                >
                    <AddUser/>
                </Dialog>
                <div style={this.state.adminTown}>
                    <p className="inline ml30">小区名</p>
                    <Select
                        className="inline"
                        data={this.state.town}
                        value={this.state.currentTown}
                        onChange={this.changeSelect}
                    />
                </div>
                <TextField hintText="输入身份证号或者ID号" className="ml30" id="search"/>
                <RaisedButton
                    label="搜索"
                    primary={true}
                    onClick={() => this.searchById()}
                    className="ml10"
                />
                <RaisedButton
                    className="ml100"
                    label="删除"
                    disabled={this.state.edit}
                />
                <RaisedButton
                    className="ml10"
                    label="编辑"
                    disabled={this.state.edit}
                />
                <IconMenu
                    iconButtonElement={<IconButton
                        style={{position: 'relative', top: '5px'}}><MoreVertIcon/></IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    className="ml10"
                >
                    <MenuItem primaryText="增加用户" onClick={() => this.addUser()} leftIcon={<ContentAdd/>}/>
                    <MenuItem primaryText="导出Excel" leftIcon={<Download/>}/>
                </IconMenu>
                <MyTable
                    tableHeader={tableHead}
                    tableData={this.state.data}
                    onClickCell={this.getCell.bind(this)}
                />
                <Pagination
                    total={this.state.total}
                    onChange={this.changePage.bind(this)}
                />
            </div>
        )
    }
}

export default UserPage