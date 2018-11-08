import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import styled from "styled-components";
import AddressBookSwitch from "./AddressBookSwitch"
import {ObservableContactsStore} from "./ObservableContactsStore";
import {Provider} from "mobx-react";


const contactstore = new ObservableContactsStore();
const searchstore = new ObservableContactsStore();

const Main = styled.div`
    width: 50%;
    margin: 3% auto;
    > h4 {
        font: bold 22px 'Arial';
        margin-bottom: 10px;
        text-align: left;
    }
    @media (max-width: 720px){
        width: 250px
    }
    @media (min-width: 1280px){
        width: 640px
    }
`;

class App extends Component{
    render() {
        return (
            <Provider store={contactstore} result={searchstore}>
                <Router>
                    <Route component={AddressBookSwitch}/>
                </Router>
            </Provider>
        );
    }
}

export default App;
export {
    Main,
    contactstore
};
