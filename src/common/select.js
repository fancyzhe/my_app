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

    render() {

        const {data, className,value,onChange} = this.props;

        const maxHeight = 200;

        return (
            <div className={className}>
                <DropDownMenu
                    value={value}
                    onChange={onChange}
                    labelStyle={{'overflow':'visible'}}
                    maxHeight={maxHeight}
                >
                    {
                        _.map(data, (x,index) => {
                            return (
                                <MenuItem
                                    key={index}
                                    primaryText={x.name}
                                    value={x.id}
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