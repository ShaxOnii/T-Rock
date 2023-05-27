import styled from "styled-components";
import {Col, Container, Row} from "reactstrap";
import {useNavigate} from "react-router-dom";

const IconContainer = styled(Col)`
  background-color: #fa4a4f;
  color: #272727;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  padding: 0.5em 1.5em 0.5em 1.5em;
`

const CaptionContainer = styled(Col)`
  background-color: #272727;
  color: #fff;

  text-align: center;
  padding: 1.5em 0.5em 1.5em 0.5em;
  font-size: 1.5em;

  user-select: none;
`

const LinkContainer = styled(Container)`

  position: relative;
  width: 40%;
  margin: 1.5em;
  
  transition: background-color 0.2s ease-in-out;
  
  &:hover{
    cursor: pointer;
  }

  &:hover ${IconContainer}{
    background-color: #e9393e;
    color: #383838;
  }

  &:hover ${CaptionContainer}{
    background-color: #383838;
  }
`

export const DashboardLink = ({to, caption = "", icon}) => {
    const navigation = useNavigate();

    const navigate = (to) => navigation(to);

    return (
        <LinkContainer onClick={() => navigate(to)}>
            <Row>
                <IconContainer md={"4"}>{icon}</IconContainer>
                <CaptionContainer >{caption}</CaptionContainer>
            </Row>
        </LinkContainer>
    )
}


const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

const DashboardNavigation = ({children}) => {

    return (
        <DashboardContainer>
            {children}
        </DashboardContainer>
    )
}

export default DashboardNavigation;