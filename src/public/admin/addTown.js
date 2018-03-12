/**
 *
 * @fanz
 */

import React from 'react'
import {Step, Stepper, StepLabel} from 'material-ui/Stepper'
import {FlatButton, RaisedButton, TextField} from "material-ui";
import Select from "../../common/select";
import $ from 'jquery'
import {Local} from "../../common/utils";

export class AddTown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0,
            pro:[],
            city:[]
        }
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    getPro(){
        $.get(Local+'/getPro',res=>{
            this.setState({pro:res.data})
        })
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <div style={{textAlign: 'center'}}>
                        <TextField hintText="例：万科小区"/>
                    </div>
                );
            case 1:
                return (
                    <div style={{textAlign: 'center'}}>
                        <p className="inline">省份：</p>
                        <Select
                            className="inline"
                            data={this.state.pro}
                        />
                        <p className="inline ml30">城市：</p>
                        <Select
                            className="inline"
                            data={this.state.city}
                        />
                    </div>
                );
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    componentDidMount(){
        this.getPro()
    }

    render() {
        const {finished, stepIndex} = this.state;
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
                                label="Back"
                                disabled={stepIndex === 0}
                                onClick={this.handlePrev}
                                style={{marginRight: 12}}
                            />
                            <RaisedButton
                                label={stepIndex === 2 ? 'Finish' : 'Next'}
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