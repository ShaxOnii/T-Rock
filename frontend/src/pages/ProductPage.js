import {useContext, useEffect, useState} from "react";
import {ADMIN_ROLE, createUrl, userContext, VisibleToRoles} from "../providers/UserContextProvider";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import {PageContainer, ApplyIcon, CloseIcon, EditIcon, ImageEditIcon} from "../components/Utils";
import ExampleImage from "../images/ExampleTShirt.jpg"
import {
    Badge,
    Button, ButtonGroup, Card, CardBody, CardText, CardTitle,
    Carousel, CarouselControl, CarouselIndicators, CarouselItem,
    Col, Form, FormGroup, FormText, Input,
    Row
} from "reactstrap";
import {ProductChangesContext, ProductChangesContextProvider} from "../providers/ProductChangesContext";
import {CartContext} from "../providers/CartContextProvider";
import {useNavigate} from "react-router-dom"
import {StyledInput} from "../components/Utils";
import {ImageGallery, ImageGalleryItem} from "../components/ImageGallery";
import {CategoryContext} from "../providers/CategoryProvider";

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;

  aspect-ratio: 1/1; // nie podoba mi sie to ale narazie musi wystarczyc
`

const ImageContainer = styled(CarouselItem)`
  position: relative;
  overflow: hidden;
`

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
            <ImageContainer key={idx}>
                <Img
                    src={photo.src}
                    alt={photo.altText}
                />
            </ImageContainer>
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

  &:first-child {
    border-bottom: 1px solid ${props => props.theme.secondaryDark};
  }
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
            <EditIcon/>
        </Button>
    )
}

const ChangeButtonActions = ({onDiscard, onSave}) => {
    return (
        <ButtonGroup>
            <Button color={"success"} onClick={onSave}>
                <ApplyIcon/>
            </Button>
            <Button color={"danger"} onClick={onDiscard}>
                <CloseIcon/>
            </Button>
        </ButtonGroup>
    )
}

const ProductDetailsBox = styled(Col)`
  margin: 1em 1em 1em 5em;
  padding: 2em;

  background-color: ${props => props.theme.secondary};
  color: ${props => props.theme.textLight};
