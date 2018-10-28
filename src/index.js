import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from "mobx-react";
import {ObservableContactsStore} from "./ObservableContactsStore";
import {NewContactForm,EditContactForm} from "./New(Edit)Contact"
import {db} from "./firestore";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './index.css';

const contactstore = new ObservableContactsStore();
const searchstore = new ObservableContactsStore();

class CreationButton extends Component{
    render() {
        return (
                <div className={"creation"}>
                    <div>
                        <Link to={"/new"}>
                            <h3> + </h3>
                        </Link>
                    </div>
                </div>
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
            <div className={"block del"}>
                <button className={"delete"} onClick={() => deleteContact(idx)}>X</button>
            </div>
        );
    }
}

const TableRow = observer(class TableRow extends Component{
    render() {
        const {store, idx} = this.props;


        return (
            <div className={"row clear-fix"}>
                <div className={"block"}>
                    <div>
                    <h5 className={"tooltip"}>
                        <Link to={{
                            pathname: "/edit",
                            state: {
                                idx: idx
                            }}}>
                            {store.contacts[idx].name}
                        </Link>
                        <span className={"tooltip-text"}> click to edit </span>
                    </h5>
                    </div>
                    <div>
                    <h6>{store.contacts[idx].email}</h6>
                    </div>
                </div>
                <DeleteButton store = {store} idx={idx}/>
            </div>
        );
    }
});

class Search extends Component{
    render() {
        const {store, result} = this.props;

        return (
            <div className={"search-box clear-fix"}>
                <div className={"left"}>
                    &#9906;
                </div>
                <input type={"text"} className={"left"} onClick={setupStarter}/>
            </div>
        );

        function setupUpdater(){
            let input=document.getElementsByTagName('input')[0]
                , timeout=null;
            function handleChange(){
                result.contacts.splice(0,result.contacts.length);
                store.contacts.filter(value =>{
                   if ((value.name.indexOf(input.value) >= 0) || (value.email.indexOf(input.value) >= 0)){
                        result.addContacts(value.name,value.email,value.docRefId);
                    }
                    return 0;
                })
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
            <div className={'table'}>
                {store.contacts.map((value, index) => <TableRow key={index} store={store} idx={index}/>)}
                <CreationButton store = {store}/>
            </div>
        );
    }
});

class AddressBook extends Component {
    render() {
        return (
            <div className={"main"}>
                <h4>My Address Book</h4>
                <Search store = {contactstore} result = {searchstore}/>
                <Table store = {contactstore}/>
            </div>
        );
    }
}

class AddressBookSwitch extends Component{
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={"/"} component={AddressBook}/>
                    <Route path={"/edit"} component={EditContactForm}/>
                    <Route path={"/new"} component={NewContactForm}/>
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

ReactDOM.render( <App/>, document.getElementById('root'));

export {
    contactstore,
    App
}

