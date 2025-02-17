import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {userContext} from "./UserContextProvider";


const CartContext = createContext();

const CartContextProvider = ({children}) => {
    const {Api, isLogged} = useContext(userContext);

    const [cart, setCart] = useState({})

    const fetchCart = useCallback(() => {
        if(isLogged()){
            Api("Cart").then(([result, isOk]) => {
                if (isOk) {
                    setCart(result);
                }
            })
        }
    }, [Api, isLogged])

    useEffect(() => {
            fetchCart();
    }, [fetchCart]);

    const isCartEmpty = () => {
        return !cart.items || cart.items.length <= 0;
    }

    const getCartItems = () => {
        return cart.items
    }

    const ADD_ITEM = "add"
    const REMOVE_ITEM = "remove"

    const changeCart = (action) => (productId, count) => {
        if (count > 0) {
            Api(`Cart/${action}`, {
                method: 'POST',
                body: [{productId, count}]
            }).then(([res, isOk]) => {
                if (isOk) {
                    fetchCart();
                }
            })
        }
    }

    const addItemToCart = changeCart(ADD_ITEM)

    const removeItemToCart = changeCart(REMOVE_ITEM)

    const getCart = () => {
        return cart;
    }

    return (
        <CartContext.Provider value={{
            isCartEmpty, getCartItems, addItemToCart, removeItemToCart, fetchCart, getCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export {CartContext, CartContextProvider};




