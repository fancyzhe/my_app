/**
 *
 * @fanz
 */

import React from 'react'
import {Step, Stepper, StepLabel} from 'material-ui/Stepper'
import {FlatButton, RaisedButton, TextField} from "material-ui";
import Select from "../../common/select";
import $ from 'jquery'
import _ from 'lodash'
import {Local} from "../../common/utils";

export class AddTown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0,
            pro: [],
            city: [],
            proName: [],
            proId: [],
            currentPro: 1,
            currentCity: '',
            townId: '',
            label:'下一步',
            address:'',
            townName:''
        }
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        }, () => {
            if (this.state.finished) {
                this.addTown()
            }
        });
        this.getTownId();

        switch (stepIndex){
            case 0:this.setState({label:'下一步'});break;
            case 1:this.setState({label:'完成'});break;
            case 2:this.setState({label:'继续添加'});break;
            case 3:this.setState({stepIndex:0, finished:false,});break;
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    getTownId() {
        $.get(Local + '/getTownId')
            .then(res => {
                this.setState({townId: parseInt(res.id) + 1})
            })
    }

    getPro() {
        $.get(Local + '/getPro', res => {
            this.setState({pro: res.data})
        });
    }

    getCity() {
        $.get(Local + '/getCity', {pro: this.state.currentPro})
            .then(res => {
                this.setState({
                    city: res.data,
                    currentCity: res.data[0].id
                })
            })
    }

    addTown() {
        console.log(this.state);
        const town = {
            name: this.state.townName,
            id: this.state.townId,
            pro: this.state.currentPro,
            city: this.state.currentCity,
            address: this.state.address
        };
        console.log(town);
        $.post(Local + '/addTown', town)
    }

    setAddress=(e,v)=>{
        this.setState({address:v})
    };

    setTownName = (e,v)=>{
        this.setState({townName:v})
    };

    changePro = (event, index, value) => {
        this.setState({currentPro: value}, this.getCity);
    };

    changeCity = (event, index, value) => {
        this.setState({currentCity: value})
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <div style={{marginLeft: '50px'}}>
                        <TextField hintText="例：万科小区" onChange={this.setTownName}/>
                    </div>
                );
            case 1:
                return (
                    <div style={{marginLeft: '50px'}}>
                        <div>
                            <p className="inline">省份：</p>
                            <Select
                                className="inline"
                                data={this.state.pro}
                                value={this.state.currentPro}
                                onChange={this.changePro}
                            />
                            <p className="inline ml30">城市：</p>
                            <Select
                                className="inline"
                                data={this.state.city}
                                value={this.state.currentCity}
                                onChange={this.changeCity}
                            />
                        </div>
                        <div>
                            <p className="inline">具体地址：</p>
                            <TextField  onChange={this.setAddress}/>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div style={{marginLeft: '50px'}}>
                        <p className="inline">ID号：</p>
                        <TextField disabled={true} hintText={this.state.townId}/>
                    </div>
                );
            default:
                return (
                    <div style={{marginLeft: '50px'}}>
                        <p>添加成功！</p>
                    </div>
                );
        }
    }

    componentDidMount() {
        this.getPro();
        this.getCity();
    }

    render() {
        const {stepIndex} = this.state;
        return (
            <div style={{margin: 'auto'}}>
                <Stepper activeStep={stepIndex}>
                    <Step>
                        <StepLabel>输入小区名</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>选择地址</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>生成小区ID</StepLabel>
                    </Step>
                </Stepper>
                <div>
                    <div>
                        <p>{this.getStepContent(stepIndex)}</p>
                        <div style={{marginTop: 12}}>
                            <FlatButton
                                label="上一步"
                                disabled={stepIndex === 0 || stepIndex ===3}
                                onClick={this.handlePrev}
                                style={{marginRight: 12}}
                            />
                            <RaisedButton
                                label={this.state.label}
                                primary={true}
                                onClick={this.handleNext}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}