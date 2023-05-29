import {useContext, useState} from "react";
import {userContext} from "../providers/UserContextProvider";
import {
    Alert,
    Button,
    Form,
    FormGroup,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from "reactstrap";
import {isDevelopment} from "./Utils";
import { StyledInput } from "../components/Utils";
import styled from "styled-components";

const StyledTabContainer = styled(TabContent)`
    background-color: ${props=>props.theme.secondary};
    color: ${props=>props.theme.textLight};

`

const StyledNavLink = styled(NavLink)`
    background-color: ${props=>props.active? props.theme.primary : props.theme.secondary};
    color: ${props=>props.theme.textLight};
    border-color: ${props=>props.theme.primary};
    
    &:hover{
        border: none;
    }
`


const LoginUserModal = ({options}) => {
    const {toggle, visible} = options;

    const {login} = useContext(userContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(undefined);
    const [activeTab, setActiveTab] = useState("login");

    const onDismissError = () => setError(undefined)

    const toggleModal = () => {
        if (toggle) {
            toggle();
        }
    }

    const handleLogin = () => {
        if (validateLoginInputs()) {
            loginUser(username, password);
        }
    }

    const handleQuickLogin = () => {
        loginUser("administrator", "admin")
    }

    const loginUser = (username, password) => {
        login(username, password)
            .then((isSuccess) => {
                if (isSuccess) {
                    toggleModal();
                    clearInputs();
                }
            })
            .catch((error) => {
                setError(error.message)
            })
    }

    const validateLoginInputs = () => {
        if (username === "") {
            setError("Username cannot be empty.")
            return false;
        }

        if (password === "") {
            setError("Password cannot be empty.")
            return false;
        }

        return true
    }

    const clearInputs = () => {
        setUsername("");
        setPassword("");
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <Modal isOpen={visible} toggle={toggleModal}>
            <StyledTabContainer activeTab={activeTab}>
                <TabPane tabId="login">
                    <ModalHeader>Login</ModalHeader>
                    <AuthModalNav active={activeTab} setActiveTab={setActiveTab}/>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for={"username"}>Username</Label>
                                <StyledInput
                                    id={"username"}
                                    name={"username"}
                                    placeholder={"Username"}
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for={"password"}>Password</Label>
                                <StyledInput
                                    id={"password"}
                                    name={"password"}
                                    type={"password"}
                                    placeholder={"Password"}
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </FormGroup>
                        </Form>
                        <Alert isOpen={error !== undefined} toggle={onDismissError} color={"danger"}>
                            {error}
                        </Alert>
                    </ModalBody>
                    <ModalFooter>
                        {isDevelopment && <Button color={"success"} onClick={handleQuickLogin}>Quick Login</Button>}
                        <Button color={"primary"} onClick={handleLogin}>Login</Button>
                        <Button color={"secondary"} onClick={toggleModal}>Cancel</Button>
                    </ModalFooter>
                </TabPane>
                <RegisterPane toggleModal={toggleModal} setActiveTab={setActiveTab}/>
            </StyledTabContainer>
        </Modal>

    );
}

const AuthModalNav = ({setActiveTab,activeTab}) => {
    return (
        <Nav justified tabs>
            <NavItem>
                <StyledNavLink active={activeTab === "login"} onClick={() => setActiveTab("login")}>
                    Login
                </StyledNavLink >
            </NavItem>
            <NavItem>
                <StyledNavLink active={activeTab === "register"}  onClick={() => setActiveTab("register")}>
                    Register
                </StyledNavLink >
            </NavItem>
        </Nav>
    )
}

const RegisterPane = ({toggleModal, setActiveTab}) => {
    const {register} = useContext(userContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(undefined);

    const onDismissError = () => setError(undefined)

    const validateLoginInputs = () => {
        if (username === "") {
            setError("Username cannot be empty.")
            return false;
        }

        if (password === "") {
            setError("Password cannot be empty.")
            return false;
        }

        if (email === "") {
            setError("Email cannot be empty.")
            return false;
        }

        return true
    }

    const clearInputs = () => {
        setUsername("");
        setPassword("");
        setEmail("");
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleRegister = () => {
        if(!validateLoginInputs()){
            return;
        }

        register(username, password, email)
            .then((isSuccess) => {
                if (isSuccess) {
                    toggleModal();
                    clearInputs();
                }
            })
            .catch((error) => {
                setError(error.message)
            })
    }

    return (
        <TabPane tabId="register">
            <ModalHeader>Register</ModalHeader>
            <AuthModalNav setActiveTab={setActiveTab}/>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for={"username"}>Username</Label>
                        <StyledInput
                            id={"username"}
                            name={"username"}
                            placeholder={"Username"}
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for={"password"}>Password</Label>
                        <StyledInput
                            id={"password"}
                            name={"password"}
                            type={"password"}
                            placeholder={"Password"}
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for={"email"}>Email</Label>
                        <StyledInput
                            id={"email"}
                            name={"email"}
                            placeholder={"Email"}
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </FormGroup>
                </Form>
                <Alert isOpen={error !== undefined} toggle={onDismissError} color={"danger"}>
                    {error}
                </Alert>
            </ModalBody>
            <ModalFooter>
                <Button color={"primary"} onClick={handleRegister}>Register</Button>
                <Button color={"secondary"} onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
        </TabPane>
    )
}

export default LoginUserModal;
