import {useContext, useEffect, useState} from "react";
import ProductListItem from "../components/products/ProductListItem";
import {
    Alert,
    Button,
    Col,
    Container,
    Form,
    FormGroup, Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import styled from "styled-components";
import {userContext} from "../providers/UserContextProvider";

const CreateEntityModal = ({options, children}) => {
    const {toggle, visible, title, onEntityCreate, url} = options;

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
            () => toggleModal()
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
                console.log("Request failed", result);

                if (result.StatusCode === 400) {
                    setError(result.Message);
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
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for={"name"}>Name</Label>
                        <Input
                            id={"name"}
                            name={"name"}
                            placeholder={"Name"}
                            value={name}
                            onChange={handleNameChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for={"caption"}>Caption</Label>
                        <Input
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
            </ModalBody>
            <ModalFooter>
                <Button color={"primary"} onClick={handleCreateEntity}>Create</Button>
                <Button color={"secondary"} onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

const StyledButton = styled(Button)`
  margin: 1em;
`


const ProductCatalogTopBar = () => {

    const [createProduct, setCreateProduct] = useState(false);
    const [createCategory, setCreateCategory] = useState(false);

    const toggleCreateProductModal = () => setCreateProduct(!createProduct)

    const toggleCreateCategoryModal = () => setCreateCategory(!createCategory)

    return (
        <Row>
            <Col>
                <StyledButton onClick={toggleCreateProductModal} color={"success"}>Create product</StyledButton>
                <CreateEntityModal options={{
                    toggle: toggleCreateProductModal,
                    visible: createProduct,
                    title: "Create new product offer",
                    url: "Product/create"
                }}/>

                <StyledButton onClick={toggleCreateCategoryModal} color={"success"}>Create category</StyledButton>
                <CreateEntityModal options={{
                    toggle: toggleCreateCategoryModal,
                    visible: createCategory,
                    title: "Create new category",
                    url: "Category/create"
                }}/>
            </Col>
        </Row>
    )
}

const ProductFilteringTopBar = () => {

    return (
        <Row>
            <Col>Top bar for filters</Col>
        </Row>
    )
}

const ProductCatalogPage = () => {

    const [products, setProducts] = useState([]);

    const genFakeProducts = () => {
        let mocked = []

        for (let i = 0; i < 10; i++) {
            mocked.push({
                id: i,
                name: `MockedProduct${i}`,
                caption: `Lorem ipsum dolor sit amet, consectetur adipiscing elit ${i}`,
                price: i * 10,
                description: "An example product"
            })
        }

        return mocked;
    }

    const fetchProducts = () => {
        return genFakeProducts();

    }

    useEffect(() => {
        setProducts(fetchProducts());
    }, []);


    return (
        <Container style={{
            paddingTop: "5em"
        }}>
            <ProductCatalogTopBar/>
            <ProductFilteringTopBar/>
            {
                products.length > 0 ?
                    products.map(product => <ProductListItem product={product}/>)
                    :
                    <p>There is nothing to show</p>
            }
        </Container>
    );
}

export default ProductCatalogPage;