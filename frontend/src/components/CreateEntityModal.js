import {useContext, useState} from "react";
import {userContext} from "../providers/UserContextProvider";
import {Alert, Button, Form, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {StyledInput} from "./Utils";
import {StyledModalBody, StyledModalFooter, StyledModalHeader} from "./Utils";

const CreateEntityModal = ({options, children}) => {
    const {toggle, visible, title, onEntityCreate, url, invalidatePage} = options;

    const {Api} = useContext(userContext);

    const [name, setName] = useState("");
    const [caption, setCaption] = useState("");
    const [error, setError] = useState(undefined);

    const onDismissError = () => setError(undefined)

    const toggleModal = () => {
        if (toggle) {
            toggle();
        }
    }

    const handleCreateEntity = () => {
        let additionalData = {};

        if (onEntityCreate) {
            additionalData = onEntityCreate();
        }

        createEntity({
                Name: name,
                Caption: caption,
                ...additionalData
            },
            () => {
                toggleModal()
                if (invalidatePage) {
                    invalidatePage()
                }
            }
        );
    }

    const createEntity = (request, onSuccess) => {
        if (url === null || url === undefined) {
            throw Error("Cannot create entity url is not set.")
        }

        if (name === "") {
            setError("Name cannot be empty.")
            return;
        }

        if (caption === "") {
            setError("Caption cannot be empty.")
            return;
        }

        Api(url, {
            method: 'POST',
            body: request
        }).then(([result, ok]) => {
            if (!ok) {
                if (result.StatusCode === 400) {
                    setError(result.message);
                    return
                } else {
                    throw Error("Cannot create entity");
                }
            }

            if (onSuccess) {
                onSuccess();
                clearInputs();
            }
        });
    }

    const clearInputs = () => {
        setName("");
        setCaption("");
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleCaptionChange = (e) => {
        setCaption(e.target.value)
    }

    return (
        <Modal isOpen={visible} toggle={toggleModal}>
            <StyledModalHeader>{title}</StyledModalHeader>
            <StyledModalBody>
                <Form>
                    <FormGroup>
                        <Label for={"name"}>Name</Label>
                        <StyledInput
                            id={"name"}
                            name={"name"}
                            placeholder={"Name"}
                            value={name}
                            onChange={handleNameChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for={"caption"}>Caption</Label>
                        <StyledInput
                            id={"caption"}
                            name={"caption"}
                            placeholder={"Caption"}
                            value={caption}
                            onChange={handleCaptionChange}
                        />
                    </FormGroup>
                    {children}
                </Form>
                <Alert isOpen={error !== undefined} toggle={onDismissError} color={"danger"}>
                    {error}
                </Alert>
            </StyledModalBody>
            <StyledModalFooter>
                <Button color={"primary"} onClick={handleCreateEntity}>Create</Button>
                <Button color={"danger"} onClick={toggleModal}>Cancel</Button>
            </StyledModalFooter>
        </Modal>
    );
}

export default CreateEntityModal;