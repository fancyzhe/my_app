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
    }

    render() {

        const {
            tableHeader, tableData, selectable, height,
            fixedHeader, fixedFooter, multiSelectable,
            showRowHover, displayRowCheckbox, className, displaySelectAll
        } = this.props;

        return (
            <Table
                height={height}
                selectable={selectable}
                fixedHeader={fixedHeader}
                fixedFooter={fixedFooter}
                multiSelectable={multiSelectable}
                className="table_df"
            >

                <TableHeader
                    displaySelectAll={displaySelectAll}
                    className="header">
                    <TableRow>
                        {
                            _.map(tableHeader, item => {
                                return (
                                    <TableHeaderColumn tooltip={item}>
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
                                <TableRow className="tab_item">
                                    {
                                        <TableRowColumn className="tab_item">
                                            {index + 1}
                                        </TableRowColumn>
                                    }
                                    {
                                        _.map(x, item => <TableHeaderColumn>
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