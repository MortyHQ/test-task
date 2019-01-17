import {inject, observer} from "mobx-react";
import React,{Component}    from "react";
import styled from "styled-components";
import CreationButton from "./CreationButton";
import Search from "./Search";
import Table from "./Table";
import {GetContacts} from "./firestore";


const Main = styled.div`
    width: 50%;
    margin: 3% auto;
    > h4 {
        font: bold 22px 'Arial';
        margin-bottom: 10px;
        text-align: left;
    }
    @media (max-width: 720px){
        width: 250px
    }
    @media (min-width: 1280px){
        width: 640px
    }
`;


@inject("contactsStore") @observer class AddressBook extends Component {
    constructor(props){
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount(){
        GetContacts();
    }

    handleSearch(event){
        this.props.contactsStore.setSearchText(event.target.value);
    }

    render() {

        return (
            <Main>
                <h4>My Address Book</h4>
                <Search onChange={this.handleSearch}/>
                    <Table f/>
                <CreationButton/>
            </Main>
        );
    }
}
export default AddressBook;