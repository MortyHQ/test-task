import {inject, observer} from "mobx-react";
import React,{Component} from "react";
import styled from "styled-components";
import TableRow from "./TableRow";

const TableContainer = styled.div`
    width: 100%;
    border-left:1px solid;
    border-right:1px solid;
`;

@inject("store") @observer class Table extends Component{

    render() {
        const flag = this.props.flag;
        const store = this.props.store;
        return (
            <TableContainer>
                {((flag)?store.contacts:store.searchResults).map((value, index) => <TableRow key={index} idx={index} value={value}/>)}
            </TableContainer>
        );
    }
}
export default Table;