`

const ChangeCategoryInput = ({category}) => {
    const {allCategories} = useContext(CategoryContext)
    const {handleProductChange, getValueFor} = useContext(ProductChangesContext)

    return (
        <FormGroup>
            <StyledInput
                type="select"
                name={"selectCategory"}
                id={"selectCategory"}
                onChange={handleProductChange('category')}
                value={getValueFor('category') ?? category.name}
            >
                {allCategories().map((category, key) =>
                    <option key={key} value={category.name}>{category.caption}</option>
                )}
            </StyledInput>
        </FormGroup>
    )
}

const ProductDetails = ({product}) => {
    const {
        handleProductChange,
        getValueFor,
        discardChangesFor,
        applyChanges,
        linkImageWithProduct,
        deleteImage
    } = useContext(ProductChangesContext);

    const {addItemToCart} = useContext(CartContext)
    const navigate = useNavigate()

    const [detailsEditMode, setDetailsEditMode] = useState(false)
    const [selectedItemsCount, setSelectedItemsCount] = useState(1);
    const [productGalleryVisible, setProductGalleryVisible] = useState(false);

    const discardChanges = () => discardChangesFor("price", "caption")

    const toggleProductGallery = () => setProductGalleryVisible(!productGalleryVisible)

    const toggleDetailsEditMode = () => setDetailsEditMode(!detailsEditMode);

    const handleItemsCountChange = (e) => {
        setSelectedItemsCount(e.target.value)
    }

    const editableItem = ({editable, notEditable}) => (isEditable) => {
        return isEditable ? editable : notEditable;
    }

    const title = editableItem({
        notEditable: <h3>{product.caption}</h3>,
        editable: <StyledInput
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
                    <StyledInput
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

    const category = editableItem((() => {
        if (product.id === undefined) {
            return {};
        }

        return {
            notEditable:
                <Badge color={"primary"}>{product.category.caption}</Badge>,
            editable:
                <ChangeCategoryInput category={product.category}/>
        }
    })())

    const handleAddToCart = () => {
        addItemToCart(product.id, selectedItemsCount)
        navigate("/cart");
    }

    const handleSaveChanges = () => {
        applyChanges(["caption", "price", "category"], {
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

    const handleImageAddedToProduct = (imageId) => {
        linkImageWithProduct(imageId)
    }

    const handleProductImageDelete = (imageId) => () => {
        deleteImage(imageId);
    }

    return (
        <ProductDetailsBox>
            <ProductDetailsContainer>
                <Col>
                    {
                        title(detailsEditMode)
                    }
                </Col>
                <VisibleToRoles roles={[ADMIN_ROLE]}>
                    <Col sm={"auto"}>
                        {detailsEditMode ?
                            <ChangeButtonActions onDiscard={handleDiscardChanges} onSave={handleSaveChanges}/>
                            :
                            <ButtonGroup>
                                <EditButton onClick={toggleDetailsEditMode}/>
                                <Button color={"primary"} onClick={toggleProductGallery}>
                                    <ImageEditIcon/>
                                </Button>
                            </ButtonGroup>
                        }
                    </Col>
                </VisibleToRoles>
            </ProductDetailsContainer>
            <ProductDetailsContainer>
                <ColContentToRight>
                    {price(detailsEditMode)}
                </ColContentToRight>
            </ProductDetailsContainer>
            <ProductDetailsContainer>
                <ColContentToRight>
                    {category(detailsEditMode)}
                </ColContentToRight>
            </ProductDetailsContainer>
            <ProductDetailsContainer>
                <Col>
                    <Form>
                        <Row>
                            <ColContentToRight>
                                <FormGroup>
                                    <StyledInput
                                        type="select"
                                        name={"selectItemsCount"}
                                        id={"selectItemsCount"}
                                        onChange={handleItemsCountChange}
                                        value={selectedItemsCount}
                                    >{/*TODO: Zkaodzic to pozniej*/}
                                        {[1, 2, 3, 4, 5].map((count, key) =>
                                            <option key={key} value={count}>{count}</option>
                                        )}
                                    </StyledInput>
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
                <VisibleToRoles roles={[ADMIN_ROLE]}>
                    <ImageGallery
                        title={"Edit Product Images"}
                        onImageAdded={handleImageAddedToProduct}
                        toggle={toggleProductGallery}
                        isOpen={productGalleryVisible}
                    >
                        {product.images && product.images.map(
                            (img, key) => <ImageGalleryItem
                                key={key}
                                src={createUrl(img.href)}
                                onDelete={handleProductImageDelete(img.id)}
                            />
                        )}
                    </ImageGallery>
                </VisibleToRoles>
            </ProductDetailsContainer>
        </ProductDetailsBox>
    )
}


const StyledDescriptionBody = styled(CardBody)`
  background-color: ${props => props.theme.secondary};
  color: ${props => props.theme.textLight};
`

const DescriptionCaption = styled.h3`
  font-weight: bold;
  letter-spacing: 0.5px;

`

const TextArea = styled(Input)`
  background-color: ${props => props.theme.secondaryDark};
  color: ${props => props.theme.textLight};
  border-color: ${props => props.theme.primaryDark};

  &:focus {
    background-color: ${props => props.theme.secondaryDark};
    color: ${props => props.theme.textLight};
    border-color: ${props => props.theme.primaryDark};

    box-shadow: none;
  }
`

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
            <StyledDescriptionBody>
                <CardTitle>
                    <Row>
                        <Col>
                            <DescriptionCaption>{caption}</DescriptionCaption>
                        </Col>
                        <VisibleToRoles roles={[ADMIN_ROLE]}>
                            <Col sm={"auto"}>
                                {editMode ?
                                    <ChangeButtonActions onDiscard={handleDiscardChanges} onSave={handleSaveChanges}/>
                                    :
                                    <EditButton onClick={toggleEditMode}/>
                                }
                            </Col>
                        </VisibleToRoles>
                    </Row>
                </CardTitle>
                {!editMode ?
                    <CardText style={{whiteSpace: "pre-line"}}>
                        {getValueFor(field) ?? content}
                    </CardText>
                    :
                    <TextArea
                        type={"textarea"}
                        value={getValueFor(field) ?? content}
                        onChange={handleProductChange(field)}
                        rows={16}
                    />
                }
            </StyledDescriptionBody>
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

    const getImagesLinks = () => {
        if (product.images && product.images.length > 0) {
            return product.images.map(image => {
                return {
                    src: createUrl(image.href)
                }
            })
        } else {
            return [{
                src: ExampleImage
            }];
        }
    }


    return (
        <PageContainer>
            <ProductChangesContextProvider productId={product.id} updateProduct={(p) => setProduct(p)}>
                <Row>
                    <Col style={{
                        margin: "2em"
                    }}>
                        <ProductImages items={getImagesLinks()}/>
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
