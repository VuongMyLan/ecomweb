import { createContext, useReducer, useEffect } from 'react';
import cartReducer from './cartReducer';
import images from 'assets/img/index';
const Cart = {
    cart: [],
};

export const CartContext = createContext(Cart);
export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, Cart);
    return (
        <CartContext.Provider
            value={{
                cart: state.cart,
                dispatch,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
