/**
 *
 * @fanz
 */

import React from 'react';
import {Divider, RaisedButton, TextField} from "material-ui";
import $ from 'jquery'
import {Local} from "../../../common/utils";

class AddCost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: ''
        }
    }

    addCost() {

        const {id,water,manage,name}=this.state;
        $.post(Local + '/addCost', {id,name,adminId:sessionStorage.id,adminName:sessionStorage.name,water,manage})
    }

    setId = (e, v) => {
        this.setState({
            id: v
        });
        if (v.length >= 5) {
            this.getName(v)
        }
    };

    setWater = (e,v)=>{
        this.setState({
            water:v
        })
    };

    setManage = (e,v)=>{
        this.setState({
            manage:v
        })
    };

    getName(v) {
        $.get(Local + '/getId', {id: v})
            .then(res => {
                this.setState({name: res.name})})
    }

    componentDidMount(){
        console.log(sessionStorage);
    }

    render() {
        return (
            <div style={{width: '250px', margin: '0 auto'}}>
                <TextField
                    hintText="用户ID"
                    onChange={this.setId}
                    value={this.state.id}
                />
                用户姓名：
                <TextField
                    disabled={true}
                    className="mt5"
                    value={this.state.name}
                />
                <Divider/>
                <TextField
                    hintText="本月电费"
                    style={{width: '100px'}}
                    className="mt5"
                    onChange={this.setWater}
                />
                <TextField
                    className="inline ml30 mt5"
                    hintText="本月水费"
                    onChange={this.setManage}
                    style={{width: '100px'}}
                />
                <RaisedButton
                    label="添加"
                    className="mt30"
                    disabled={this.state.name === '' ? true : false}
                    primary={true}
                    fullWidth={true}
                    onClick={this.addCost.bind(this)}
                />
            </div>
        )
    }
}

export default AddCost;