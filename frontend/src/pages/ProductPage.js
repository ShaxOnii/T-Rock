import {useContext, useEffect, useState} from "react";
import {userContext} from "../providers/UserContextProvider";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {PageContainer} from "../components/Utils";
import ExampleImage from "../images/ExampleTShirt.jpg" 
import {
    faPenToSquare as EditIcon,
    faClose as CloseIcon,
    faCheck as ApplyIcon
} from "@fortawesome/free-solid-svg-icons";
import {
    Button, ButtonGroup, Card, CardBody, CardText, CardTitle,
    Carousel, CarouselControl, CarouselIndicators, CarouselItem,
    Col, Form, FormGroup, FormText, Input,
    Row
} from "reactstrap";
import {ProductChangesContext, ProductChangesContextProvider} from "../providers/ProductChangesContext";
import {CartContext} from "../providers/CartContextProvider";


const ProductImages = ({items}) => {
    const [active, setActive] = useState(0);

    const setActiveSlide = (newActive) => {
        setActive(newActive)
    }

    const handleNext = () => {
        if (active >= items.length - 1) {
            setActiveSlide(0);
        } else {
            setActiveSlide(active + 1)
        }
    }

    const handlePrevious = () => {
        if (active <= 0) {
            setActiveSlide(items.length - 1);
        } else {
            setActiveSlide(active - 1)
        }
    }

    const slides = items.map((photo) => {
        return (
            <CarouselItem>
                <img
                    src={photo.src}
                    alt={photo.altText}
                    width={"100%"}
                />
            </CarouselItem>
        )
    })

    return (
        <Carousel activeIndex={active} next={handleNext} previous={handlePrevious}>
            <CarouselIndicators items={items} activeIndex={active} onClickHandler={setActiveSlide}/>
            {slides}
            <CarouselControl direction={"next"} onClickHandler={handleNext}/>
            <CarouselControl direction={"prev"} onClickHandler={handlePrevious}/>
        </Carousel>
    );
}

const ProductDetailsContainer = styled(Row)`
  padding: 1em;
`

const ColContentToRight = styled(Col)`
  display: flex;
  justify-content: right;
`

export const EditButton = ({onClick}) => {
    return (
        <Button color={"primary"} onClick={(e) => {
            e.preventDefault();
            onClick()
        }}>
            <FontAwesomeIcon icon={EditIcon}/>
        </Button>
    )
}

const ChangeButtonActions = ({onDiscard, onSave}) => {
    return (
        <ButtonGroup>
            <Button color={"success"} onClick={onSave}>
                <FontAwesomeIcon icon={ApplyIcon}/>
            </Button>
            <Button color={"danger"} onClick={onDiscard}>
                <FontAwesomeIcon icon={CloseIcon}/>
            </Button>
        </ButtonGroup>
    )
}

