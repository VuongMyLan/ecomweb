import React, { useContext, useEffect, useState } from 'react';
import images from 'assets/img/index';
import CONSTANT_TEXT from 'components/label.js';
import { OrderContext } from 'context/orderContext/OrderContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Order = ({ className }) => {
    const [statusTab, setStatusTab] = useState(0);
    const { OrderList } = useContext(OrderContext);
    const [tabContent, setTabContent] = useState([]);
    const { allorder, toShip, toReceive, completed, cancelled } =
        CONSTANT_TEXT.STATUS__TEXT;
    const { orderPlaced, orderProcessing, orderShipped, orderCompleted } =
        CONSTANT_TEXT.ORDER__PROGRESS;

    console.log('tabContent', tabContent);

    const filterTab = (tabContent) => {
        switch (tabContent) {
            case allorder:
                const newArr = [];
                Object.values(OrderList)?.forEach((item) => newArr.push(item));
                setTabContent(newArr);
                break;
            case toShip:
                setTabContent(
                    Object.values(OrderList).filter(
                        (item) =>
                            item.status === (orderPlaced || orderProcessing)
                    )
                );
                break;
            case toReceive:
                setTabContent(
                    Object.values(OrderList).filter(
                        (item) => item.status === orderShipped
                    )
                );
                break;
            case completed:
                setTabContent(
                    Object.values(OrderList).filter(
                        (item) => item.status === orderCompleted
                    )
                );
                break;
            case cancelled:
                setTabContent([]);
                break;
            default:
                return tabContent;
        }
    };

    useEffect(() => {
        if (OrderList) {
            filterTab(allorder);
        }
    }, [OrderList]);

    const renderOrder = () => {
        return tabContent?.map((item) => (
            <Link
                to={`/orders/${item.ordernumber}`}
                className='rounded-xl border border-slate-200 mb-3 bg-slate-50 mt-4 m-auto block px-2 xl:m-0 xl:mb-3'
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
                            src={item && item.cart[0].productData.image}
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

                <div className='flex justify-between px-4 py-2'>
                    <p className='text-main font-bold'>
                        {item.status === orderCompleted && 'Order Received'}
                    </p>
                    <p className='text-right text-red-600 font-bold'>
                        Order Total: $ {item && item.fee.roundedTotal}
                    </p>
                    {/* <p className='ml-4 font-semibold text-slate-50 px-3 py-1 bg-orange-600 rounded-md cursor-pointer'>
                        Rating
                    </p> */}
                </div>
            </Link>
        ));
    };
    renderOrder();
    return (
        <div className={`${className} `}>
            <div className='px-2  text-center md:hidden '>
                <select
                    className='px-1 py-2 shadow-md bg-main text-slate-50 rounded-md'
                    onChange={(e) => {
                        console.log(e.target.value);
                        filterTab(e.target.value);
                    }}
                >
                    {Object.values(CONSTANT_TEXT.STATUS__TEXT).map(
                        (item, i) => (
                            <option key={i} value={item}>
                                {item}
                            </option>
                        )
                    )}
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
                        onClick={(e) => {
                            filterTab(e.target.innerText);
                            setStatusTab(i);
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>
            {Object.keys(OrderList).length === 0 && (
                <div className='text-center my-3 m-auto p-2 flex flex-col justify-center items-center'>
                    <img
                        className='shadow rounded-md max-w-[300px] max-h-[300px] object-cover'
                        src='https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/Noorder.png?alt=media&token=fcc38ffb-1492-4775-9812-3a334c12dbc6'
                        alt=''
                    />{' '}
                    <p className='p-2'>You have no orders</p>
                    <p className=''>
                        Order now at:{' '}
                        <Link to='/cart'>
                            <FontAwesomeIcon
                                icon={faCartShopping}
                                className='text-main'
                            />
                        </Link>{' '}
                    </p>
                </div>
            )}
            {OrderList && renderOrder()}
        </div>
    );
};

export default Order;
