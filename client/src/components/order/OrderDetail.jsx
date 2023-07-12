import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from 'components/header/Header';
import React, { useContext, useEffect, useState } from 'react';
import { Steps } from 'antd';
import './order.scss';
import { Link, useParams } from 'react-router-dom';
import { doc, collection, getDoc, query, where } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { AuthContext } from 'context/authContext/AuthContext';
import ReactLoading from 'react-loading';
import { OrderContext } from 'context/orderContext/OrderContext';
const OrderDetail = () => {
    const { ordernumber } = useParams();
    console.log('params', ordernumber);
    const [orderProduct, setOrderProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [isVertical, setVertical] = useState(window.innerWidth <= 1280);
    const { OrderList } = useContext(OrderContext);
    // Get order
    const { currentUser } = useContext(AuthContext);
    const queryData = async (ordernumber, uid) => {
        // setLoading(true);
        // const docRef = doc(db, 'orders', uid);
        // const docSnap = await getDoc(docRef);
        const order = Object.values(OrderList)?.filter(
            (item) => item.ordernumber === ordernumber
        );
        if (order.length > 0) {
            setOrderProduct(...order);
        }

        // setLoading(false);
        // if (docSnap.exists()) {
        //     console.log('order', order);
        // } else {
        //     // docSnap.data() will be undefined in this case
        //     console.log('No such document!');
        // }
    };
    console.log('orderProduct', orderProduct);

    const {
        cart = [],
        info,
        createdAt,
        received,
        fee,
        status,
        totalPayment,
    } = orderProduct || {};
    const description = ' ';

    const processStage = [
        'Order Placed',
        'Order Processing',
        'Order Shipped Out',
        'Order Completed',
    ];

    useEffect(() => {
        queryData(ordernumber, currentUser.uid);
    }, [OrderList]);

    useEffect(() => {
        const handleVertical = () => {
            if (window.innerWidth <= 1280) {
                setVertical(true);
            } else {
                setVertical(false);
            }
        };
        window.addEventListener('resize', handleVertical);
        return () => {
            window.removeEventListener('resize', handleVertical);
        };
    }, []);

    return (
        <>
            <Header />
            <div className='mt-[85px] orderDetail__container lg:w-3/4 lg:mx-auto xl:w-3/4 xl:mx-auto '>
                <div className='h-full'>
                    <Link to='/' className='inline-block m-2 text-main'>
                        <span className='mr-4'>
                            <FontAwesomeIcon icon={faHouse} />
                        </span>
                        Back to home
                    </Link>
                </div>
                <div className='bg-slate-100 my-3 rounded-md mb-[80px] border-b mt-0'>
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
                                direction={
                                    isVertical ? 'vertical' : 'horizontal'
                                }
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
                        <div className='flex flex-col xl:flex-row xl:justify-around xl:items-center'>
                            <div>
                                <p className='text-xl font-semibold xl:mt-2 mb-3'>
                                    Order Detail:
                                </p>
                                <p>
                                    <span className='inline-block w-[150px] font-semibold py-2'>
                                        Name
                                    </span>
                                    : {info && info.firstName}{' '}
                                    {info && info.lastName}
                                </p>
                                <p>
                                    <span className='inline-block w-[150px] font-semibold py-2'>
                                        Date
                                    </span>
                                    :{' '}
                                    {createdAt &&
                                        createdAt.toDate().toLocaleDateString()}
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
                                    : {info && info.shippingAddress}
                                </p>
                                <p>
                                    <span className='inline-block w-[150px] font-semibold py-2'>
                                        Billing Address
                                    </span>
                                    : {info && info.shippingAddress}
                                </p>
                            </div>
                            <div>
                                <p className='text-xl font-semibold  mt-7 xl:mt-2 mb-3'>
                                    Total Amount Detail:
                                </p>
                                <p>
                                    <span className='inline-block w-[150px] font-semibold py-2'>
                                        Cost
                                    </span>
                                    : ${fee && fee.subtotal}
                                </p>
                                <p>
                                    <span className='inline-block w-[150px] font-semibold py-2'>
                                        Shipping fee
                                    </span>
                                    : ${fee && fee.shippingfee}
                                </p>

                                <p>
                                    <span className='inline-block w-[150px] font-semibold py-2'>
                                        Total Amount
                                    </span>
                                    :{' '}
                                    <span className='font-bold'>
                                        ${fee && fee.roundedTotal}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className='text-xl font-semibold mt-7 mb-3'>
                                Purchase Detail:
                            </p>
                            {cart?.map((item, index) => (
                                <div
                                    className='flex bg-slate-50 items-center justify-between my-1 shadow'
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
                        </div>
                    </div>
                </div>
            </div>
            {loading && (
                <div className='flex items-center justify-center fixed top-0 bottom-0 right-0 left-0 h-screen w-screen backdrop-opacity-10 backdrop-invert bg-white/30'>
                    <ReactLoading
                        type='spin'
                        color='#009f7f'
                        height={'20%'}
                        width={'20%'}
                    />
                </div>
            )}
        </>
    );
};

export default OrderDetail;
