import {Col, Nav, Navbar, NavbarBrand, Row} from "reactstrap";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart, faUser} from "@fortawesome/free-solid-svg-icons";
import {SimpleLink} from "./Utils";
import LoginUserModal from "./LoginUserModal";
import {useContext, useEffect, useState} from "react";
import {userContext} from "../providers/UserContextProvider";
import LogoImage from "../images/TRockIcon.svg"
import {useNavigate} from "react-router-dom";


const GenericNav = styled(Navbar)`
  border-bottom: 1px solid ${props => props.theme.secondary};
  box-shadow: none;

  background-color: ${props => props.theme.secondaryDark};

  display: flex;

  padding: 0;
  margin: 0;
`


const StyledNavLink = styled(SimpleLink)`
  color: ${props => props.theme.textLight};
  text-align: center;
  padding: 1em 2em 1em 2em;
  font-size: 1em;

  &:hover {
    text-decoration: none;
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.textDark};
  }
`

const MainNavLink = styled(StyledNavLink)`
  font-size: 1.2em;
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

const StyledLogoButton = styled.div`
  background-image: url(${(p) => p.imageSrc});
  background-size: cover;

  margin: 0.5em;

  height: 100%;
  aspect-ratio: 1/1;
`

const BrandName = styled.h2`
  color: ${props => props.theme.primary};
  font-weight: bold;
  font-size: 1.5em;

  user-select: none;
  padding: 0.2em 0 0.2em 0;
`

const StyledNav = styled(Nav)`
  display: flex;
  padding: 0;
`

const StyledNavbarBrand = styled(NavbarBrand)`
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`

const MainAppToolbar = () => {
    const {username, isLogged, logout} = useContext(userContext);
    const navigate = useNavigate()


    const [loginModalVisible, setLoginModalVisible] = useState(false);

    const toggleLoginModal = () => setLoginModalVisible(!loginModalVisible);

    const handleUserLogout = () => {
        logout();
    }

    return (
        <GenericNav>
            <StyledNav>
                <StyledNavbarBrand onClick={() => navigate("/")}>
                    <StyledLogoButton imageSrc={LogoImage}/>
                    <BrandName>T-Rock</BrandName>
                </StyledNavbarBrand>
            </StyledNav>
            <StyledNav>
                {
                    isLogged() && <MainNavLink to={"/dashboard"}>{username}</MainNavLink>
                }
                <MainNavLink to={"/cart"}>
                    <MenuButton icon={faShoppingCart}>Cart</MenuButton>
                </MainNavLink>
                {isLogged() ?
                    <MainNavLink to={"/"}>
                        <MenuButton onClick={handleUserLogout} icon={faUser}>Logout</MenuButton>
                    </MainNavLink>
                    :
                    <MainNavLink to={"/"}>
                        <MenuButton onClick={toggleLoginModal} icon={faUser}>Login</MenuButton>
                        <LoginUserModal options={{
                            visible: loginModalVisible,
                            toggle: toggleLoginModal
                        }}/>
                    </MainNavLink>
                }
            </StyledNav>
        </GenericNav>
    );
}

const CategoryNav = styled(Nav)`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.secondaryDark};

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
    }, [Api]);


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