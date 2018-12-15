import {observable} from "mobx";

 class ObservableContactsStore {
   @observable contacts = [];

    addContacts(name,email,docRefId){
        this.contacts.push({
            name: name,
            email: email,
            docRefId: docRefId
        })
    }


}

export {ObservableContactsStore};