import React,{Component} from "react";
import styled from "styled-components";
import magni from "./if_-_Magnifier-Search-Zoom-_3844467.svg";
import {inject} from "mobx-react";

const SearchBox = styled.div`
    margin-bottom: 1.4%;
    border: 1px solid;
    width: 100%;
    font: bold 22px 'Arial';   
`;
const SearchInput = styled.input`
        width: 87%;
        height: 29.6px;
        float: left;
        outline: none;
`;
const Magnifire = styled.div`
        float:left;
        margin: 0 1% 0 5px;
        background: url(${magni}) center no-repeat;
        width: 24px;
        height: 29.6px;
`;
const ClearFix = styled.div`
    &:before,&:after{
     content: " ";
     display: table;
     }
     &:after{
     clear: both;
     }
`;


export const Search = inject("store")(class Search extends Component{
    render() {
        let lookFor =  this.props.lookFor;
        return (
            <SearchBox>
                <ClearFix>
                    <Magnifire>

                    </Magnifire>
                    <SearchInput type={"text"} onClick={setupStarter} placeholder={'Search'}/>
                </ClearFix>
            </SearchBox>
        );

        function setupUpdater(){
            let input = document.getElementsByTagName('input')[0], timeout=null;
            function handleChange(){
                lookFor(input.value);
            }
            function eventHandler(){
                if(timeout) clearTimeout(timeout);
                timeout = setTimeout(handleChange, 500);
            }
            input.onkeyup = eventHandler;
        }
        function setupStarter() {
            setupUpdater();
            document.getElementsByTagName('input')[0].focus();
        }
    }
});