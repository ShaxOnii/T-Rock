import {useContext, useEffect, useState} from "react";
import {userContext} from "../providers/UserContextProvider";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {PageContainer} from "../components/Utils";
import ExampleImage from "../images/ExampleTShirt.jpg"
import {faPenToSquare as editIcon} from "@fortawesome/free-solid-svg-icons";
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
            <CarouselItem key={idx}>
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

const ProductTitle = ({title}) => {


    return(
        <ProductDetailsContainer>
            <Col style={{
                borderBottom: "1px solid #000"
            }}>
                <h3>{title}</h3>
            </Col>
        </ProductDetailsContainer>
    );
}

const ColContentToRight = styled(Col)`
  display: flex;
  justify-content: right;
`

const editButton = ({onClick}) => {
    return(
        <Button>
            <FontAwesomeIcon></FontAwesomeIcon>
        </Button>
    )
}

const ProductPage = () => {
    const {Api} = useContext(userContext);

    const {id} = useParams();

    const [product, setProduct] = useState({});
    const [productDetailsOpen, setProductDetailsOpen] = useState("0");
    const [selectedItemsCount, setSelectedItemsCount] = useState(1);

    const [detailsEditMode, setDetailsEditMode] = useState(false)
    const [descriptionEditMode, setDescriptionEditMode] = useState(false)

    const toggleDetailsEditMode = () => setDetailsEditMode(!detailsEditMode);

    const toggleDescriptionEditMode = () => setDescriptionEditMode(!descriptionEditMode);

    const handleItemsCountChange = (e) => {
        setSelectedItemsCount(e.target.value)
    }

    const toggleProductDetails = (id) => {
        if (id === productDetailsOpen) {
            setProductDetailsOpen("")
        } else {
            setProductDetailsOpen(id)
        }
    }

    const handleAddToCart = () => {

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
                <Col style={{
                    margin: "1em 1em 1em 5em",
                    padding: "2em",
                    borderRadius: "0.5em"
                }}>
                    <ProductTitle title={product.caption}/>
                    <ProductDetailsContainer>
                        <ColContentToRight>
                            <h4>{product.price} PLN</h4>
                        </ColContentToRight>
                    </ProductDetailsContainer>
                    <ProductDetailsContainer >
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
            </Row>
            <Row>
                <Col>
                    <Accordion open={productDetailsOpen} toggle={toggleProductDetails}>
                        <AccordionItem>
                            <AccordionHeader targetId={"0"}>
                                <h4>Description</h4>
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
