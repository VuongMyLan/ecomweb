import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ProductData } from 'Data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeftLong,
    faCircleXmark,
    faMinus,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Rate } from 'antd';
import { CartContext } from 'context/cartContext/cartContext';
import Button from 'components/button/Button';
import Product from './Product';
import Tippy from '@tippyjs/react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import {
    collection,
    doc,
    getDocs,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { handleAddToWishLists, removeFromWishList } from 'utils/handleCart';
import { AuthContext } from 'context/authContext/AuthContext';

const saleOffs = (originalprice, promotionprice) => {
    return (((originalprice - promotionprice) / originalprice) * 100).toFixed(
        1
    );
};

const ProductDetail = () => {
    const { pathname } = useLocation();
    const productId = useParams();
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const { currentUser } = useContext(AuthContext);
    const { cart, dispatch } = useContext(CartContext);
    const [selectedProduct, setSelectedProduct] = useState();
    const [favProduct, setFavProduct] = useState([]);

    // Fetch productDetail
    const queryData = async (id) => {
        const q = query(
            collection(db, 'products'),
            where('id', '==', parseInt(id))
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setSelectedProduct(doc.data());
            });
        });
        return unsubscribe;
    };

    useEffect(() => {
        const unsub = onSnapshot(
            doc(db, 'wishlists', currentUser.uid),
            (doc) => {
                console.log('Current data: ', doc.data());
                if (doc.data()) {
                    setFavProduct(
                        Object.values(doc.data())?.filter(
                            (item) =>
                                item.productData.id === parseInt(productId.id)
                        )
                    );
                }
            }
        );
       
    }, [currentUser.uid]);
    console.log('favProduct', favProduct);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        queryData(productId.id);
    }, [productId]);

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
        <div className='bg-slate-200 text-base z-[51] product__detail'>
            <Link
                className='absolute top-3 left-3 cursor-pointer hover:text-main'
                to="/"
            >
                <FontAwesomeIcon
                    icon={faArrowLeftLong}
                    className='text-base  mr-3'
                />
                Back
            </Link>
            <div className='flex flex-col'>
                <div className='lg:w-11/12 lg:flex m-auto'>
                    <div className='lg:w-1/2 lg:pr-4'>
                        <div className='w-full mt-5 text-base lg:h-3/4'>
                            <span className='relative inline-block w-full h-full mt-[20px] '>
                                <img
                                    src={
                                        selectedProduct && selectedProduct.image
                                    }
                                    className='sm:w-[500px] sm:h-[500px] m-auto border-2 w-5/6 h-5/6'
                                    alt=''
                                />
                            </span>
                        </div>
                        <div className='flex m-auto justify-center items-center mt-5 text-base lg:h-1/5'>
                            {selectedProduct &&
                                selectedProduct.thumbnailImg?.map((item, i) => (
                                    <img
                                        src={selectedProduct.image}
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

                    <div className='lg:w-1/2 lg:py-5 lg:text-base'>
                        <div>
                            <div className='w-11/12 mx-auto my-2 text-base leading-loose flex items-center lg:text-base'>
                                Price:
                                <p className='text-main font-bold ml-2 lg:text-base'>
                                    $
                                    {selectedProduct &&
                                        selectedProduct.promotionprice}
                                    /kg{' '}
                                    <span className='text-base line-through text-slate-400 font-semibold lg:text-base'>
                                        $
                                        {selectedProduct &&
                                            selectedProduct.originalprice}
                                        /kg
                                    </span>
                                </p>
                                <span className='ml-5 text-base bg-main text-slate-50 p-2 rounded-sm lg:text-base'>
                                    -{' '}
                                    {selectedProduct &&
                                        saleOffs(
                                            selectedProduct.originalprice,
                                            selectedProduct.promotionprice
                                        )}{' '}
                                    %
                                </span>
                            </div>
                            <p className='w-11/12 mx-auto my-2 text-base leading-loose lg:text-base lg:py-4'>
                                Categories:
                                {selectedProduct &&
                                    selectedProduct.categories?.map(
                                        (item, i) => (
                                            <span
                                                className='border-2 py-1 px-2 mx-2 border-main text-center'
                                                key={i}
                                            >
                                                {item}
                                            </span>
                                        )
                                    )}
                            </p>

                            <div className='w-11/12 m-auto bg-slate-200 my-2 p-2 flex items-center justify-between text-base leading-loose lg:text-base lg:mb-6'>
                                <div>
                                    <p className='py-2'>
                                        {selectedProduct &&
                                            selectedProduct.name}
                                    </p>
                                    <p>
                                        {selectedProduct &&
                                            selectedProduct.unit}
                                    </p>
                                </div>

                                <div className='flex flex-col items-end justify-between lg:text-base'>
                                    <Tippy
                                        content='Add to favourite'
                                        placement={'bottom-end'}
                                        arrow={false}
                                    >
                                        <p className='text-right py-2 text-base w-1/2 flex items-center justify-end cursor-pointer'>
                                            {favProduct.length > 0 ? (
                                                <HeartFilled
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFromWishList(
                                                            selectedProduct,
                                                            currentUser.uid
                                                        );
                                                    }}
                                                />
                                            ) : (
                                                <HeartOutlined
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddToWishLists(
                                                            selectedProduct,
                                                            currentUser.uid
                                                        );
                                                    }}
                                                />
                                            )}
                                        </p>
                                    </Tippy>
                                    <span>
                                        <Rate allowHalf defaultValue={2.5} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='w-11/12 m-auto text-base text-left text-textmain mt-2 border-t-2 pt-2 lg:text-base'>
                            <p className='font-bold text-base lg:text-3xl my-3'>
                                Detail
                            </p>
                            <p className='pt-2 leading-loose'>
                                {selectedProduct && selectedProduct.desc}
                            </p>
                        </div>
                        <div className='flex w-11/12 mx-auto mt-4 h-14 cursor-pointer'>
                            {renderAddToCart()}
                        </div>
                    </div>
                </div>
                <div className='lg:w-11/2'>
                    <div className='w-11/12 m-auto text-textmain mt-6 '>
                        <p className='font-bold text-base mb-5'>
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
