import {Button, Col, Row} from "reactstrap";
import {SimpleLink, ItemImage} from "../Utils";

import ExampleImage from "../../images/ExampleTShirt.jpg"
import styled from "styled-components";
import {useContext} from "react";
import {CartContext} from "../../providers/CartContextProvider";


export const ProductLink = styled(SimpleLink)`
  font-weight: bold;
  letter-spacing: 1px;
`

const ProductPrice = ({price}) => {

    return (
        <Row>
            <Col style={{
                width: "100%",
                display: "flex",
                justifyContent: "right",
            }}>
                <h4 style={{
                    fontWeight: "bold"
                }}>{price} PLN</h4>
            </Col>
        </Row>
    );
}

const ProductListItem = ({product}) => {
    const {addItemToCart} = useContext(CartContext);

    const handleAddItemToCart = (productId) => {
        addItemToCart(productId, 1);
    }

    return (
        <Row style={{
            backgroundColor: "#eee",
            marginTop: "2em",
            padding: "1em",
            borderRadius: "0.5em"
        }}>
            <Col md={"auto"}>
                <ItemImage imageSrc={ExampleImage}/>
            </Col>
            <Col>
                <ProductLink to={`/product/${product.id}`}>
                    {product.caption}
                </ProductLink>
            </Col>
            <Col md={{
                size: 2,
                alignItems: "bottom"
            }} >
                <ProductPrice price={product.price}/>
                <Row style={{
                    marginTop: "0.5em"
                }}>
                    <Button onClick={() => handleAddItemToCart(product.id)} color={"success"}>Add to cart</Button>
                </Row>
            </Col>
        </Row>
    );
}

export default ProductListItem;
