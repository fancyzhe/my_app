/**
 *
 * @fanz
 */

import _ from 'lodash'
import React from 'react';
import {Table} from 'material-ui/Table'
import {TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table/index";
import './css/base.css'


class myTable extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            selected:false
        }
    }

    onRowSelection(e){
        this.props.onClickCell(e);
        this.setState({
            selected:e[0]
        })
    }


    render() {

        const {
            tableHeader, tableData, selectable, height,
            fixedHeader, fixedFooter, multiSelectable,
            showRowHover, displayRowCheckbox, displaySelectAll,
        } = this.props;

        return (
            <Table
                height={height}
                selectable={selectable}
                fixedHeader={fixedHeader}
                fixedFooter={fixedFooter}
                multiSelectable={multiSelectable}
                className="table_df"
                onRowSelection={this.onRowSelection.bind(this)}
            >

                <TableHeader
                    displaySelectAll={displaySelectAll}
                    className="header">
                    <TableRow>
                        {
                            _.map(tableHeader, item => {
                                return (
                                    <TableHeaderColumn key={item}>
                                        {
                                            item
                                        }
                                    </TableHeaderColumn>
                                )
                            })
                        }
                    </TableRow>
                </TableHeader>
                <TableBody
                    showRowHover={showRowHover}
                    displayRowCheckbox={displayRowCheckbox}
                >
                    {
                        _.map(tableData, (x, index) => {
                            return (
                                <TableRow key={index} selected={index===this.state.selected}>
                                    {
                                        <TableRowColumn className="tab_item" key={index}>
                                            {index + 1}
                                        </TableRowColumn>
                                    }
                                    {
                                        _.map(x, item => <TableRowColumn tooltip={item} key={index} style={{textOverflow:'auto'}}>
                                            {
                                                item
                                            }
                                        </TableRowColumn>)
                                    }
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        )
    }
}

export default myTable