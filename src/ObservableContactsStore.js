import {observable, decorate} from "mobx";

 class ObservableContactsStore {
    contacts = [];

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

export {ObservableContactsStore};