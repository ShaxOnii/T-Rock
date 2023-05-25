import {useContext} from "react";
import {CartContext} from "../providers/CartContextProvider";
import {Button, Col, Row} from "reactstrap";
import {ProductLink} from "./products/ProductListItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus as MinusIcon, faPlus as PlusIcon, faXmark as DeleteIcon} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";



const ProductOrderItemList = ({title = "", items, editable = false}) => {
    if (items === undefined) return;

    return (
        <Row style={{
            backgroundColor: "#eee",
            padding: "1em",
            borderRadius: "0.5em"
        }}>
            <h3>{title}</h3>
            <Col>
                {items.map((item, idx) => <ProductOrderListItem key={idx} editable={editable} item={item}/>)}
            </Col>
        </Row>
    );
}

const ListItemContainer = styled(Row)`
  padding: 1em;
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
                    <FontAwesomeIcon icon={MinusIcon}/>
                </Button>}
                <ItemCounter>{item.quantity} {!editable && "szt."}</ItemCounter>
                {editable && <Button onClick={handleAddItem} color={"primary"}>
                    <FontAwesomeIcon icon={PlusIcon}/>
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
                    <FontAwesomeIcon icon={DeleteIcon}/>
                </Button>
            </Col>}
        </ListItemContainer>
    );
}

export default ProductOrderItemList;


