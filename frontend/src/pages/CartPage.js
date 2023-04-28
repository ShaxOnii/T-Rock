import {PageContainer} from "../components/Utils";
import {useContext, useEffect, useState} from "react";
import {userContext} from "../providers/UserContextProvider";
import {CartContext} from "../providers/CartContextProvider";
import {Col, Row} from "reactstrap";


const CartPage = () => {
    const {Api} = useContext(userContext);
    const {isCartEmpty, getCartItems} = useContext(CartContext);

    return (
        <PageContainer>
            {isCartEmpty() ?
                <EmptyCartPage/>
                :
                <CartList items={getCartItems()}/>
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

        </>
    );
}

const CartDetails = ({price}) => {

    return (
        <>

        </>
    );
}


export default CartPage;


