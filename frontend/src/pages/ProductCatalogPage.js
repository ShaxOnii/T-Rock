import {useContext, useEffect, useState} from "react";
import ProductListItem from "../components/products/ProductListItem";
import {
    Alert,
    Button,
    Col,
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
import {useParams} from "react-router-dom";
import {PageContainer} from "../components/Utils";
import {CartContext} from "../providers/CartContextProvider";

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

        console.log(request)

        Api(url, {
            method: 'POST',
            body: request
        }).then(([result, ok]) => {
            if (!ok) {
                console.log("Request failed", result);

                if (result.StatusCode === 400) {
                    setError(result.message);
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


const ProductCatalogTopBar = ({invalidatePage}) => {
    const {Api} = useContext(userContext);

    const [createProduct, setCreateProduct] = useState(false);
    const [createCategory, setCreateCategory] = useState(false);

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");

    const handleCategoryChange = (e) => setCategory(e.target.value)

    const toggleCreateProductModal = () => setCreateProduct(!createProduct)

    const toggleCreateCategoryModal = () => setCreateCategory(!createCategory)

    useEffect(() => {
        Api(`Category`).then(([result, ok]) => {
            if (ok) {
                setCategories(result);
                console.log(result)
                invalidatePage();
            } else {
                throw Error("An error occured", result);
            }
        })
    }, []);

    return (
        <Row>
            <Col>
                <StyledButton onClick={toggleCreateProductModal} color={"success"}>Create product</StyledButton>
                <CreateEntityModal options={{
                    toggle: toggleCreateProductModal,
                    visible: createProduct,
                    title: "Create new product offer",
                    url: "Product/create",
                    invalidatePage: invalidatePage,
                    onEntityCreate: () => {
                        return {category}
                    }
                }}>
                    <FormGroup>
                        <Label for={"selectCategory"}>Select Category</Label>
                        <Input
                            className="mb-3"
                            type="select"
                            name={"selectCategory"}
                            id={"selectCategory"}
                            onChange={handleCategoryChange}
                            value={category}
                        >
                            <option disabled={true} value="">Select category</option>
                            {categories.map((category, key) =>
                                <option key={key} value={category.name}>{category.caption}</option>
                            )}
                        </Input>
                    </FormGroup>
                </CreateEntityModal>

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
    const {Api} = useContext(userContext)

    const [products, setProducts] = useState([]);

    const {productCategory} = useParams();

    const [refreshComponent, refresh] = useState(false);

    const invalidate = () => {
        refresh(!refreshComponent)
    }

    useEffect(() => {
        const fetchProducts = () => {
            Api(`Product`, {
                queryParams: {
                    category: productCategory
                }
            }).then(([result, ok]) => {
                if (ok) {
                    setProducts(result);
                }
            })
        }

        fetchProducts();
    }, [refreshComponent, productCategory]);


    return (
        <PageContainer>
            <ProductCatalogTopBar invalidatePage={invalidate}/>
            <ProductFilteringTopBar/>
            {
                products.length > 0 ?
                    products.map((product, key) => <ProductListItem key={key} product={product}/>)
                    :
                    <p>There is nothing to show</p>
            }
        </PageContainer>
    );
}

export default ProductCatalogPage;