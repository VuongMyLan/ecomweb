import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from 'components/header/Header';
import React, { useContext, useEffect, useState } from 'react';
import { Steps } from 'antd';
import './order.scss';
import { useParams } from 'react-router-dom';
import { doc, collection, getDoc, query, where } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { AuthContext } from 'context/authContext/AuthContext';

const OrderDetail = () => {
    const { ordernumber } = useParams();
    const [orderProduct, setOrderProduct] = useState({});
    // Get order
    const { currentUser } = useContext(AuthContext);
    const queryData = async (ordernumber, uid) => {
        const docRef = doc(db, 'orders', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const order = Object.values(docSnap.data())?.filter(
                (item) => item.ordernumber === ordernumber
            );
            setOrderProduct(...order);
        } else {
            // docSnap.data() will be undefined in this case
            console.log('No such document!');
        }
    };
    // console.log('orderProduct', orderProduct);

    const { cart, createAt, received, status, totalPayment } = orderProduct;
    const description = ' ';

    const processStage = [
        'Order Placed',
        'Order Processing',
        'Order Shipped Out',
        'Order Completed',
    ];

    useEffect(() => {
        queryData(ordernumber, currentUser.uid);
    }, []);

    console.log(processStage.indexOf(status));
    return (
        <>
            <Header />
            <div className='mt-[80px] orderDetail__container'>
                <div className='h-full'>
                    <a href='/' className='inline-block m-2 text-main'>
                        <span className='mr-4'>
                            <FontAwesomeIcon icon={faHouse} />
                        </span>
                        Back to home
                    </a>
                </div>
                <div className='bg-slate-100 m-3 rounded-md mb-[80px] border-b mt-0'>
                    <div className='flex items-center justify-around'>
                        <div className='py-4 font-bold'>
                            <p className='px-3'>Order Status:</p>
                            <p className='border rounded-3xl bg-orange-400 py-2 px-4 text-slate-50 mt-2'>
                                {status}
                            </p>
                        </div>
                        <div className='py-4 font-bold'>
                            <p className='px-3'>Payment Method</p>
                            <p className='border rounded-3xl bg-main py-2 px-4 text-slate-50 mt-2'>
                                Cash On Delivery
                            </p>
                        </div>
                    </div>
                    <div className='p-2 w-11/12 m-auto'>
                        <p className='font-bold text-xl text-center text-main'>
                            Order Number: #{ordernumber}
                        </p>
                        <div className='m-7'>
                            <Steps
                                direction='vertical'
                                size='medium'
                                current={processStage.indexOf(status)}
                                items={[
                                    {
                                        title: 'Order Placed',
                                        description,
                                        status:
                                            status === 'Order Placed'
                                                ? 'finish'
                                                : '',
                                    },
                                    {
                                        title: 'Order Processing',
                                        status:
                                            status === 'Order Processing'
                                                ? 'finish'
                                                : '',
                                    },
                                    {
                                        title: 'Order Shipped Out',
                                        description,
                                        status:
                                            status === 'Order Shipped Out'
                                                ? 'finish'
                                                : '',
                                    },
                                    {
                                        title: 'Order Completed',
                                        description,
                                        status:
                                            status === 'Order Completed'
                                                ? 'finish'
                                                : '',
                                    },
                                ]}
                            />
                        </div>
                        <div>
                            <p className='text-xl font-semibold mt-7 mb-3'>
                                Order Detail:
                            </p>
                            <p>
                                <span className='inline-block w-[150px] font-semibold py-2'>
                                    Date
                                </span>
                                : 21 Jun 2023
                            </p>
                            <p>
                                <span className='inline-block w-[150px] font-semibold py-2'>
                                    Delivery by
                                </span>
                                : SPX express
                            </p>
                            <p>
                                <span className='inline-block w-[150px] font-semibold py-2'>
                                    Shipping Address
                                </span>
                                : Unit 1707 Corgi Boulevard, LA, USA
                            </p>
                            <p>
                                <span className='inline-block w-[150px] font-semibold py-2'>
                                    Billing Address
                                </span>
                                : Unit 1707 Corgi Boulevard, LA, USA
                            </p>
                        </div>
                        <div>
                            <p className='text-xl font-semibold mt-7 mb-3'>
                                Total Amount Detail:
                            </p>
                            <p>
                                <span className='inline-block w-[150px] font-semibold py-2'>
                                    Cost
                                </span>
                                : $21
                            </p>
                            <p>
                                <span className='inline-block w-[150px] font-semibold py-2'>
                                    Shipping fee
                                </span>
                                : $5
                            </p>
                            <p>
                                <span className='inline-block w-[150px] font-semibold py-2'>
                                    Discount
                                </span>
                                : $xx
                            </p>
                            <p>
                                <span className='inline-block w-[150px] font-semibold py-2'>
                                    Total Amount
                                </span>
                                : ${totalPayment}
                            </p>
                        </div>
                        <div>
                            <p className='text-xl font-semibold mt-7 mb-3'>
                                Purchase Detail:
                            </p>
                            {cart?.map((item, index) => (
                                <div
                                    className='flex bg-slate-50 items-center justify-between my-1 md:hidden'
                                    key={index}
                                >
                                    <div className='flex items-center'>
                                        <div className='p-2 mr-3'>
                                            <img
                                                src={item.productData.image}
                                                className='w-[80px] h-[80px]'
                                                alt=''
                                            />
                                        </div>
                                        <div className='p-2'>
                                            <p className='text-base font-bold'>
                                                {item.productData.name}
                                            </p>
                                            <p className='text-main'>
                                                ${' '}
                                                {
                                                    item.productData
                                                        .promotionprice
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-end'>
                                        <div className='text-center mr-3'>
                                            <span className='mr-4'>
                                                x {item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className='flex bg-slate-50 items-center justify-between my-1 md:hidden'>
                                <div className='flex items-center'>
                                    <div className='p-2 mr-3'>
                                        <img
                                            src='https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/products%2Ffruits%2FApples%20(2).jpg?alt=media&token=bfb0aa99-3a59-4124-8f00-91b27228af0f'
                                            className='w-[80px] h-[80px]'
                                            alt=''
                                        />
                                    </div>
                                    <div className='p-2'>
                                        <p className='text-base font-bold'>
                                            Apples
                                        </p>
                                        <p className='text-main'>$ 15.00</p>
                                    </div>
                                </div>
                                <div className='flex items-center justify-end'>
                                    <div className='text-center mr-3'>
                                        <span className='mr-4'>x 1</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex bg-slate-50 items-center justify-between my-1 md:hidden'>
                                <div className='flex items-center'>
                                    <div className='p-2 mr-3'>
                                        <img
                                            src='https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/products%2Ffruits%2FApples%20(2).jpg?alt=media&token=bfb0aa99-3a59-4124-8f00-91b27228af0f'
                                            className='w-[80px] h-[80px]'
                                            alt=''
                                        />
                                    </div>
                                    <div className='p-2'>
                                        <p className='text-base font-bold'>
                                            Apples
                                        </p>
                                        <p className='text-main'>$ 15.00</p>
                                    </div>
                                </div>
                                <div className='flex items-center justify-end'>
                                    <div className='text-center mr-3'>
                                        <span className='mr-4'>x 1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderDetail;
