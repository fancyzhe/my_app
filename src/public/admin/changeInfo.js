/**
 *
 * @fanz
 */

import React from "react";
import {Divider, TextField} from "material-ui";

class ChangeInfo extends React.Component {

    render() {
        return (
            <div>
                id:
                <TextField
                    disabled={true}
                    name="id"
                    className="w100"
                />
                管理小区:
                <TextField
                    disabled={true}
                    name="town"
                    className="w100 ml10"
                />
                <Divider/>
                姓名：
                <TextField
                    name="name"
                />
                电话：
                <TextField
                    name="phone"
                />
                微信号：
                <TextField
                    name="wecode"
                />
            </div>
        )
    }

}

export default ChangeInfo;