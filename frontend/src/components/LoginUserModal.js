import { useContext, useState } from "react";
import { userContext } from "../providers/UserContextProvider";
import { Alert, Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

const LoginUserModal = ({ options }) => {
    const { toggle, visible, onLogin } = options;

    const { Api } = useContext(userContext);

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
        loginUser(
            () => toggleModal()
        );
    }

    const loginUser = (onSuccess) => {
        if (username === "") {
            setError("Username cannot be empty.")
            return;
        }

        if (password === "") {
            setError("Password cannot be empty.")
            return;
        }

        const request = {
            Login: username,
            Password: password,
        }

        Api("Auth/login", {
            method: 'POST',
            body: request
        }).then(([result, ok]) => {
            if (!ok) {
                console.log("Request failed", result);

                if (result.status >= 400) {
                    console.log(result)
                    setError(result.Errors[0]);
                    return
                } else {
                    throw Error("Cannot create entity");
                }
            }

            console.log(result);
            if (onSuccess) {
                onSuccess();
                clearInputs();
            }
        });
    }

    const clearInputs = () => {
        setUsername("");
        setPassword("");
    }

    const handleNameChange = (e) => {
        setUsername(e.target.value)
    }

    const handleCaptionChange = (e) => {
        setPassword(e.target.value)
    }

    return (

        <Modal isOpen={visible} toggle={toggleModal}>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="login">
                    <ModalHeader>Login</ModalHeader>
                    <Nav justified tabs>
                        <NavItem>
                            <NavLink className="active" onClick={() => setActiveTab("login")}>
                                Login
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => setActiveTab("register")} >
                                Register
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for={"username"}>Username</Label>
                                <Input
                                    id={"username"}
                                    name={"username"}
                                    placeholder={"Username"}
                                    value={username}
                                    onChange={handleNameChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for={"password"}>Password</Label>
                                <Input
                                    id={"password"}
                                    name={"password"}
                                    type={"password"}
                                    placeholder={"Password"}
                                    value={password}
                                    onChange={handleCaptionChange}
                                />
                            </FormGroup>
                        </Form>
                        <Alert isOpen={error !== undefined} toggle={onDismissError} color={"danger"}>
                            {error}
                        </Alert>
                    </ModalBody>
                    <ModalFooter>
                        <Button color={"primary"} onClick={handleLogin}>Login</Button>
                        <Button color={"secondary"} onClick={toggleModal}>Cancel</Button>
                    </ModalFooter>
                </TabPane>


                <TabPane tabId="register">
                    <ModalHeader>Register</ModalHeader>
                    <Nav justified tabs>
                        <NavItem>
                            <NavLink className="" onClick={() => setActiveTab("login")}>
                                Login
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="active" onClick={() => setActiveTab("register")} >
                                Register
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for={"username"}>Username</Label>
                                <Input
                                    id={"username"}
                                    name={"username"}
                                    placeholder={"Username"}
                                    value={username}
                                    onChange={handleNameChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for={"password"}>Password</Label>
                                <Input
                                    id={"password"}
                                    name={"password"}
                                    type={"password"}
                                    placeholder={"Password"}
                                    value={password}
                                    onChange={handleCaptionChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for={"email"}>Email</Label>
                                <Input
                                    id={"email"}
                                    name={"email"}
                                    placeholder={"Email"}
                                    value={username}
                                    onChange={handleCaptionChange}
                                />
                            </FormGroup>
                        </Form>
                        <Alert isOpen={error !== undefined} toggle={onDismissError} color={"danger"}>
                            {error}
                        </Alert>
                    </ModalBody>
                    <ModalFooter>
                        <Button color={"primary"} onClick={handleLogin}>Register</Button>
                        <Button color={"secondary"} onClick={toggleModal}>Cancel</Button>
                    </ModalFooter>
                </TabPane>

            </TabContent>
        </Modal>

    );
}

export default LoginUserModal;
