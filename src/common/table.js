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
            showRowHover, displayRowCheckbox, displaySelectAll,
            onClickCell,
        } = this.props;

        return (
            <Table
                height={height}
                selectable={selectable}
                fixedHeader={fixedHeader}
                fixedFooter={fixedFooter}
                multiSelectable={multiSelectable}
                className="table_df"
                onRowSelection={onClickCell}
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
                                <TableRow>
                                    {
                                        <TableRowColumn className="tab_item" >
                                            {index + 1}
                                        </TableRowColumn>
                                    }
                                    {
                                        _.map(x, item => <TableRowColumn tooltip={item}>
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