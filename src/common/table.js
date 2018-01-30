/**
 *
 * @fanz
 */

import _ from 'lodash'
import React from 'react';
import {Table} from 'material-ui/Table'
import {TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table/index";

const tableData = [
    {
        name: 'John Smith',
        status: 'Employed',
    },
    {
        name: 'Randal White',
        status: 'Unemployed',
    },
    {
        name: 'Stephanie Sanders',
        status: 'Employed',
    },
    {
        name: 'Steve Brown',
        status: 'Employed',
    },
    {
        name: 'Joyce Whitten',
        status: 'Employed',
    },
    {
        name: 'Samuel Roberts',
        status: 'Employed',
    },
    {
        name: 'Adam Moore',
        status: 'Employed',
    },
];

const tableHead = ['id', 'name', 'status'];


class Table extends React.Component {
    render() {
        return (
            <Table>

                <TableHeader>
                    {
                        _.map(tableHead, item => {
                            <TableHeaderColumn>
                                {item}
                            </TableHeaderColumn>
                        })
                    }
                </TableHeader>
                <TableBody>
                    {
                        _.map(tableData, item => {
                            return (
                                <TableRow>
                                    {
                                        _.map(item, (index, x) => <TableRowColumn>
                                            {
                                                x[index]
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

export default Table