/**
 *
 * @fanz
 */
import React from 'react'
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {TextField} from "material-ui";
import Select from "../../../common/select";
import $ from "jquery";
import _ from "lodash"
import {ALL_VALUE, Local} from "../../../common/utils";

const sex = [
    {
        id:'男',
        name:'男'
    },{
        id:'女',
        name:'女'
    }
];

export class AddUser extends React.Component {
    state = {
        finished: false,
        stepIndex: 0,
        label: '下一步',
        currentProCity: '',
        currentTown: ALL_VALUE,
        pro: [],
        city: [],
        town: [],
        add: {
            adminId:sessionStorage.id,
            adminName:sessionStorage.name,
            id: '',
            name: '',
            sex:'男',
            phone:'',
            IDcard: '',
            Provice: '',
            city: '',
            town: '',
            loudong: '',
            room: '',
            water: '',
            manage: '',
        }
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        }, () => {
            switch (stepIndex) {
                case 1:
                    this.setState({label: "下一步"});
                    break;
                case 2:
                    this.setState({
                        label: "继续添加",
                    });
                    break;
            }
        });
        if (stepIndex === 2) {
            this.addUser();
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }

    };

    changeSelect = (event, index, value) => {
        if(value !== ALL_VALUE){
            this.setState({
                currentTown: value,
                add: _.merge(this.state.add,{
                    town: value
                })
            }, () => {
                this.getAddressByTown();
            });
        }else {
            this.setState({
                currentTown: value,
                currentProCity:''
            })
        }
    };

    changeSex = (e,i,v)=>{
        this.setState({
            add: _.merge(this.state.add,{
                sex: v
            })
        })
    };

    getAddressByTown() {
        $.get(Local + '/getAddressByTown', {id: this.state.currentTown})
            .then(
                res => {
                    const {townPro, townCity, townAddress} = res.data[0];
                    let currentProCity = townPro + townCity + townAddress;
                    this.setState({
                        currentProCity,
                        add: _.merge(this.state.add, {
                            Provice: townPro,
                            city: townCity
                        })
                    })
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

    getUserId() {
        $.get(Local + '/getUserId')
            .then(res => {
                this.setState({
                    add: _.merge(this.state.add, {id: parseInt(res.id) + 1})
                })
            })
    }

    addUser() {
        $.post(Local + '/addUser', this.state.add)
    }

    setName = (e, v) => {
        this.setState({
            add: _.merge(this.state.add, {
                name: v
            })
        });
    };
    setPhone=(e, v) => {
        this.setState({
            add: _.merge(this.state.add, {
                phone: v
            })
        })
    };

    setIDcard = (e, v) => {
        this.setState({
            add: _.merge(this.state.add, {
                IDcard: v
            })
        })
    };

    setLoudong = (e, v) => {
        this.setState({
            add: _.merge(this.state.add, {
                loudong: v
            })
        })
    };

    setRoom = (e, v) => {
        this.setState({
            add: _.merge(this.state.add, {
                room: v
            })
        })
    };

    setWater = (e, v) => {
        this.setState({
            add: _.merge(this.state.add, {
                water: v
            })

        })
    };

    setManage = (e, v) => {
        this.setState({
            add: _.merge(this.state.add, {
                manage: v
            })
        })
    };

    componentDidMount() {
        console.log(this.props);
        this.getUserId();
        this.getTown();
    }

    renderStepActions(step) {
        const {stepIndex} = this.state;

        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    label={this.state.label}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onClick={this.handleNext}
                    style={{marginRight: 12}}
                />
                {step > 0 && step<2 && (
                    <FlatButton
                        label="上一步"
                        disabled={stepIndex === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onClick={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    render() {
        const {stepIndex} = this.state;
        const {name,IDcard,loudong,room,water,manage,phone} =this.state.add;

        return (
            <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>具体信息</StepLabel>
                        <StepContent>
                            <p>姓名</p>
                            <TextField
                                hintText="例：张三"
                                onChange={this.setName}
                                value={name}
                            />
                            <p>身份证号</p>
                            <TextField
                                hintText="例：421182XXXXXX"
                                onChange={this.setIDcard}
                                value={IDcard}
                            />
                            <p className="inline">电话号码</p>
                            <p className="inline ml50">性别</p>
                            <br/>
                            <TextField
                                hintText="例：1834080XXXX"
                                onChange={this.setPhone}
                                value={phone}
                                className="w100 block"
                            />
                            <Select
                                className='inline ml10'
                                data={sex}
                                value={this.state.add.sex}
                                onChange={this.changeSex}
                            />
                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>住址</StepLabel>
                        <StepContent>
                            <p className="inline">小区</p>
                            <Select
                                className="inline"
                                data={this.state.town}
                                value={this.state.currentTown}
                                onChange={this.changeSelect}
                            />
                            <TextField
                                disabled={true}
                                value={this.state.currentProCity}
                            />
                            <TextField
                                floatingLabelText="楼栋"
                                hintText="例：9栋"
                                style={{width: '100px'}}
                                onChange={this.setLoudong}
                                value={loudong}
                            />
                            <TextField
                                floatingLabelText="房间号"
                                hintText="例：408"
                                className="inline ml30"
                                style={{width: '100px'}}
                                onChange={this.setRoom}
                                value={room}
                            />
                            {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>生成ID号和开户充值</StepLabel>
                        <StepContent>
                            <p className="inline">生成的ID号（初始密码为123456）</p>
                            <TextField
                                disabled={true}
                                value={this.state.add.id}
                            />
                            <TextField
                                floatingLabelText="水费"
                                hintText="例：100"
                                style={{width: '100px'}}
                                onChange={this.setWater}
                                value={water}
                            />
                            <TextField
                                floatingLabelText="电费"
                                hintText="例：100"
                                className="inline ml30"
                                style={{width: '100px'}}
                                onChange={this.setManage}
                                value={manage}
                            />
                            {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                </Stepper>
                {this.state.stepIndex>2 && this.renderStepActions(3)}
            </div>
        );
    }
}