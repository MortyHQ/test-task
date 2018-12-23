import {observable} from "mobx";

 class ObservableContactsStore {
   @observable contacts = [];
   @observable searchResults = [];

    addContacts(name,email,docRefId){
        this.contacts.push({
            name: name,
            email: email,
            docRefId: docRefId
        })
    }


}

export {ObservableContactsStore};