import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useReducer } from 'react';
import { AuthContext } from 'context/authContext/AuthContext';
import orderReducer from './OrderReducer';
const { createContext } = require('react');

const OrderList = {};

export const OrderContext = createContext(OrderList);
export const OrderContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    // console.log(currentUser);
    const [state, dispatch] = useReducer(orderReducer, OrderList);
    useEffect(() => {
        if (currentUser) {
            const unsub = onSnapshot(
                doc(db, 'orders', currentUser.uid),
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
        <OrderContext.Provider value={{ OrderList: state, dispatch }}>
            {children}
        </OrderContext.Provider>
    );
};