const ProductDetails = ({product}) => {
    const {handleProductChange, getValueFor, discardChangesFor, applyChanges} = useContext(ProductChangesContext);
    const {addItemToCart} = useContext(CartContext)

    const [detailsEditMode, setDetailsEditMode] = useState(false)
    const [selectedItemsCount, setSelectedItemsCount] = useState(1);

    const discardChanges = () => discardChangesFor("price", "caption")

    const toggleDetailsEditMode = () => setDetailsEditMode(!detailsEditMode);

    const handleItemsCountChange = (e) => {
        setSelectedItemsCount(e.target.value)
    }

    const editableItem = ({editable, notEditable}) => (isEditable) => {
        return isEditable ? editable : notEditable
    }

    const title = editableItem({
        notEditable: <h3>{product.caption}</h3>,
        editable: <Input
            onChange={handleProductChange("caption")}
            value={getValueFor("caption") ?? product.caption}
        />
    })

    const price = editableItem({
        notEditable:
            <h4>{product.price} PLN</h4>,
        editable:
            <Row>
                <Col>
                    <Input
                        type={"number"}
                        value={getValueFor("price") ?? product.price}
                        onChange={handleProductChange("price")}
                    />
                </Col>
                <Col sm={"auto"}>
                    <h4> PLN</h4>
                </Col>
            </Row>
    })

    const handleAddToCart = () => {
        addItemToCart(product.id, selectedItemsCount)
    }

    const handleSaveChanges = () => {
        applyChanges(["caption", "price"], {
                onSuccess: (response) => {
                    console.log(response)
                },
                onFailure: (response) => {
                    console.log(response)
                }
            },
        );

        toggleDetailsEditMode()
    }

    const handleDiscardChanges = () => {
        discardChanges()
        toggleDetailsEditMode()
    }

    return (
        <Col style={{
            margin: "1em 1em 1em 5em",
            padding: "2em",
            borderRadius: "0.5em",
            border: "1px solid #ccc"
        }}>
            <ProductDetailsContainer style={{
                display: "flex",
                flexDirection: "row",
                borderBottom: "1px solid #000"
            }}>
                <Col>
                    {
                        title(detailsEditMode)
                    }
                </Col>
                <Col sm={"auto"}>
                    {detailsEditMode ?
                        <ChangeButtonActions onDiscard={handleDiscardChanges} onSave={handleSaveChanges}/>
                        :
                        <EditButton onClick={toggleDetailsEditMode}/>
                    }
                </Col>
            </ProductDetailsContainer>
            <ProductDetailsContainer>
                <ColContentToRight>
                    {price(detailsEditMode)}
                </ColContentToRight>
            </ProductDetailsContainer>
            <ProductDetailsContainer>
                <Col>
                    <Form>
                        <Row>
                            <ColContentToRight>
                                <FormGroup>
                                    <Input
                                        type="select"
                                        name={"selectItemsCount"}
                                        id={"selectItemsCount"}
                                        onChange={handleItemsCountChange}
                                        value={selectedItemsCount}
                                    >{/*TODO: Zkaodzic to pozniej*/}
                                        {[1, 2, 3, 4, 5].map((count, key) =>
                                            <option key={key} value={count}>{count}</option>
                                        )}
                                    </Input>
                                    <FormText>
                                        Available: {5}
                                    </FormText>
                                </FormGroup>
                            </ColContentToRight>
                            <Col>
                                <Button block color={"success"} onClick={handleAddToCart}>Add to cart</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </ProductDetailsContainer>
        </Col>
    )
}

const ProductDescriptionPane = ({options}) => {
    const {field, caption, content} = options
    const {handleProductChange, getValueFor, discardChangesFor, applyChanges} = useContext(ProductChangesContext);

    const [editMode, setEditMode] = useState(false)

    const toggleEditMode = () => setEditMode(!editMode);

    const discardChanges = () => discardChangesFor(field)

    const handleSaveChanges = () => {
        applyChanges([field], {
                onSuccess: (response) => {
                    console.log(response)
                },
                onFailure: (response) => {
                    console.log(response)
                }
            },
        );

        toggleEditMode()
    }

    const handleDiscardChanges = () => {
        discardChanges()
        toggleEditMode()
    }

    return (
        <Card>
            <CardBody>
                <CardTitle>
                    <Row>
                        <Col>
                            <h5>{caption}</h5>
                        </Col>
                        <Col sm={"auto"}>
                            {editMode ?
                                <ChangeButtonActions onDiscard={handleDiscardChanges} onSave={handleSaveChanges}/>
                                :
                                <EditButton onClick={toggleEditMode}/>
                            }
                        </Col>
                    </Row>
                </CardTitle>
                {!editMode ?
                    <CardText>
                        {getValueFor(field) ?? content}
                    </CardText>
                    :
                    <Input
                        type={"textarea"}
                        value={getValueFor(field) ?? content}
                        onChange={handleProductChange(field)}
                        rows={16}
                    />
                }
            </CardBody>
        </Card>
    );
}


const ProductPage = () => {
    const {Api} = useContext(userContext);

    const {id} = useParams();

    const [product, setProduct] = useState({});

    useEffect(() => {
        Api(`Product/${id}`).then(([result, ok]) => {
            if (ok) {
                setProduct(result);
            } else {
                throw Error("An error occured", result);
            }
        })
    }, [Api, id]);

    return (
        <PageContainer>
            <ProductChangesContextProvider productId={product.id} updateProduct={(p) => setProduct(p)}>
                <Row>
                    <Col style={{
                        margin: "2em"
                    }}>
                        <ProductImages items={[
                            {
                                src: ExampleImage
                            }, /*{
                                src: ExampleImage
                            }, {
                                src: ExampleImage
                            }*/
                        ]}/>
                    </Col>
                    <ProductDetails product={product}/>
                </Row>
                <Row style={{paddingTop: "2em"}}>
                    <Col>
                        <ProductDescriptionPane options={{
                            field: "description",
                            caption: "Description",
                            content: product.description
                        }}/>
                    </Col>
                </Row>
            </ProductChangesContextProvider>
        </PageContainer>
    );
}

export default ProductPage;
