import React,{Component} from "react";
import {Route, Switch} from "react-router-dom";
import {EditContactForm, NewContactForm} from "./ContactForm";
import AddressBook from "./AddressBook";


export default class AddressBookSwitch extends Component{
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