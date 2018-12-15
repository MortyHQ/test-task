import {inject, observer} from "mobx-react";
import React,{Component} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import DeleteButton from "./DeleteButton";


const ClearFix = styled.div`
    &:before,&:after{
     content: " ";
     display: table;
     }
     &:after{
     clear: both;
     }
`;
const Row = styled.div`
    border-bottom: 1px solid;
    border-top: 1px solid;
    padding: 0.52%;
    &:first-child{
    border-bottom: none;
    }
    &:nth-child(n+3){
    border-top: none;
    }
    &:last-child{
    border-bottom: none;
    }
    &:nth-child(2n){
    background-color: lightgray;    
    }
    height: 40px
`;
const Name = styled.h5`
    position: relative;
    display: inline-block;
    border-bottom: 2px dotted black;
    font: bold 16px 'Arial';
    > span {
        visibility: hidden;
        color: black;
        width: 90px;
        background: white;
        text-align: center;
        border-radius: 6px;
        padding: 5px;
        border: 1px solid black;
        position: absolute;
        z-index: 1;
        top: -10px;
        left: 110%;
    }
    &:hover > span {
        visibility: visible;
        font: 14px 'Arial';
    }
`;
const Email = styled.h6`
        font: 14px 'Arial';
`;
const Contact = styled.div`
    float:left;
`;
const StyledLink = styled(Link)`
    text-decoration:none;
    color: black;
`;
const StyledMail = styled.a`
    text-decoration:none;
    color: black;
`;

@inject("store") @observer class TableRow extends Component{
    render() {
        const {store, idx} = this.props;

        return (
            <Row>
                <ClearFix>
                    <Contact>
                        <div>
                            <Name>
                                <StyledLink to={{
                                    pathname: "/test-task/edit",
                                    state: {
                                        idx: idx,
                                        docRefId: store.contacts[idx].docRefId
                                    }}}>
                                    {(store.contacts[idx].name === "")?"________":store.contacts[idx].name}
                                </StyledLink>
                                <span> click to edit </span>
                            </Name>
                        </div>
                        <div>
                            <Email><StyledMail href={"mailto:"+store.contacts[idx].email}>{store.contacts[idx].email}</StyledMail></Email>
                        </div>
                    </Contact>
                </ClearFix>
                <DeleteButton store = {store} idx={idx}/>
            </Row>
        );
    }
}
export default TableRow;