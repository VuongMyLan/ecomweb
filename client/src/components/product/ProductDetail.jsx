import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ProductData } from 'Data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowLeftLong,
    faCircleXmark,
    faMinus,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { HeartOutlined, StarOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import { CartContext } from 'context/cartContext/cartContext';
import Button from 'components/button/Button';
import Product from './Product';
import Tippy from '@tippyjs/react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const ProductDetail = () => {
    const { pathname } = useLocation();
    const productId = useParams();
    const navigate = useNavigate();

    const [index, setIndex] = useState(0);
    const { cart, dispatch } = useContext(CartContext);

    const selectedProduct = ProductData.find(
        (item) => item.id === parseInt(productId.id)
    );
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const renderAddToCart = () => {
        const find = cart?.find(
            (item) => item.productData.id === parseFloat(productId.id)
        );
        if (find) {
            return (
                <>
                    <span className='flex justify-center items-center p-3 rounded-l-lg productItem__button--minus cursor-pointer bg-main text-slate-50 '>
                        <FontAwesomeIcon
                            icon={faMinus}
                            onClick={() =>
                                dispatch({
                                    type: 'REMOVE_FROM_CART',
                                    payload: {
                                        productData: selectedProduct,
                                        quantity: 1,
                                    },
                                })
                            }
                        />
                    </span>
                    <Button className='inline-block productItem__button--quantity p-2 px-4 flex-1 bg-main text-slate-50'>
                        <span className='flex-1'>{find.quantity}</span>
                    </Button>
                    <span className='flex justify-center items-center p-3 rounded-r-lg productItem__button--plus cursor-pointer bg-main text-slate-50'>
                        <FontAwesomeIcon
                            icon={faPlus}
                            onClick={() =>
                                dispatch({
                                    type: 'ADD_TO_CART',
                                    payload: {
                                        productData: selectedProduct,
                                        quantity: 1,
                                    },
                                })
                            }
                        />
                    </span>
                </>
            );
        } else {
            return (
                <>
                    <Button
                        className='inline-block productItem__button p-2 rounded-l-lg px-4 flex-1 border-r-0 bg-main hover:bg-hovermain text-slate-50 h-14'
                        onClick={() =>
                            dispatch({
                                type: 'ADD_TO_CART',
                                payload: {
                                    productData: selectedProduct,
                                    quantity: 1,
                                },
                            })
                        }
                    >
                        <span className='flex-1'>Add to Cart</span>
                    </Button>
                    <span className='flex justify-center items-center px-4 rounded-r-lg productItem__button__icon bg-main hover:bg-hovermain text-slate-50 h-14'>
                        <FontAwesomeIcon
                            icon={faPlus}
                            onClick={() =>
                                dispatch({
                                    type: 'ADD_TO_CART',
                                    payload: {
                                        productData: selectedProduct,
                                        quantity: 1,
                                    },
                                })
                            }
                        />
                    </span>
                </>
            );
        }
    };

    return (
        <div className='bg-slate-50 text-xl z-[51] product__detail'>
            <span className='absolute top-5 left-3'>
                <FontAwesomeIcon
                    icon={faArrowLeftLong}
                    className='text-3xl hover:text-main mr-5'
                    onClick={() => {
                        navigate('/');
                    }}
                />
            </span>
            <div className='flex flex-col lg:mt-5'>
                <div className='lg:w-11/12 lg:flex m-auto'>
                    <div className='lg:w-1/2 lg:pr-4'>
                        <div className='w-full mt-5 text-xl lg:h-3/4'>
                            <span className='relative inline-block w-full h-full mt-[20px] '>
                                <img
                                    src={selectedProduct.thumbnailImg[index]}
                                    className='sm:w-[500px] sm:h-[500px] m-auto border-2 w-5/6 h-5/6'
                                    alt=''
                                />
                            </span>
                        </div>
                        <div className='flex m-auto justify-center items-center mt-5 text-xl lg:h-1/5'>
                            {selectedProduct.thumbnailImg.map((item, i) => (
                                <img
                                    src={item}
                                    key={i}
                                    className={`w-20 h-20 object-cover border-2 mx-2 hover:border-hovermain ${
                                        selectedProduct.thumbnailImg.indexOf(
                                            item
                                        ) === index
                                            ? 'border-main'
                                            : null
                                    }`}
                                    alt=''
                                    onMouseOver={() => setIndex(i)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className='lg:w-1/2 lg:py-5 lg:text-2xl'>
                        <div>
                            <div className='w-11/12 mx-auto my-2 text-xl leading-loose flex items-center lg:text-2xl'>
                                Price:
                                <p className='text-main font-bold ml-2 lg:text-2xl'>
                                    ${selectedProduct.promotionprice}/kg{' '}
                                    <span className='text-base line-through text-slate-400 font-semibold lg:text-2xl'>
                                        ${selectedProduct.originalprice}/kg
                                    </span>
                                </p>
                                <span className='ml-5 text-base bg-main text-slate-50 p-2 rounded-sm lg:text-2xl'>
                                    - {selectedProduct.sale()}%
                                </span>
                            </div>
                            <p className='w-11/12 mx-auto my-2 text-xl leading-loose lg:text-xl lg:py-4'>
                                Categories:
                                {selectedProduct.categories?.map((item, i) => (
                                    <span
                                        className='border-2 py-1 px-2 mx-2 border-main text-center'
                                        key={i}
                                    >
                                        {item}
                                    </span>
                                ))}
                            </p>

                            <div className='w-11/12 m-auto bg-slate-200 my-2 p-2 flex items-center justify-between text-xl leading-loose lg:text-2xl lg:mb-6'>
                                <div>
                                    <p className='py-2'>
                                        {selectedProduct.name}
                                    </p>
                                    <p>{selectedProduct.unit}</p>
                                </div>

                                <div className='flex flex-col items-end justify-between lg:text-2xl'>
                                    <Tippy
                                        content='Add to favourite'
                                        placement={'bottom-end'}
                                        arrow={false}
                                    >
                                        <p className='text-right py-2 text-xl w-1/2 flex items-center justify-end'>
                                            <HeartOutlined />
                                        </p>
                                    </Tippy>
                                    <span>
                                        <Rate allowHalf defaultValue={2.5} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='w-11/12 m-auto text-xl text-left text-textmain mt-2 border-t-2 pt-2 lg:text-2xl'>
                            <p className='font-bold text-2xl lg:text-3xl my-3'>
                                Detail
                            </p>
                            <p className='pt-2 leading-loose'>
                                {selectedProduct.desc}
                            </p>
                        </div>
                        <div className='flex w-11/12 mx-auto mt-4 h-14 cursor-pointer'>
                            {renderAddToCart()}
                        </div>
                    </div>
                </div>
                <div className='lg:w-11/2'>
                    <div className='w-11/12 m-auto text-textmain mt-6 '>
                        <p className='font-bold text-2xl mb-5'>
                            Related Products
                        </p>
                        <Product />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
