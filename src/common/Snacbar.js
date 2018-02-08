/**
 *
 * @fanz
 */

import Snackbar from 'material-ui/Snackbar';
import React from "react";
import {MuiThemeProvider} from "material-ui";

//页面下方提示框

class Sbar extends React.Component{

    constructor(props){
        super(props);
        this.state={
            open:true
        };
    }

    handleRequestClose = () => {
        this.setState({
            open:false
        })
    };

    render(){

        console.log(this.state);

        return(
            <div>
                <MuiThemeProvider>
                    <Snackbar
                        open={this.state.open}
                        message={this.props.text}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    />
                </MuiThemeProvider>
            </div>
        )
    }

}

export default Sbar