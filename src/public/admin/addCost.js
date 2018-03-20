/**
 *
 * @fanz
 */

import React from 'react';
import {Divider, RaisedButton, TextField} from "material-ui";
import $ from 'jquery'
import {Local} from "../../common/utils";

class AddCost extends React.Component {

    constructor(props){
        super(props);
        this.state={
            id:'',
            name:''
        }
    }

    addCost(){

    }

    setId = (e,v)=>{
        this.setState({
            id:v
        })
        if(v.length>=5){
            this.getName(v)
        }
    };

    getName(v){
        $.get(Local+'/getId',v)
            .then(res=>this.setState({name:res.data}))
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
                />
                <TextField
                    className="inline ml30 mt5"
                    hintText="本月水费"
                    style={{width: '100px'}}
                />
                <RaisedButton
                    label="继续添加"
                    className="mt30"
                    primary={true}
                    fullWidth={true}
                    onClick={this.addCost}
                />
            </div>
        )
    }
}

export default AddCost;