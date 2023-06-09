import React, { useContext } from 'react';
import { Radio, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { CartContext } from 'context/cartContext/cartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [top, setTop] = useState('topLeft');
    const [bottom, setBottom] = useState('bottomRight');
    const { cart, dispatch } = useContext(CartContext);

    // Calculate total payment
    console.log('cart', cart);
    const totalPayment = cart.reduce((totalPaid, curVal) => {
        console.log('curVal', curVal);
        console.log('TotalPaid', totalPaid);
        return (
            parseFloat(curVal.productData.promotionprice) *
                parseFloat(curVal.quantity) +
            totalPaid
        );
    }, 0);
    const columns = [
        {
            title: () => (
                <div className='text-center text-base lg:text-xl xl:text-2xl'>
                    Item
                </div>
            ),
            dataIndex: 'Item',
            key: 'Item',
            render: (_, record) => {
                return (
                    <div className='flex items-center justify-center text-base lg:text-xl xl:text-2xl'>
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
                <div className='text-center text-base  lg:text-xl xl:text-2xl'>
                    Name
                </div>
            ),
            dataIndex: 'productData.name',
            key: 'name',
            render: (_, record) => {
                return (
                    <div className='text-center text-base  lg:text-xl xl:text-2xl'>
                        {record.productData.name}
                    </div>
                );
            },
        },
        {
            title: () => (
                <div className='text-center text-base lg:text-xl xl:text-2xl'>
                    Price
                </div>
            ),
            dataIndex: 'promotionprice',
            key: 'promotionprice',
            render: (_, record) => {
                return (
                    <div className='text-center text-base lg:text-xl xl:text-2xl'>
                        $ {record.productData.promotionprice}
                    </div>
                );
            },
        },
        {
            title: () => (
                <div className='text-center text-base lg:text-xl xl:text-2xl'>
                    Quantity
                </div>
            ),
            key: 'quantity',
            dataIndex: 'tags',
            render: (_, record) => {
                return (
                    <div className='text-center text-base lg:text-xl xl:text-2xl'>
                        <span
                            className='mr-4 bg-main hover:bg-hovermain text-slate-50 p-1 rounded-sm text-xs px-[6px]'
                            onClick={() =>
                                dispatch({
                                    type: 'REMOVE_FROM_CART',
                                    payload: {
                                        productData: record.productData,
                                        quantity: 1,
                                    },
                                })
                            }
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </span>
                        <span className='mr-4'>{record.quantity}</span>
                        <span
                            className='bg-main hover:bg-hovermain text-slate-50 p-1 rounded-sm text-xs px-[6px]'
                            onClick={() =>
                                dispatch({
                                    type: 'ADD_TO_CART',
                                    payload: {
                                        productData: record.productData,
                                        quantity: 1,
                                    },
                                })
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
                <div className='text-center text-base lg:text-xl xl:text-2xl'>
                    Action
                </div>
            ),
            key: 'action',
            dataIndex: 'action',
            render: (_, record) => (
                <div
                    className='cursor-pointer hover:text-main text-center text-base lg:text-xl xl:text-2xl'
                    onClick={() =>
                        dispatch({
                            type: 'DELETE_ITEM',
                            payload: {
                                productData: record.productData,
                                quantity: 1,
                            },
                        })
                    }
                >
                    Delete
                </div>
            ),
        },
    ];
    return (
        <>
            <div className='mt-[5px] hidden md:block lg:mt-[80px] lg:pt-2'>
                <Table columns={columns} pagination={false} dataSource={cart} />
            </div>
            <div className='mb-[70px] flex flex-col '>
                {cart?.map((item, index) => (
                    <div
                        className='flex bg-slate-100 items-center justify-between my-1 md:hidden'
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
                                    {item.productData.name}
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
                                    onClick={() =>
                                        dispatch({
                                            type: 'REMOVE_FROM_CART',
                                            payload: {
                                                productData: item.productData,
                                                quantity: 1,
                                            },
                                        })
                                    }
                                >
                                    <FontAwesomeIcon icon={faMinus} />
                                </span>
                                <span className='mr-4'>{item.quantity}</span>
                                <span
                                    className='bg-main hover:bg-hovermain text-slate-50 p-1 rounded-sm text-xs px-[6px]'
                                    onClick={() =>
                                        dispatch({
                                            type: 'ADD_TO_CART',
                                            payload: {
                                                productData:
                                                    cart[0].productData,
                                                quantity: 1,
                                            },
                                        })
                                    }
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </span>
                            </div>
                            <div className='w-1/4 pl-2'>
                                <span
                                    className='p-2 border-main border-[1px] rounded-md'
                                    onClick={() =>
                                        dispatch({
                                            type: 'DELETE_ITEM',
                                            payload: {
                                                productData: item.productData,
                                                quantity: 1,
                                            },
                                        })
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        className='cursor-pointer'
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                <div className='text-right flex mt-[20px] flex-col sm:justify-end sm:flex-row sm:items-center'>
                    <p className='bg-main text-slate-50 font-bold rounded-md text-base w-11/12 m-auto text-left sm:mx-[50px] px-[30px] py-[10px] mb-[20px] sm:text-center'>
                        Total Payment:{' '}
                        <span className='font-bold pl-[10px] text-2xl'>
                            ${totalPayment}{' '}
                        </span>
                    </p>
                    <Link
                        to='/checkout'
                        className='block w-11/12 m-auto text-center mt-0 h-[52px]'
                    >
                        <p className='h-[52px] bg-slate-100 text-slate-600 font-bold rounded-md px-[10px] py-[10px] text-base border cursor-pointer hover:border-main hover:border  sm:mr-[50px] sm:py-[10px] sm:text-center sm:px-1 leading-[30px]'>
                            Go to checkout page
                        </p>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Cart;
