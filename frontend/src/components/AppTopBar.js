import {Col, Nav, Navbar, NavbarBrand, Row} from "reactstrap";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart, faUser} from "@fortawesome/free-solid-svg-icons";
import {SimpleLink} from "./Utils";
import LoginUserModal from "./LoginUserModal";
import {useContext, useEffect, useState} from "react";
import {userContext} from "../providers/UserContextProvider";

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
                <FontAwesomeIcon icon={icon}/>
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
                    T-Rock
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
                    }}/>
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
    const {Api} = useContext(userContext);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        Api(`Category`).then(([result, ok]) => {
            if (ok) {
                setCategories(result);
            } else {
                throw Error("An error occured", result);
            }
        })
    }, []);


    if (categories.length <= 0) {
        return (<></>)
    }

    return (
        <CategoryNav>
            <StyledNavLink to={"products/"}>
                All
            </StyledNavLink>
            {
                categories.map((category, idx) =>
                    <StyledNavLink key={idx} to={`products/${category.name}`}>
                        {category.caption}
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