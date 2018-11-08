import {inject, observer} from "mobx-react";
import React,{Component} from "react";
import styled from "styled-components";
import TableRow from "./TableRow";

const TableContainer = styled.div`
    width: 100%;
    border-left:1px solid;
    border-right:1px solid;
`;

const Table = inject("store")(observer(class Table extends Component{

    render() {

        const store = this.props.store;
        return (
            <TableContainer>
                {store.contacts.map((value, index) => <TableRow key={index} idx={index}/>)}
            </TableContainer>
        );
    }
}));
export default Table;