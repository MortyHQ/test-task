import * as mobx from "mobx";
import {observable, decorate} from "mobx";

export  class ObservableContactsStore {
    contacts = [];

    constructor() {
        mobx.autorun(() => console.log("success")/*this.addContacts("Superman","super-man@dc.com")*/)
    }

    addContacts(name,email){
        this.contacts.push({
            name: name,
            email: email
        })
    }
}
decorate(ObservableContactsStore,{
    contacts:observable
});