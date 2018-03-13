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
import Select from "../../common/select";
import $ from "jquery";
import {ALL_VALUE, Local} from "../../common/utils";

export class AddUser extends React.Component {
    state = {
        finished: false,
        stepIndex: 0,
        label:'下一步',
        currentPro:1,
        currentCity:'',
        currentTown:ALL_VALUE,
        pro:[],
        city:[],
        town:[],


    };

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
        switch (stepIndex){
            case 0:
                this.setState({label:"下一步"});
                this.getCity();
                this.getPro();
                this.getTown();
                break;
            case 1:
                this.setState({label:"完成"});
                break;
            case 2:
                this.setState({label:"继续添加"});
                break;
            case 3:
                this.setState({stepIndex:0,finished:false});
                break;
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    changeSelect = (event, index, value) => {
        this.setState({currentTown: value,});
    };

    changePro = (event, index, value) => {
        this.setState({currentPro: value}, this.getCity);
    };

    changeCity = (event, index, value) => {
        this.setState({currentCity: value})
    };

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

    componentDidMount(){
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
                {step > 0 && (
                    <FlatButton
                        label="上一步"
                        disabled={stepIndex === 0 || stepIndex ===2}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onClick={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    render() {
        const {finished, stepIndex} = this.state;

        return (
            <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>姓名和身份证号</StepLabel>
                        <StepContent>
                            <p>姓名</p>
                            <TextField
                                hintText="例：张三"
                            />
                            <p>身份证号</p>
                            <TextField
                                hintText="例：421182XXXXXX"
                            />
                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>住址</StepLabel>
                        <StepContent>
                            <p className="inline ">省</p>
                            <Select
                                className="inline"
                                data={this.state.pro}
                                value={this.state.currentPro}
                                onChange={this.changePro}
                            />
                            <p className="inline">市</p>
                            <Select
                                className="inline"
                                data={this.state.city}
                                value={this.state.currentCity}
                                onChange={this.changeCity}
                            />
                            <p className="inline">小区</p>
                            <Select
                                className="inline"
                                data={this.state.town}
                                value={this.state.currentTown}
                                onChange={this.changeSelect}
                            />
                            {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>生成ID号和开户充值</StepLabel>
                        <StepContent>
                            <p className="inline">生成的ID号</p>
                            <TextField
                                disabled={true}
                            />
                            {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                </Stepper>
                {finished && (
                    <p style={{margin: '20px 0', textAlign: 'center'}}>
                        <a
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();
                                this.setState({stepIndex: 0, finished: false});
                            }}
                        >
                            Click here
                        </a> to reset the example.
                    </p>
                )}
            </div>
        );
    }
}