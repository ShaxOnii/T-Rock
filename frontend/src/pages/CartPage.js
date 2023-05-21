import {PageContainer} from "../components/Utils";
import {useContext, useEffect} from "react";
import {userContext} from "../providers/UserContextProvider";
import {CartContext} from "../providers/CartContextProvider";
import {Button, Col, Row} from "reactstrap";
import styled from "styled-components";
import {ProductLink} from "../components/products/ProductListItem";
import {
    faPlus as PlusIcon,
    faMinus as MinusIcon,
    faXmark as DeleteIcon,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CartPage = () => {
    const {Api} = useContext(userContext);
    const {isCartEmpty, getCart, fetchCart} = useContext(CartContext);

    useEffect(() => {
        fetchCart()
    }, [])

    return (
        <PageContainer>
            {isCartEmpty() ?
                <EmptyCartPage/>
                :
                <Row>
                    <Col md={8}>
                        <CartList items={getCart().items}/>
                    </Col>
                    <Col>
                        <CartDetails price={getCart().totalPrice}/>
                    </Col>
                </Row>
            }
        </PageContainer>
    );
}

const EmptyCartPage = () => {

    return (
        <>
            Cart is empty. Find some koszulkas.
        </>
    );
}

const CartList = ({items}) => {

    return (
        <Row style={{
            backgroundColor: "#eee",
            padding: "1em",
            borderRadius: "0.5em"
        }}>
            <Col>
                {items.map((item, idx) => <CartItem key={idx} item={item}/>)}
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


const CartItem = ({item}) => {
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
                <Button onClick={handleRemoveItem} color={"primary"}>
                    <FontAwesomeIcon icon={MinusIcon}/>
                </Button>
                <ItemCounter>{item.quantity}</ItemCounter>
                <Button onClick={handleAddItem} color={"primary"}>
                    <FontAwesomeIcon icon={PlusIcon}/>
                </Button>
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
            <Col md={"auto"} style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Button color={"danger"} onClick={handleDeleteAll}>
                    <FontAwesomeIcon icon={DeleteIcon}/>
                </Button>
            </Col>
        </ListItemContainer>
    );
}

const CartDetails = ({price}) => {
    const {Api} = useContext(userContext);

    const handleProductOrderCreation = () => {
        Api("ProductOrder/CreateFromCart").then(([result, isOk]) => {
            if (isOk) {

            }
        })
    }

    return (
        <Row style={{
            backgroundColor: "#eee",
            padding: "1em",
            marginLeft: "1em",
            borderRadius: "0.5em"
        }}>
            <Col>
                <Row style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Col style={{
                        fontSize: "1.5em",
                        justifyContent: "center",
                    }}>
                        Total Price:
                    </Col>
                    <Col md={"auto"} style={{
                        fontSize: "2em"
                    }}>
                        {price} PLN
                    </Col>
                </Row>
                <Row style={{
                    paddingTop: "2em"
                }}>
                    <Col>
                        <Button block onClick={handleProductOrderCreation} color={"success"}>
                            Submit order
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>

    );
}


export default CartPage;


