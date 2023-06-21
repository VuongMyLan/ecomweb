import React, { useContext, useState } from 'react';
import images from 'assets/img/index';
import CONSTANT_TEXT from 'components/label.js';
import { OrderContext } from 'context/orderContext/OrderContext';
import { Link } from 'react-router-dom';

const Order = ({ className }) => {
    const [statusTab, setStatusTab] = useState(0);
    const { Order } = useContext(OrderContext);
    console.log('Order', Order);
    const renderOrder = () => {
        return Object.values(Order)?.map((item) => (
            <Link
				to={`/orders/${item.ordernumber}`} 
                className='rounded-xl m-2 border border-slate-200 bg-slate-100 mt-4 mx-[40px]'
                key={item.ordernumber}
            >
                <div className='flex items-center justify-around mx-4'>
                    <p className='font-bold text-base'>
                        Order Number: #{item.ordernumber}
                    </p>
                    <p className=''>
                        <span className='mr-4 p-1 px-2 rounded-md cursor-pointer hidden lg:inline-block font-bold text-main '>
                            Detail
                        </span>
                        <span className='font-bold bg-yellow-100 p-1 px-2 inline-block text-center'>
                            {item.status}
                        </span>
                    </p>
                </div>
                <div className='flex my-3 border-b border-slate-300 mx-4'>
                    <div className='w-1/5 h-1/5 mb-2 md:h-[120px] md:w-[120px]'>
                        <img
                            src={item.cart[0].productData.image}
                            className='object-cover rounded-md md:h-[120px] md:w-[120px]'
                            alt=''
                        />
                    </div>
                    <div className='flex-1 flex flex-col justify-center pl-4 '>
                        <div>
                            <div className='font-semibold'>
                                {item && item.cart[0].productData.name}
                            </div>
                            <div className='flex justify-between'>
                                <p>{item && item.cart[0].productData.unit}</p>
                                <p className=''>
                                    x {item && item.cart[0].quantity}
                                </p>
                            </div>
                        </div>
                        <p className='text-right text-red-600 font-bold'>
                            ${' '}
                            {item &&
                                item.cart[0].productData.promotionprice.toFixed(
                                    2
                                )}
                        </p>
                    </div>
                </div>

                <p className='text-right text-red-600 font-bold px-4'>
                    Order Total: $ {item && item.totalPayment.toFixed(2)}
                </p>
                <div className='flex justify-between px-4 py-2'>
                    <p className='text-main font-bold'>
                        {item.received && 'Order Received'}
                    </p>
                    <p className='ml-4 font-semibold text-slate-50 px-3 py-1 bg-orange-600 rounded-md cursor-pointer'>
                        Rating
                    </p>
                </div>
            </Link>
        ));
    };
    renderOrder();
    return (
        <div className={`${className} `}>
            <div className='px-2  text-center md:hidden '>
                <select className='px-1 py-2 shadow-md bg-main text-slate-50 rounded-md'>
                    <option>All orders</option>
                    <option>To pay</option>
                    <option>To ship</option>
                    <option>To received</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                </select>
            </div>
            <div className='hidden m-4 justify-between md:flex mx-[20px]'>
                {Object.values(CONSTANT_TEXT.STATUS__TEXT).map((item, i) => (
                    <div
                        key={i}
                        className={`p-2 px-4 border-slate-400 mr-4  active:text-main cursor-pointer ${
                            statusTab === i
                                ? 'bg-main text-slate-50 shadow-xl rounded-md'
                                : ''
                        }`}
                        onClick={() => {
                            setStatusTab(i);
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>

            {Order && renderOrder()}
        </div>
    );
};

export default Order;
