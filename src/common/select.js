/**
 *
 * @fanz
 */
import _ from 'lodash'
import React from "react";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import './css/base.css'


class Select extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
    }

    handleChange = (event, index, value) => this.setState({value});

    render() {

        const {data, className,onChange} = this.props;

        const {value} = this.state;

        return (
            <div className={className}>
                <DropDownMenu value={value} onChange={()=>this.handleChange().then(onChange)} labelStyle={{'overflow':'visible'}}>
                    {
                        _.map(data, (x, index) => {
                            return (
                                <MenuItem
                                    primaryText={x}
                                    value={index + 1}
                                />
                            )
                        })
                    }

                </DropDownMenu>
            </div>
        )
    }
}

export default Select