import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {userContext} from "./UserContextProvider";


const CartContext = createContext();

const CartContextProvider = ({children}) => {
    const {Api, isLogged} = useContext(userContext);

    const [cart, setCart] = useState({})

    const fetchCart = useCallback(() => {
        Api("Cart").then(([result, isOk]) => {
            if (isOk) {
                setCart(result);
            }
        })
    }, [Api])

    useEffect(() => {
        if (isLogged) {
            fetchCart();
        }
    }, [isLogged, fetchCart]);

    const isCartEmpty = () => {
        console.log("isEmpty", !!cart.items)

        return !cart.items;
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
                console.log(res)
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




