import React, { useContext, useEffect } from 'react';
import { Table, Empty } from 'antd';
import { useState } from 'react';
import { CartContext } from 'context/cartContext/cartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from 'context/authContext/AuthContext';
import {
    handleAddToCart,
    handleRemoveFromCart,
    deleteItem,
    handleCreateOrder,
} from 'utils/handleCart';
import { db, storage } from '../../firebase';
import {
    doc,
    getDoc,
    updateDoc,
    setDoc,
    deleteDoc,
    serverTimestamp,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const Cart = () => {
    const [top, setTop] = useState('topLeft');
    const [bottom, setBottom] = useState('bottomRight');
    const { cart, dispatch } = useContext(CartContext);
    const { currentUser } = useContext(AuthContext);

    // Calculate total payment
    console.log('cart', cart);
    let totalPayment;
    if (cart) {
        totalPayment = cart?.reduce((totalPaid, curVal) => {
            return (
                parseFloat(curVal.productData.promotionprice) *
                    parseFloat(curVal.quantity) +
                totalPaid
            );
        }, 0);
    }

    const columns = [
        {
            title: () => (
                <div className='text-center text-base lg:text-xl'>
                    Item
                </div>
            ),
            dataIndex: 'Item',
            key: 'Item',
            render: (_, record, index) => {
                return (
                    <div
                        className='flex items-center justify-center text-base lg:text-xl'
                        key={index}
                    >
                        <img
                            src={record.productData.image}
                            alt=''
                            className='w-[80px] h-[80px] text-center'
                        />
                    </div>
                );
            },
        },
        {
            title: () => (
                <div className='text-center text-base  lg:text-xl'>
                    Name
                </div>
            ),
            dataIndex: 'productData.name',
            key: 'productData.name',
            render: (_, record, index) => {
                return (
                    <div
                        className='text-center text-base  lg:text-xl'
                        key={index}
                    >
                        {record.productData.name}
                    </div>
                );
            },
        },
        {
            title: () => (
                <div className='text-center text-base lg:text-xl'>
                    Price
                </div>
            ),
            dataIndex: 'promotionprice',
            key: 'promotionprice',
            render: (_, record, index) => {
                return (
                    <div
                        className='text-center text-base lg:text-xl'
                        key={index}
                    >
                        $ {record.productData.promotionprice}
                    </div>
                );
            },
        },
        {
            title: () => (
                <div className='text-center text-base lg:text-xl'>
                    Quantity
                </div>
            ),
            key: 'quantity',
            dataIndex: 'quantity',
            render: (_, record, index) => {
                return (
                    <div
                        className='text-center text-base lg:text-xl'
                        key={index}
                    >
                        <span
                            className='mr-4 bg-main hover:bg-hovermain text-slate-50 p-1 rounded-sm text-xs px-[6px]'
                            onClick={() => {
                                handleRemoveFromCart(
                                    record.productData,
                                    currentUser.uid,
                                    dispatch
                                );
                                // dispatch({
                                //     type: 'REMOVE_FROM_CART',
                                //     payload: {
                                //         productData: item.productData,
                                //         quantity: 1,
                                //     },
                                // });
                            }}
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </span>
                        <span className='mr-4'>{record.quantity}</span>
                        <span
                            className='bg-main hover:bg-hovermain text-slate-50 p-1 rounded-sm text-xs px-[6px]'
                            onClick={(e) =>
                                handleAddToCart(
                                    record.productData,
                                    currentUser.uid,
                                    dispatch
                                )
                            }
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                    </div>
                );
            },
        },
        {
            title: () => (
                <div className='text-center text-base lg:text-xl'>
                    Action
                </div>
            ),
            key: 'action',
            dataIndex: 'action',
            render: (_, record, index) => (
                <div
                    className='cursor-pointer hover:text-main text-center text-base lg:text-xl'
                    key={index}
                    onClick={() => {
                        deleteItem(record.productData, currentUser.uid);
                        // dispatch({
                        //     type: 'DELETE_ITEM',
                        //     payload: {
                        //         productData: record.productData,
                        //         quantity: 1,
                        //     },
                        // });
                    }}
                >
                    Delete
                </div>
            ),
        },
    ];
    const locale = {
        emptyText: (
            <Empty
                description='No items are added to cart'
                className='text-xl text-center flex flex-col items-center font-bold'
                image='https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/products%2FEmptyCart.png?alt=media&token=b9a783dc-f0ae-436a-be28-0c39036374b1'
                imageStyle={{
                    height: 400,
                }}
            />
        ),
    };
    return (
        <div className='bg-slate-100 py-[10px]'>
            <div className='hidden md:block mt-[80px] xl:w-[80%] xl:mx-auto shadow'>
                <Table
                    columns={columns}
                    pagination={false}
                    dataSource={cart}
                    rowKey={(record) => record.productData.id}
                    locale={locale}
                />
            </div>
            <div className='md:hidden flex-col mt-[80px]'>
                {cart?.length === 0 ? (
                    <div className='text-center text-xl mt-5 md:hidden'>
                        <img
                            src='https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/products%2FEmptyCart.png?alt=media&token=b9a783dc-f0ae-436a-be28-0c39036374b1'
                            alt='empty cart'
                        />
                        <p className='font-bold'>No items are added to cart</p>
                    </div>
                ) : (
                    cart?.map((item, index) => (
                        <div
                            className='flex bg-white items-center justify-between my-1 md:hidden'
                            key={index}
                        >
                            <div className='w-1/2 flex items-center'>
                                <div className='p-2 mr-3'>
                                    <img
                                        src={item.productData.image}
                                        className='w-[80px] h-[80px]'
                                        alt=''
                                    />
                                </div>
                                <div className='p-2 mr-4'>
                                    <p className='text-base font-bold'>
                                      <Link to={`/product/${item.productData.id}`}>{item.productData.name}</Link>
                                    </p>
                                    <p className='font-normal'>
                                        $ {item.productData.promotionprice} /{' '}
                                        {item.productData.unit}
                                    </p>
                                </div>
                            </div>
                            <div className='w-1/2 flex items-center justify-end'>
                                <div className='text-center mr-3'>
                                    <span
                                        className='mr-4 bg-main hover:bg-hovermain text-slate-50 p-1 rounded-sm text-xs px-[6px]'
                                        onClick={() => {
                                            handleRemoveFromCart(
                                                item.productData,
                                                currentUser.uid,
                                                dispatch
                                            );
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faMinus} />
                                    </span>
                                    <span className='mr-4'>
                                        {item.quantity}
                                    </span>
                                    <span
                                        className='bg-main hover:bg-hovermain text-slate-50 p-1 rounded-sm text-xs px-[6px]'
                                        onClick={(e) =>
                                            handleAddToCart(
                                                item.productData,
                                                currentUser.uid,
                                                dispatch
                                            )
                                        }
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </span>
                                </div>
                                <div className='w-1/4 pl-2'>
                                    <span
                                        className='p-2 border-main border-[1px] rounded-md'
                                        onClick={() => {
                                            deleteItem(
                                                item.productData,
                                                currentUser.uid
                                            );
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            className='cursor-pointer'
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}

            </div>
                {cart?.length > 0 && (
                    <div className='text-right flex mt-[20px] flex-col sm:justify-end sm:flex-row sm:items-center mb-[70px] xl:w-[70%] xl:mx-auto '>
                        <p className='bg-main text-slate-50 font-bold rounded-md text-base w-11/12 m-auto text-left sm:mx-[50px] px-[30px] py-[10px] mb-[20px] sm:text-center'>
                            Total Payment:{' '}
                            <span className='font-bold pl-[10px] text-2xl'>
                                ${totalPayment.toFixed(2)}{' '}
                            </span>
                        </p>
                        <Link
                            to='/checkout'
                            className='block w-11/12 m-auto text-center mt-0 h-[52px]'
                        >
                            <p className='h-[52px] bg-slate-200 text-slate-600 font-bold rounded-md px-[10px] py-[10px] text-base border cursor-pointer hover:border-main hover:border  sm:mr-[50px] sm:py-[10px] sm:text-center sm:px-1 leading-[30px]'>
                                Go to checkout page
                            </p>
                        </Link>
                    </div>
                )}
        </div>
    );
};

export default Cart;
