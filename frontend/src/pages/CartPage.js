import {PageContainer} from "../components/Utils";
import {useContext, useEffect, useState} from "react";
import {userContext} from "../providers/UserContextProvider";
import {CartContext} from "../providers/CartContextProvider";
import {Button, Col, Row} from "reactstrap";


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
                    <Col>
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
        <Row>
            <Col>
                {items.map((item, idx) => <CartItem key={idx} item={item}/>)}
            </Col>
        </Row>
    );
}

const CartItem = ({item}) => {

    return (
        <>
            <Row>
                <Col>{item.product.caption}</Col>
                <Col>{item.quantity}</Col>
                <Col>{item.totalPrice}</Col>
            </Row>
        </>
    );
}

const CartDetails = ({price}) => {

    const handleProductOrderCreation = () => {

    }

    return (
        <Row>
            <Col>
                <Row>
                    <Col>
                        Total Price: {price} PLN
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={handleProductOrderCreation} color={"success"}>
                            Submit order
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>

    );
}


export default CartPage;


