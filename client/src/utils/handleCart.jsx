import { useContext } from 'react';
import { db, storage } from '../firebase';
import {
    doc,
    getDoc,
    updateDoc,
    deleteField,
    setDoc,
    deleteDoc,
    serverTimestamp,
} from 'firebase/firestore';
import { CartContext } from 'context/cartContext/cartContext';
import { AuthContext } from 'context/authContext/AuthContext';
import { v4 as uuidv4 } from 'uuid';
export const handleAddToCart = async (product, id, dispatch) => {
    const docSnap = await doc(db, 'carts', id);
    const document = await getDoc(doc(db, 'carts', id));
    const productId = parseInt(product.id);
    if (!document.data()) {
        await setDoc(doc(db, 'carts', id), {
            [productId]: {
                productData: {
                    id: product.id,
                    image: product.image,
                    name: product.name,
                    promotionprice: product.promotionprice,
                    unit: product.unit,
                },
                quantity: 1,
            },
        });
    } else {
        if (document.data().hasOwnProperty(productId)) {
            const newQuantity = +document.data()[`${product.id}`].quantity + 1;
            const idQuantity = `${product.id}.quantity`;
            const idProduct = `${product.id}.productData`;
            await updateDoc(docSnap, {
                [idProduct]: {
                    id: product.id,
                    image: product.image,
                    name: product.name,
                    promotionprice: product.promotionprice,
                    unit: product.unit,
                },
                [idQuantity]: newQuantity,
            });
        } else {
            await updateDoc(docSnap, {
                [productId]: {
                    productData: {
                        id: product.id,
                        image: product.image,
                        name: product.name,
                        promotionprice: product.promotionprice,
                        unit: product.unit,
                    },
                    quantity: 1,
                },
            });
        }
    }
};

export const handleRemoveFromCart = async (product, id, dispatch) => {
    const docSnap = await doc(db, 'carts', id);
    const document = await getDoc(doc(db, 'carts', id));
    const productId = parseInt(product.id);
    const idQuantity = `${product.id}.quantity`;
    const idProduct = `${product.id}.productData`;
    if (document.data()[`${product.id}`].quantity > 0) {
        const newQuantity = +document.data()[`${product.id}`].quantity - 1;
        await updateDoc(docSnap, {
            [idProduct]: {
                id: product.id,
                image: '',
                name: product.name,
                promotionprice: product.promotionprice,
                unit: product.unit,
            },
            [idQuantity]: newQuantity,
        });

        // dispatch({
        //     type: 'REMOVE_FROM_CART',
        //     payload: {
        //         productData: product,
        //         quantity: 1,
        //     },
        // });
    }
    if (document.data()[`${product.id}`].quantity === 0) {
        console.log(true);
        await updateDoc(docSnap, {
            [productId]: deleteField(),
        });
    }
};

export const deleteItem = async (product, id) => {
    const docSnap = await doc(db, 'carts', id);
    const document = await getDoc(doc(db, 'carts', id));
    const productId = parseInt(product.id);
    await updateDoc(docSnap, {
        [productId]: deleteField(),
    });
};
export const handleCreateOrder = async (cart, uid, totalPayment) => {
    if (cart.length > 0) {
        const orderCart = [...cart];
        const orderDoc = await doc(db, 'orders', uid);
        // const cartDoc = await doc(db, 'carts', currentUser.uid);
        const document = await getDoc(doc(db, 'orders', uid));
        const id = uuidv4();
        if (!document.data()) {
            await setDoc(doc(db, 'orders', uid), {
                [id]: {
                    ordernumber: id,
                    received: true,
                    cart: [...orderCart],
                    status: 'Order placed',
                    totalPayment: totalPayment,
                    createdAt: serverTimestamp(),
                },
            });
        } else {
            await updateDoc(orderDoc, {
                [id]: {
                    ordernumber: id,
                    received: true,
                    cart: [...orderCart],
                    status: 'Order placed',
                    totalPayment: totalPayment,
                    createdAt: serverTimestamp(),
                },
            });
        }

        await deleteDoc(doc(db, 'carts', uid));
    }
};
