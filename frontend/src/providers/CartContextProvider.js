import {createContext, useContext, useEffect, useState} from "react";
import {userContext} from "./UserContextProvider";


const CartContext = createContext();

const CartContextProvider = ({children}) => {
    const {Api, isLogged} = useContext(userContext);

    const {cart, setCart} = useState({})

    useEffect(() => {
        if(isLogged){
            // TODO: Fetch cart
        }
    }, [isLogged]);

    const isCartEmpty = () => {
      return !!cart.items;
    }

    const getCartItems = () => {
        return cart.items
    }

    return (
        <CartContext.Provider value={{
            isCartEmpty, getCartItems
        }}>
            {children}
        </CartContext.Provider>
    )
}

export {CartContext, CartContextProvider};




