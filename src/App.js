import React, {Component} from 'react';
import {observer} from "mobx-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import {NewContactForm} from "./NewContact";
import EditContactForm from "./EditContact";
import {db} from "./firestore";
import ObservableContactsStore from "./ObservableContactsStore";


const contactstore = new ObservableContactsStore();
const searchstore = new ObservableContactsStore();





const Create = styled.div`
        cursor: pointer;
        text-align: center;
        border: 1px solid;
`;
const ClearFix = styled.div`
    &:before,&:after{
     content: " ";
     display: table;
     }
     &:after{
     clear: both;
     }
`;
const Row = styled.div`
    border: 1px solid;
    padding: 5px;
    &:first-child{
    border-bottom: none;
    }
    &:nth-child(n+3){
    border-top: none;
    }
    &:last-child{
    border-bottom: none;
    }
    &:nth-child(2n){
    background-color: lightgray;    
    }
`;
const SearchBox = styled.div`
    margin-bottom: 10px;
    border: 1px solid;
    width: 600px;
    font: bold 22px 'Arial';
`;
const SearchInput = styled.input`
        width: 587.437px;
        height: 29.6px;
        float: left;
`;
const Magnifire = styled.div`
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        float:left;
`;
const TableContainer = styled.div`
    width: 600px;
    
`;
const Main = styled.div`
    width: 600px;
    margin: 50px auto;
    
    > h4 {
        font: bold 22px 'Arial';
        margin-bottom: 10px;
        text-align: center;
    }
`;
const Delete = styled.div`
    position: relative;
    left: 560px;
    top: -20px;
`;
const DeleteBtn = styled.button`
    background: none;
    cursor: pointer;
`;
const Name = styled.h5`
    position: relative;
    display: inline-block;
    border-bottom: 2px dotted black;
    font: bold 16px 'Arial';
    > span {
        visibility: hidden;
        color: black;
        width: 90px;
        background: white;
        text-align: center;
        border-radius: 6px;
        padding: 5px;
        border: 1px solid black;
        position: absolute;
        z-index: 1;
        top: -10px;
        left: 110%;
    }
    &:hover > span {
        visibility: visible;
        font: 14px 'Arial';
    }
`;
const Email = styled.h6`
        font: 14px 'Arial';
`;
const Contact = styled.div`
    float:left;
`;
const StyledLink = styled(Link)`
    text-decoration:none;
    color: black;
`;



class CreationButton extends Component{
    render() {
        return (
            <Create>
                <div>
                    <StyledLink to={"/test-task/new"}>
                        <h3> + </h3>
                    </StyledLink>
                </div>
            </Create>
        );
    }
}

class DeleteButton extends Component {
    render() {
        const {store, idx} = this.props;
        const docRefId = store.contacts[idx].docRefId;

        function deleteContact(idx) {
            store.contacts.splice(idx, 1);
            db.collection("contacts").doc(docRefId).delete();
        }

        return (
            <Delete>
                <DeleteBtn onClick={() => deleteContact(idx)}>X</DeleteBtn>
            </Delete>
        );
    }
}

const TableRow = observer(class TableRow extends Component{
    render() {
        const {store, idx} = this.props;


        return (
            <Row>
                <ClearFix>
                <Contact>
                    <div>
                        <Name>
                            <StyledLink to={{
                                pathname: "/test-task/edit",
                                state: {
                                    idx: idx
                                }}}>
                                {store.contacts[idx].name}
                            </StyledLink>
                            <span> click to edit </span>
                        </Name>
                    </div>
                    <div>
                        <Email>{store.contacts[idx].email}</Email>
                    </div>
                </Contact>
                </ClearFix>
                <DeleteButton store = {store} idx={idx}/>
            </Row>
        );
    }
});

class Search extends Component{
    render() {
       let lookFor =  this.props.lookFor;
        return (
            <SearchBox>
                <ClearFix>
                <Magnifire className={"left"}>
                    &#9906;
                </Magnifire>
                <SearchInput type={"text"} onClick={setupStarter} placeholder={'Search'}/>
                </ClearFix>
            </SearchBox>
        );

        function setupUpdater(){
            let input = document.getElementsByTagName('input')[0], timeout=null;
            function handleChange(){
                lookFor(input.value);
            }
            function eventHandler(){
                if(timeout) clearTimeout(timeout);
                timeout = setTimeout(handleChange, 500);
            }
            input.onkeyup = eventHandler;
        }
        function setupStarter() {
            setupUpdater();
            document.getElementsByTagName('input')[0].focus();
        }
    }
}

const Table = observer(class Table extends Component{

    render() {

        const store = this.props.store;
        return (
            <TableContainer>
                {store.contacts.map((value, index) => <TableRow key={index} store={store} idx={index}/>)}
            </TableContainer>
        );
    }
});

const AddressBook = observer(class AddressBook extends Component {

    state = {
        lookingFor : ""
    };

    lookFor = (value) => {
        this.setState({
            lookingFor : value
        });
        searchstore.contacts = contactstore.contacts.filter((contact) => {
            return contact.name.indexOf(this.state.lookingFor) > -1 || contact.email.indexOf(this.state.lookingFor) > -1

        });

    };


    render() {

        return (
            <Main>
                    <h4>My Address Book</h4>
                    <Search lookFor={this.lookFor}/>
                    <Table store = {(this.state.lookingFor !== "")?searchstore:contactstore}/>
                    <CreationButton store = {contactstore}/>
            </Main>
        );
    }
});

class AddressBookSwitch extends Component{
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={"/test-task/"} component={AddressBook}/>
                    <Route key={1} path={"/test-task/edit"} component={EditContactForm}/>
                    <Route key={2} path={"/test-task/new"} component={NewContactForm}/>
                </Switch>
            </div>
        );
    }
}

class App extends Component{
    render() {
        return (
            <Router>
                <Route component={AddressBookSwitch}/>
            </Router>
        );
    }
}

export default App;
export {
    contactstore,
    Main,
};
