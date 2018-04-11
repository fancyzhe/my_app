/**
 *
 * @fanz

 */
import React from "react";
import {RaisedButton, Snackbar, TextField} from "material-ui";
import {ALL_VALUE, Local} from "../../../common/utils";
import $ from 'jquery';
import _ from 'lodash';
import Select from "../../../common/select";

export default class AddMsg extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            open: false,
            town: [],
            currentTown: ALL_VALUE,
            adminTown: {
                display: 'none'
            },
            query:{
                town:''
            }
        }
    };

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

    submitMsg() {
        const {id,name} = sessionStorage;
        const townName = sessionStorage.townName || this.state.query.town;
        $.post(Local + '/addMsg',
            {
                text:this.state.text,
                townName,id,name
            }
        ).then(
            res=>{
                if(res){
                    this.setState({open:true})
                }
            }
        )
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

    setMsg = (e, v) => {
        this.setState({
            text: v
        })
    };

    componentDidMount(){
        sessionStorage.townName==='null' && this.setState({adminTown:{display: 'inline-block'}});
        this.getTown()
    }

    render() {
        return (
            <div className="ml30" style={{height:'150px'}}>
                <Snackbar
                    open={this.state.open}
                    message="发布成功！"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
                <div>
                    <TextField
                        floatingLabelText="公告内容..."
                        multiLine={true}
                        rows={2}
                        onChange={this.setMsg.bind(this)}
                    />
                    <div style={this.state.adminTown}>
                        <p className="inline ml30">小区名</p>
                        <Select
                            className="inline"
                            data={this.state.town}
                            value={this.state.currentTown}
                            onChange={this.changeSelect}
                        />
                    </div>
                </div>
                <br/>
                <RaisedButton
                    label="发布"
                    style={{position: 'absolute', bottom: '6px'}}
                    primary={true}
                    onClick={this.submitMsg.bind(this)}
                />
            </div>
        )
    }
}