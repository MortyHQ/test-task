import React,{Component} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Create = styled.div`
        cursor: pointer;
        text-align: center;
        border: 1px solid;
        width: 100%;
`;
const StyledLink = styled(Link)`
    text-decoration:none;
    color: black;
`;

class CreationButton extends Component{
    render() {
        return (
            <Create>
                <StyledLink to={"/test-task/new"}>
                    <h3> + </h3>
                </StyledLink>
            </Create>
        );
    }
}
export default CreationButton;