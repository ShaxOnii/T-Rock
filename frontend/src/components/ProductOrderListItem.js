import {useContext} from "react";
import {CartContext} from "../providers/CartContextProvider";
import {Button, Col, Row} from "reactstrap";
import {ProductLink} from "./products/ProductListItem";
import styled from "styled-components";
import {DeleteIcon, MinusIcon, PlusIcon} from "./Utils";


const ProductListContainer = styled(Row)`
  color:${props => props.theme.textLight};
  background-color: ${props => props.theme.secondary};
`

const ListTitle = styled.h3`
  padding: 0.5em;
  font-weight: bold;
  letter-spacing: 1px;
`


const ProductOrderItemList = ({title = "", items, editable = false}) => {
    if (items === undefined) return;

    return (
        <ProductListContainer>
            <ListTitle>{title}</ListTitle>
            <Col>
                {items.map((item, idx) => <ProductOrderListItem key={idx} editable={editable} item={item}/>)}
            </Col>
        </ProductListContainer>
    );
}

const ListItemContainer = styled(Row)`
  padding: 1em;
  background-color: ${props => props.theme.secondaryDark};

  &:nth-child(2n) {
    background-color: ${props => props.theme.secondary};
  }
`

const ItemCounter = styled.div`
  padding: 0.5em;
  flex: 1;
  text-align: center;
  font-size: 1.2em;
`

const ProductOrderListItem = ({editable = false, item}) => {
    const {addItemToCart, removeItemToCart} = useContext(CartContext)

    const handleAddItem = () => {
        addItemToCart(item.product.id, 1);
    }

    const handleRemoveItem = () => {
        removeItemToCart(item.product.id, 1);
    }

    const handleDeleteAll = () => {
        removeItemToCart(item.product.id, item.quantity);
    }

    return (
        <ListItemContainer>
            <Col style={{
                display: "flex",
                alignItems: "center"
            }}>
                <ProductLink to={`/product/${item.product.id}`}>
                    {item.product.caption}
                </ProductLink>
            </Col>
            <Col sm={"auto"} style={{
                display: "flex",
                flexDirection: 'row',
                alignItems: "center",
                padding: "0 0.2em 0 0.2em"
            }}>
                {editable && <Button onClick={handleRemoveItem} color={"primary"}>
                    <MinusIcon/>
                </Button>}
                <ItemCounter>{item.quantity} {!editable && "szt."}</ItemCounter>
                {editable && <Button onClick={handleAddItem} color={"primary"}>
                    <PlusIcon/>
                </Button>}
            </Col>
            <Col md={"2"} style={{
                textAlign: "right",
                marginLeft: "1em",
                marginRight: "1em",
            }}>
                <div style={{
                    fontSize: "1.2em",
                    fontWeight: "bold"
                }}>
                    {item.totalPrice} PLN
                </div>
                <div style={{
                    fontSize: "0.8em"
                }}>
                    szt. {item.product.price} PLN
                </div>
            </Col>
            {editable && <Col md={"auto"} style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Button color={"danger"} onClick={handleDeleteAll}>
                    <DeleteIcon/>
                </Button>
            </Col>}
        </ListItemContainer>
    );
}

export default ProductOrderItemList;


