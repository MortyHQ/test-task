import {inject, observer} from "mobx-react";
import React,{Component} from "react";
import styled from "styled-components";
import TableRow from "./TableRow";

const TableContainer = styled.div`
    width: 100%;
    border-left:1px solid;
    border-right:1px solid;
`;

export default
@inject("contactsStore")
@observer
class Table extends Component{

    render() {
        const contactsStore = this.props.contactsStore;
        return (
            <TableContainer>
                {((contactsStore.searchText)?contactsStore.contacts:contactsStore.searchResults).map((value, index) => <TableRow key={index} idx={index} value={value}/>)}
            </TableContainer>
        );
    }
}
