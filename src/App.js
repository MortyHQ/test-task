import React, {Component} from 'react';
import {observer} from "mobx-react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import NewContactForm from "./NewContact";
import EditContactForm from "./EditContact";
import db from "./firestore";
import ObservableContactsStore from "./ObservableContactsStore";


const contactstore = new ObservableContactsStore();
const searchstore = new ObservableContactsStore();





const Create = styled.div`
        cursor: pointer;
        text-align: center;
        border: 1px solid;
        width: 100%;
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
    border-bottom: 1px solid;
    border-top: 1px solid;
    padding: 0.52%;
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
    height: 40px
`;
const SearchBox = styled.div`
    margin-bottom: 1.4%;
    border: 1px solid;
    width: 100%;
    font: bold 22px 'Arial';   
`;
const SearchInput = styled.input`
        width: 90%;
        height: 29.6px;
        float: left;
        outline: none;
`;
const Magnifire = styled.div`
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
        float:left;
        margin: 0 0.52% 0 2px;
`;
const TableContainer = styled.div`
    width: 100%;
    border-left:1px solid;
    border-right:1px solid;
`;
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
const Delete = styled.div`
    width: fit-content;
    position: relative;
    right: -95%;
    top: -27.5px;
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
const StyledMail = styled.a`
    text-decoration:none;
    color: black;
`;



class CreationButton extends Component{
    render() {
        return (
            <Create>
                <StyledLink to={"/test-task/new"}>
                    <h3> + </h3>
                </StyledLink>
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
                                {(store.contacts[idx].name === "")?"________":store.contacts[idx].name}
                            </StyledLink>
                            <span> click to edit </span>
                        </Name>
                    </div>
                    <div>
                        <Email><StyledMail href={"mailto:"+store.contacts[idx].email}>{store.contacts[idx].email}</StyledMail></Email>
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
                <Switch>
                    <Route exact path={"/test-task/"} component={AddressBook}/>
                    <Route key={1} path={"/test-task/edit"} component={EditContactForm}/>
                    <Route key={2} path={"/test-task/new"} component={NewContactForm}/>
                </Switch>
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
