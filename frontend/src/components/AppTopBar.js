import {NavLink} from "react-router-dom";
import {Col, Nav, Navbar, NavbarBrand, Row} from "reactstrap";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart, faUser, faShirt} from "@fortawesome/free-solid-svg-icons";
import {SimpleLink} from "./Utils";
import LoginUserModal from "./LoginUserModal";
import HomeImage from "../images/TRockIcon.jpg"
import {useState} from "react";

const GenericNav = styled(Navbar)`
  border-bottom: 1px solid #eee;
  box-shadow: 0 0.1em 0.2em 0 #ccc;

  display: flex;

  padding: 1.5em 1em 1.5em 1em;
  margin: 0;
`

const StyledNavLink = styled(SimpleLink)`
  color: #000;

  font-size: 1.2em;
  letter-spacing: 0.5px;
  text-decoration: none;

  padding-left: 2em;

  &:first-child {
    padding-left: 0
  }
`

const MenuButton = ({icon, onClick, children}) => {
    return (
        <Row onClick={onClick}>
            <Col>
                <FontAwesomeIcon icon={icon} />
            </Col>
            <Col>{children}</Col>
        </Row>
    )

}


const MainAppToolbar = () => {
    const [loginModalVisible, setLoginModalVisible] = useState(false);

    const toggleLoginModal = () => setLoginModalVisible(!loginModalVisible);

    return (
        <GenericNav>
            <Nav>
                <NavbarBrand>
                    <MenuButton icon={faShirt} style={{color: "#000000",}}>T-Rock</MenuButton>
                </NavbarBrand>
            </Nav>
            <Nav>
                <StyledNavLink to={"/"}>
                    <MenuButton icon={faShoppingCart}>Cart</MenuButton>
                </StyledNavLink>
                <StyledNavLink to={"/"}>
                    <MenuButton onClick={toggleLoginModal} icon={faUser}>Login</MenuButton>
                    <LoginUserModal options={{
                        visible: loginModalVisible,
                        toggle: toggleLoginModal
                    }} />
                </StyledNavLink>
            </Nav>
        </GenericNav>
    );

}

const CategoryNav = styled(Nav)`
  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid #eee;
  box-shadow: 0 0.1em 0.2em 0 #ccc;

  padding: 1em;
  margin: 0;
`

const CategoryToolbar = () => {

    const categories = ["Men", "Women", "Regular", "Other"];

    return (
        <CategoryNav>
            {
                categories.map(category =>
                    <StyledNavLink to={"/"}>
                        {category}
                    </StyledNavLink>
                )
            }
        </CategoryNav>
    );
}

const MainNav = styled(Nav)`
  display: flex;
  flex-direction: column;

`

const AppTopBar = () => {

    return (
        <MainNav position="sticky">
            <MainAppToolbar/>
            <CategoryToolbar/>
        </MainNav>
    );
}


export default AppTopBar;