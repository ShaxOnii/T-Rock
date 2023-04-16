import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {Container} from "reactstrap";

const SimpleLink = styled(NavLink)`
  color: #000;

  font-size: 1.2em;
  letter-spacing: 0.5px;
  text-decoration: none;

  &:first-child {
    padding-left: 0
  }
  
  &:hover {
    color: #000;
    text-decoration: underline;
    
  }
`

const PageContainer = styled(Container)`
  padding-top: 5em;
`

export {SimpleLink, PageContainer}