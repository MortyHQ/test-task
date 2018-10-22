import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {observer} from "mobx-react";
import {ObservableContactsStore} from "./ObservableContactsStore";
import './index.css';
/*import * as serviceWorker from './serviceWorker';*/

const contactstore = new ObservableContactsStore();

const CreationButton = observer(class CreationButton extends Component{
    render() {
        const store = this.props.store;

        function addNewContact() {
            var newName = prompt("Please enter contact name:", "Harry Potter");
            var newEmail = prompt("Please enter contact email:", "HarryPotter@hogwarts.com");
            store.addContacts(newName,newEmail);
        }

        return (
            <div className={"creation"} onClick={addNewContact}>
                <h3> + </h3>
            </div>
        );
    }
});

const DeleteButton = observer(class DeleteButton extends Component{
    render() {
        const store = this.props.store;
        const key = this.props.key;

        function deleteContact(key) {
            store.contacts.splice(key,1);
        }

        return (
            <div className={"block del"}>
                <button className={"delete"} onClick={() => deleteContact(key)}>X</button>
            </div>
        );
    }
});

const TableRow = observer(class TableRow extends Component{
    render() {
        const contact = this.props.contact;
        const store = this.props.store;
        const key = this.props.key;

        let name = contact[0];
        let email = contact[1];

        function onEdit(){
            name = prompt("Please enter new contact name:", "Name");
            email = prompt("Please enter new contact email:", "Email");
        }

        return (
            <div className={"row clear-fix"}>
                <div className={"block"}>
                    <div>
                    <h5 className={"tooltip"} onClick={ () => onEdit()}>
                        {name}
                        <span className={"tooltip-text"}> click to edit </span>
                    </h5>
                    </div>
                    <div>
                    <h6>{email}</h6>
                    </div>
                </div>
                <DeleteButton store = {store} key={key}/>
            </div>
        );
    }
});

const Table = observer(class Table extends Component{
    render() {
        const store = this.props.store;

        function getContact(value,index) {
            var contact = [value.name,value.email];
            return <TableRow contact = {contact} key = {index} store = {store}/>;
        }

        return (
            <div className={'table'}>
                {store.contacts.map(getContact)}
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
                <Table store = {contactstore}/>
            </div>
        );
    }
}


ReactDOM.render( <AddressBook/>, document.getElementById('root'));

//serviceWorker.unregister();
