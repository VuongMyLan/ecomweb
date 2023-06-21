import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useReducer } from 'react';
import { AuthContext } from 'context/authContext/AuthContext';
import orderReducer from './OrderReducer';
const { createContext } = require('react');

const Order = {};

export const OrderContext = createContext(Order);
export const OrderContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    // console.log(currentUser);
    const [state, dispatch] = useReducer(orderReducer, Order);
    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'orders', currentUser.uid), (doc) => {
            // console.log('Current data: ', doc.data());
            dispatch({
                type: 'FETCH_DATA',
                payload: { ...doc.data() },
            });
        });
        return () => {
            unsub();
        };
    }, [currentUser, dispatch]);
    return (
        <OrderContext.Provider value={{ Order: state, dispatch }}>
            {children}
        </OrderContext.Provider>
    );
};
