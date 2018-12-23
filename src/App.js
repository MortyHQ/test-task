import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import styled from "styled-components";
import {ObservableContactsStore} from "./ObservableContactsStore";
import {Provider} from "mobx-react";
import AddressBook from "./AddressBook";
import {EditContactForm, NewContactForm} from "./ContactForm";

const contactstore = new ObservableContactsStore();

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

class App extends Component{
    render() {
        return (
            <Provider store={contactstore}>
                <Router>
                    <Switch>
                        <Route exact path={"/test-task/"} component={AddressBook}/>
                        <Route path={"/test-task/edit"} component={EditContactForm}/>
                        <Route path={"/test-task/new"} component={NewContactForm}/>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
export {
    Main,
    contactstore
};
