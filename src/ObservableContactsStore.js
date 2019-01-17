import {computed, observable, action} from "mobx";

 class ObservableContactsStore {
   @observable contacts = [];
   @observable searchText = '';

    addContacts(name,email,docRefId){
        this.contacts.push({
            name: name,
            email: email,
            docRefId: docRefId
        })
    }


    @action
     setSearchText(searchText){
        this.searchText = searchText;
    }



    @computed
    get searchResults(){
        return this.contacts.filter((contact) => {
                     return contact.name.indexOf(this.searchText) > -1 || contact.email.indexOf(this.searchText) > -1
                 });
    }
}

export {ObservableContactsStore};