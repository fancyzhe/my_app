/**
 *
 * @fanz
 */

import _ from 'lodash'
import React from 'react';
import {Table} from 'material-ui/Table'
import {TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table/index";


class myTable extends React.Component {

    constructor(props){
        super(props);
    }

    render() {

        const {tableHeader,tableData,selectable,height,
            fixedHeader,fixedFooter,multiSelectable,
            showRowHover,displayRowCheckbox,className} = this.props;

        return (
            <Table
                height={height}
                selectable={selectable}
                fixedHeader={fixedHeader}
                fixedFooter={fixedFooter}
                multiSelectable={multiSelectable}
            >

                <TableHeader
                    displaySelectAll={displayRowCheckbox}
                >
                    {
                        _.map(tableHeader, item => {
                            return (
                                <TableHeaderColumn>
                                    {
                                        item
                                    }
                                </TableHeaderColumn>
                            )
                        })
                    }
                </TableHeader>
                <TableBody
                    showRowHover={showRowHover}
                    displayRowCheckbox={displayRowCheckbox}
                >
                    {
                        _.map(tableData, (x,index) => {
                            return (
                                <TableRow>
                                    {
                                        <TableRowColumn>
                                            {index}
                                        </TableRowColumn>
                                    }
                                    {
                                        _.map(x,item=><TableHeaderColumn>
                                            {
                                                item
                                            }
                                        </TableHeaderColumn>)
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