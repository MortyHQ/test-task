import * as mobx from "mobx";
import {observable, decorate} from "mobx";
import {db} from "./firestore";

export  class ObservableContactsStore {
    contacts = [];

    constructor() {
        mobx.autorun(() => {
            db.collection("contacts").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.addContacts(doc.data().name,doc.data().email,doc.id)
                });
            });
        })
    }

    addContacts(name,email,docRefId){
        this.contacts.push({
            name: name,
            email: email,
            docRefId: docRefId
        })
    }


}
decorate(ObservableContactsStore,{
    contacts:observable
});