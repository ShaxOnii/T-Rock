import {PageContainer} from "../components/Utils";
import {useContext, useEffect} from "react";
import {userContext} from "../providers/UserContextProvider";
import {CartContext} from "../providers/CartContextProvider";
import {Button, Col, Row} from "reactstrap";
import {useNavigate} from "react-router-dom"
import ProductOrderItemList from "../components/ProductOrderListItem";
import styled from "styled-components";

const CartPage = () => {
    const {isCartEmpty, getCart, fetchCart} = useContext(CartContext);

    useEffect(() => {
        fetchCart()
    }, [fetchCart])

    return (
        <PageContainer>
            {isCartEmpty() ?
                <EmptyCartPage/>
                :
                <Row>
                    <Col md={8}>
                        <ProductOrderItemList title={"Your Cart"} editable={true} items={getCart().items}/>
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

const CartDetailsContainer = styled(Row)`
  background-color: ${props => props.theme.secondary};
  padding: 1em;
  margin-left: 1em;

  color: ${props => props.theme.textLight};;
`

const CartDetails = ({price}) => {
    const {Api} = useContext(userContext);
    const navigate = useNavigate();

    const handleProductOrderCreation = () => {
        Api("ProductOrder/CreateFromCart", {
            method: "POST"
        }).then(([result, isOk]) => {
            if (isOk) {
                navigate(`/productOrder/${result.id}`)
            }
        })
    }

    return (
        <CartDetailsContainer>
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
        </CartDetailsContainer>

    );
}


export default CartPage;


