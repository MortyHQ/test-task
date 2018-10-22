import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {observer} from "mobx-react";
import {ObservableContactsStore} from "./ObservableContactsStore";
import './index.css';
/*import * as serviceWorker from './serviceWorker';*/

const contactstore = new ObservableContactsStore();

/*const CreationButton = observer(class CreationButton extends Component{
    render() {
        const store = this.props.store;
        return (

        );
    }
});*/
class DeleteButton extends Component{
    render() {
        return (
            <div className={"block del"}>
                <button className={"delete"}>X</button>
            </div>
        );
    }
}

const TableRow = observer(class TableRow extends Component{
    render() {
        const name = this.props.name;
        return (
            <div className={"row clear-fix"}>
                <div className={"block"}>
                    <div>
                    <h5> {name.name} </h5>
                    </div>
                    <div>
                    <h6>  </h6>
                    </div>
                </div>
                <DeleteButton/>
            </div>

        );
    }



});

const Table = observer(class Table extends Component{
    render() {
        const store = this.props.store;
        function test () {
            store.addContacts("superman","super-man@dc.com");
            store.addContacts("superman","super-man@dc.com");
            store.addContacts("superman","super-man@dc.com");
        }
        return (
            <div className={'table'}>
                {
                    store.contacts.map(
                    (name,idx,array) => <TableRow name = {name} key = {idx} arr = {array}/>
                )}
                <div className={"creation"} onClick={test}>
                    +
                </div>
            </div>
        );
    }
});

class Title extends Component {
    render() {
        return (
            <div className={"main"}>
                <h4>My Address Book</h4>
                <Table store = {contactstore}/>
                {/*<button> asfasf </button>*/}
            </div>
        );
    }
}


ReactDOM.render( <Title/>, document.getElementById('root'));

//serviceWorker.unregister();
