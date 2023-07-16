import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/button/Button';
import { CartContext } from 'context/cartContext/cartContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ProductDetail from './ProductDetail';
import Modal from 'components/modal/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from 'context/authContext/AuthContext';
import { handleAddToCart, handleRemoveFromCart } from 'utils/handleCart';
import { v4 as uuidv4 } from 'uuid';
const ProductItem = ({ productData }) => {
    const { cart, dispatch } = useContext(CartContext);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // Sales off Calculation
    const saleOffs = (originalprice, promotionprice) => {
        return (
            ((originalprice - promotionprice) / originalprice) *
            100
        ).toFixed(1);
    };

    // render Product Detail
    const renderAddToCart = () => {
        const find = cart?.find(
            (item) => item.productData.id === productData.id
        );
        if (find) {
            return (
                <>
                    <span
                        className='bg-slate-200 flex justify-center items-center p-3 rounded-l-lg productItem__button--minus'
                        onClick={() => {
                            handleRemoveFromCart(
                                productData,
                                currentUser.uid,
                                dispatch
                            );
                        }}
                    >
                        <FontAwesomeIcon icon={faMinus} />
                    </span>
                    <Button className='inline-block productItem__button--quantity p-2 px-4 flex-1 text-xl'>
                        <span className='flex-1'>{find.quantity}</span>
                    </Button>
                    <span
                        className='bg-slate-200 flex justify-center items-center p-3 rounded-r-lg productItem__button--plus'
                        onClick={() =>
                            handleAddToCart(
                                productData,
                                currentUser.uid,
                                dispatch
                            )
                        }
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                </>
            );
        } else {
            return (
                <>
                    <Button
                        className='inline-block productItem__button p-2 rounded-l-lg px-4 flex-1'
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!currentUser) {
								const temID = uuidv4()
                                handleAddToCart(
                                    productData,
                                    `NoUser_${temID}`,
                                    dispatch
                                );
                            } else {
                                handleAddToCart(
                                    productData,
                                    currentUser.uid,
                                    dispatch
                                );
                            }
                        }}
                    >
                        <span className='flex-1 text-xl'>Add to Cart</span>
                    </Button>
                    <span
                        className='bg-slate-200 flex justify-center items-center p-3 rounded-r-lg productItem__button__icon'
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(
                                productData,
                                currentUser.uid,
                                dispatch
                            );
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                </>
            );
        }
    };
    return (
        <div className='bg-white rounded-xl productItem__container flex flex-col w-full cursor-pointer'>
            <div className='flex flex-col h-full'>
                <div className='w-3/4 m-auto md:w-11/12 h-[50%]'>
                    <Link
                        to={`/product/${productData.id}`}
                        className='inline-block h-full w-full'
                    >
                        <img
                            src={productData.image}
                            alt='productImage'
                            className='object-contain w-full h-full rounded-t-xl productItem__image'
                        />
                    </Link>
                </div>
                <div className='flex flex-col'>
                    <span className='pl-6 py-2 inline-block text-xl font-semibold'>
                        ${productData.promotionprice} / {productData.unit}
                        <span className='pl-4 font-light line-through text-slate-400'>
                            ${productData.originalprice} / {productData.unit}
                        </span>
                    </span>

                    <p className='pl-6 text-xl font-light text-slate-500 h-[40px]'>
                        {productData.name}
                    </p>
                    <div className='flex justify-center text-base p-2 border-slate-300 m-auto w-10/12 my-5 rounded-lg text-slate-400 productItem__button__container'>
                        {renderAddToCart()}
                    </div>
                    <p className='text-sm product__percentage'>
                        {saleOffs(
                            productData.originalprice,
                            productData.promotionprice
                        )}
                        %
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
