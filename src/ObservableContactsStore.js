import * as mobx from "mobx";
import {observable, decorate} from "mobx";

export  class ObservableContactsStore {
    contacts = [];

    constructor() {
        mobx.autorun(() => {
            this.addContacts("Superman","super-man@dc.com");
            this.addContacts("Batman ","bat.man@dc.com");
            this.addContacts("Gamora","gamora-the-guard@marvel.com");
        })
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