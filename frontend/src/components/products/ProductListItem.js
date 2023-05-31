import {Button, Col, Row} from "reactstrap";
import {SimpleLink, ItemImage} from "../Utils";

import ExampleImage from "../../images/ExampleTShirt.jpg"
import styled from "styled-components";
import {useContext} from "react";
import {CartContext} from "../../providers/CartContextProvider";
import {useNavigate} from "react-router-dom"
import {createUrl} from "../../providers/UserContextProvider";

export const ProductLink = styled(SimpleLink)`
  font-weight: bold;
  letter-spacing: 1px;
`

const PriceContainer = styled(Col)`
  width: 100%;
  display: flex;
  justify-content: right;

  color: ${props => props.theme.light};
`

const ProductPrice = ({price}) => {

    return (
        <Row>
            <PriceContainer>
                <h4 style={{
                    fontWeight: "bold"
                }}>{price} PLN</h4>
            </PriceContainer>
        </Row>
    );
}

const ProductRow = styled(Row)`
  background-color: ${props => props.theme.secondaryDark};
  padding: 1em;

  &:nth-child(2n) {
    background-color: ${props => props.theme.secondary};
  }
`

const ProductListItem = ({product}) => {
    const {addItemToCart} = useContext(CartContext);
    const navigate = useNavigate()

    const handleAddItemToCart = (productId) => {
        addItemToCart(productId, 1);
        navigate("/cart");
    }

    const getMainImage = () => {
        if(product.images && product.images.length > 0){
            return createUrl(product.images[0].href);
        }

        return ExampleImage;
    }

    return (
        <ProductRow>
            <Col md={"auto"}>
                <ItemImage imageSrc={getMainImage()}/>
            </Col>
            <Col>
                <ProductLink to={`/product/${product.id}`}>
                    {product.caption}
                </ProductLink>
            </Col>
            <Col md={{
                size: 2,
                alignItems: "bottom"
            }}>
                <ProductPrice price={product.price}/>
                <Row style={{
                    marginTop: "0.5em"
                }}>
                    <Button onClick={() => handleAddItemToCart(product.id)} color={"success"}>Add to cart</Button>
                </Row>
            </Col>
        </ProductRow>
    );
}

export default ProductListItem;
