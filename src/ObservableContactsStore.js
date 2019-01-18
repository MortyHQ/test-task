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
        return this.searchText
            ? this.contacts.filter(contact => Object.values(contact).some(value => value.toLowerCase().includes(this.searchText.toLowerCase())))
            : this.contacts;
    }
}

export {ObservableContactsStore};