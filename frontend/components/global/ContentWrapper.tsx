import * as React from "react";
//import styled from "styled-components";
import { Container } from "semantic-ui-react";
/*
const Wrapper = styled.div`
    background: #ffffff;
    width:70%;
    margin-left: 15%;
    overflow: hidden;
    height: calc(100vh - 120px);
`;
*/
export default ({ children }) => <Container text>{children}</Container>;
