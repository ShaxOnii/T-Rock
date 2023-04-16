import {useContext, useEffect, useState} from "react";
import {userContext} from "../providers/UserContextProvider";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {PageContainer} from "../components/Utils";
import ExampleImage from "../images/ExampleTShirt.jpg"
import {faPenToSquare as EditIcon} from "@fortawesome/free-solid-svg-icons";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
    Button,
    Carousel, CarouselControl, CarouselIndicators, CarouselItem,
    Col, Form, FormGroup, FormText, Input, InputGroup, Label,
    Row
} from "reactstrap";


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

    const slides = items.map((photo, idx) => {
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

const EditButton = ({onClick}) => {
    return (
        <Button color={"primary"} onClick={(e) => {
            e.preventDefault();
            onClick()
        }}>
            <FontAwesomeIcon icon={EditIcon}/>
        </Button>
    )
}

const ProductDetails = ({product}) => {
    const [detailsEditMode, setDetailsEditMode] = useState(false)
    const toggleDetailsEditMode = () => setDetailsEditMode(!detailsEditMode);
    const [selectedItemsCount, setSelectedItemsCount] = useState(1);

    const handleItemsCountChange = (e) => {
        setSelectedItemsCount(e.target.value)
    }

    const editableItem = ({editable, notEditable}) => (isEditable) => {
        return isEditable ? editable : notEditable
    }

    const [productChanges, setProductChanges] = useState({})

    const handleProductChange = (field) => (e) => {
        const updatedChanges = {
            ...productChanges,
            [field]: e.target.value
        }

        setProductChanges(updatedChanges)
    }

    const title = editableItem({
        notEditable: <h3>{product.caption}</h3>,
        editable: <Input
            onChange={handleProductChange("caption")}
            value={productChanges.caption ?? product.caption}
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
                        value={productChanges.price ?? product.price}
                        onChange={handleProductChange("price")}
                    />
                </Col>
                <Col sm={"auto"}>
                    <h4> PLN</h4>
                </Col>
            </Row>
    })


    const handleAddToCart = () => {

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
                <Col sm={"auto"}><EditButton onClick={toggleDetailsEditMode}/></Col>
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


const ProductPage = () => {
    const {Api} = useContext(userContext);

    const {id} = useParams();

    const [product, setProduct] = useState({});
    const [productDetailsOpen, setProductDetailsOpen] = useState("0");

    const [descriptionEditMode, setDescriptionEditMode] = useState(false)

    const toggleDescriptionEditMode = () => setDescriptionEditMode(!descriptionEditMode);

    const toggleProductDetails = (id) => {
        if (id === productDetailsOpen) {
            setProductDetailsOpen("")
        } else {
            setProductDetailsOpen(id)
        }
    }

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
            <Row>
                <Col style={{
                    margin: "2em"
                }}>
                    <ProductImages items={[
                        {
                            src: ExampleImage
                        }, {
                            src: ExampleImage
                        }, {
                            src: ExampleImage
                        }
                    ]}/>
                </Col>
                <ProductDetails product={product}/>
            </Row>
            <Row>
                <Col>
                    <Accordion open={productDetailsOpen} toggle={toggleProductDetails}>
                        <AccordionItem>
                            <AccordionHeader targetId={"0"}>
                                <Row>
                                    <Col sm={"auto"}>
                                        <EditButton onClick={toggleDescriptionEditMode}/>
                                    </Col>
                                    <Col>
                                        <h4>Description</h4>
                                    </Col>
                                </Row>
                            </AccordionHeader>
                            <AccordionBody accordionId={"0"}>
                                {product.description}
                            </AccordionBody>
                        </AccordionItem>
                    </Accordion>
                </Col>
            </Row>
        </PageContainer>
    );
}

export default ProductPage;
