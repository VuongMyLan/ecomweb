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
import CONSTANT_TEXT from 'components/label.js';

const { orderPlaced, orderProcessing, orderShipped, orderCompleted } =
    CONSTANT_TEXT.ORDER__PROGRESS;
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
                image: product.image,
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
export const handleCreateOrder = async (
    cart,
    uid,
    subtotal,
    roundedTotal,
    shippingfee,
    orderID,
    info
) => {
    if (cart.length > 0) {
        const orderCart = [...cart];
        const orderDoc = await doc(db, 'orders', uid);
        // const cartDoc = await doc(db, 'carts', currentUser.uid);
        const document = await getDoc(doc(db, 'orders', uid));
        if (!document.data()) {
            await setDoc(doc(db, 'orders', uid), {
                [orderID]: {
                    ordernumber: orderID,
                    cart: [...orderCart],
                    status: orderPlaced,

                    fee: {
                        subtotal,
                        roundedTotal,
                        shippingfee,
                    },
                    createdAt: serverTimestamp(),
                    info: { ...info },
                },
            });
        } else {
            await updateDoc(orderDoc, {
                [orderID]: {
                    ordernumber: orderID,
                    status: orderPlaced,

                    cart: [...orderCart],
                    fee: {
                        subtotal,
                        roundedTotal,
                        shippingfee,
                    },
                    createdAt: serverTimestamp(),
                    info: { ...info },
                },
            });
        }

        await deleteDoc(doc(db, 'carts', uid));
    }
};

export const handleAddToWishLists = async (product, uid) => {
    const wishlistsDoc = await doc(db, 'wishlists', uid);
    // const cartDoc = await doc(db, 'carts', currentUser.uid);
    const document = await getDoc(doc(db, 'wishlists', uid));
    if (!document.data()) {
        await setDoc(doc(db, 'wishlists', uid), {
            [product.id]: {
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
        await updateDoc(wishlistsDoc, {
            [product.id]: {
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
};

export const removeFromWishList = async (product, uid) => {
    const wishlistsDoc = await doc(db, 'wishlists', uid);
    await updateDoc(wishlistsDoc, {
        [product.id]: deleteField(),
    });
};

export const handleAddToSaveRecipes = async (recipe, uid) => {
    const savedRecipesDoc = await doc(db, 'savedrecipes', uid);
    // const cartDoc = await doc(db, 'carts', currentUser.uid);
    const document = await getDoc(doc(db, 'savedrecipes', uid));
    if (!document.data()) {
        await setDoc(doc(db, 'savedrecipes', uid), {
            [recipe.uri.split('#')[1]]: {
                ...recipe,
            },
        });
    } else {
        await updateDoc(savedRecipesDoc, {
            [recipe.uri.split('#')[1]]: {
                ...recipe,
            },
        });
    }
};

export const removeFromSavedRecipes = async (recipe, uid) => {
    const wishlistsDoc = await doc(db, 'savedrecipes', uid);
    await updateDoc(wishlistsDoc, {
        [recipe.uri.split('#')[1]]: deleteField(),
    });
};
