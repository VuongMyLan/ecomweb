import { createContext, useReducer, useEffect, useContext } from 'react';
import cartReducer from './cartReducer';
import images from 'assets/img/index';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { AuthContext } from 'context/authContext/AuthContext';
import { v4 as uuidv4 } from 'uuid';
const Cart = {
    cart: [],
};

export const CartContext = createContext(Cart);

export const CartContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const [state, dispatch] = useReducer(cartReducer, Cart);

    useEffect(() => {
        if (currentUser) {
            const unsub = onSnapshot(
                doc(db, 'carts', currentUser.uid),
                (doc) => {
                    // console.log('Current data: ', doc.data());
                    dispatch({
                        type: 'FETCH_DATA',
                        payload: { ...doc.data() },
                    });
                }
            );
        } 
    }, [currentUser, dispatch]);

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
