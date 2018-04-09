/**
 *
 * @fanz
 */
import React from 'react'
import MyTable from '../../../common/table'
import Pagination from "../../../common/pagination";
export default class CostLog extends React.Component{
    state={};
    render(){
        return(
            <div>
                <MyTable
                    selectable={false}
                />
                <Pagination/>
            </div>
        )
    }
}