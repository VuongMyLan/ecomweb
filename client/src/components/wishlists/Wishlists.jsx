import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/button/Button';
import { AuthContext } from 'context/authContext/AuthContext';
import { CartContext } from 'context/cartContext/cartContext';
import React, { useContext, useEffect, useState } from 'react';
import {
    handleAddToCart,
    handleRemoveFromCart,
    removeFromWishList,
} from 'utils/handleCart';
import {
    collection,
    doc,
    getDocs,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';
import { db, storage } from '../../firebase';
import './wishlist.scss';
import { Link } from 'react-router-dom';
const Wishlists = ({ className }) => {
    const { cart, dispatch } = useContext(CartContext);
    const { currentUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [wishlist, setWishlists] = useState([]);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        const unsub = onSnapshot(
            doc(db, 'wishlists', currentUser.uid),
            (doc) => {
                console.log('Current data: ', doc.data());
                const newArr = [];
                if (doc.data()) {
                    Object.values(doc.data())?.forEach((item) =>
                        newArr.push(item)
                    );
                    console.log('wishlist', wishlist);
                    setWishlists(newArr);
                }
            }
        );
        return () => {
            unsub();
        };
    }, [currentUser.uid, dispatch]);

    const renderAddToCart = ({ productData, quantity }) => {
        const find = cart?.find(
            (item) => item.productData.id === productData.id
        );
        if (find) {
            return (
                <div className='flex m-2 mr-4 justify-center items-center'>
                    <span
                        className='block justify-center items-center px-3 py-1 productItem__button--minus text-slate-50 bg-main hover:bg-hovermain rounded-md'
                        onClick={() => {
                            handleRemoveFromCart(
                                productData,
                                currentUser.uid,
                                dispatch
                            );
                        }}
                    >
                        <FontAwesomeIcon icon={faMinus} className='text-sm' />
                    </span>
                    <Button className='block productItem__button--quantity p-2 px-4 flex-1'>
                        <span className='flex-1 text-main'>
                            {find.quantity}
                        </span>
                    </Button>
                    <span
                        className='bg-main block justify-center items-center px-3 py-1 productItem__button--plus text-slate-50 hover:bg-hovermain rounded-md'
                        onClick={() => {
                            handleAddToCart(
                                productData,
                                currentUser.uid,
                                dispatch
                            );
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} className='text-sm' />
                    </span>
                </div>
            );
        } else {
            return (
                <>
                    <Button
                        className='productItem__button px-2 sm:flex-1 text-main font-bold hover:bg-main hover:text-slate-50 rounded-md flex items-center justify-center mr-2'
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(
                                productData,
                                currentUser.uid,
                                dispatch
                            );
                        }}
                    >
                        <span className='text-base min-w-[20px] inline-block my-2 px-2 '>
                            Add to Cart
                        </span>
                    </Button>
                </>
            );
        }
    };
    return (
        <div className={`${className}`}>
            {wishlist.length === 0 ? (
                <div className='text-center text-xl mt-5 m-auto '>
                    <img
                        src='https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/products%2FEmptyCart.png?alt=media&token=b9a783dc-f0ae-436a-be28-0c39036374b1'
                        alt='empty cart'
                        className='sm: w-[500px] sm:h-[400px] m-auto'
                    />
                    <p className='font-bold mt-5'>
                        No items are added to your wishlist
                    </p>
                </div>
            ) : (
                <div className='m-auto bg-slate-100 mt-4 rounded-md shadow'>
                    {wishlist?.map((item, i) => (
                        <div
                            className='flex items-left justify-between my-1 bg-white shadow rounded-md flex-col sm:flex-row'
                            key={i}
                        >
                            <div className='flex items-center'>
                                <div className='p-2 mr-3 '>
                                    <img
                                        src={item.productData.image}
                                        className='min-w-[80px] w-[80px] h-[80px] border'
                                        alt=''
                                    />
                                </div>
                                <div className='p-2'>
                                    <p className='text-base font-bold'>
                                        <Link
                                            to={`/product/${item.productData.id}`}
                                        >
                                            {item.productData.name}
                                        </Link>
                                    </p>
                                    <p className='text-main'>
                                        $ {item.productData.promotionprice}{' '}
                                        <span>
                                            $ {item.productData.originalprice}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center sm:justify-end justify-around'>
                                {renderAddToCart(item)}
                                <span
                                    className='mr-4 cursor-pointer hover:text-red-500 hover:font-bold'
                                    onClick={() => {
                                        removeFromWishList(
                                            item.productData,
                                            currentUser.uid
                                        );
                                    }}
                                >
                                    Remove
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlists;
