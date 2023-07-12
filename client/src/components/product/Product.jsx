import React, { useContext, useEffect, useState } from 'react';
import './product.scss';
import ProductItem from './ProductItem';
import { ProductData } from '../../Data';
import { CartContext } from 'context/cartContext/cartContext';
import ProductDetail from './ProductDetail';
import {
    collection,
    doc,
    getDocs,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { SearchContext } from 'context/searchContext/SearchContext';
import ReactLoading from 'react-loading';
const Product = () => {
    const [productData, setProductData] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [visibleItems, setVisibleItems] = useState(10);
    const [loading, setLoading] = useState(false);
    const { searchValue, setSearchValue, searchType, setSearchType } =
        useContext(SearchContext);
    console.log('searchValue', searchValue);
    // Load More function
    const loadMore = () => {
        setVisibleItems(visibleItems + 10);
    };

    // Fetch Products
    const fetchProductData = () => {
        setLoading(true);
        const unsub = onSnapshot(
            collection(db, 'products'),
            (querySnapshot) => {
                const productArray = [];
                querySnapshot.forEach((doc) => {
                    productArray.push(doc.data());
                });
                setProductData(productArray);
                setLoading(false);
            }
        );
        return unsub;
    };

    const queryData = async (type) => {
        const q = query(
            collection(db, 'products'),
            where('categories', 'array-contains', type)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const arrayQuery = [];
            querySnapshot.forEach((doc) => {
                arrayQuery.push(doc.data());
            });
            setProductData(arrayQuery);
        });
        return unsubscribe;
    };

    useEffect(() => {
        const unsubscribe = fetchProductData();
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const searchResultArray = productData?.filter((item) =>
            item.name
                ?.toLowerCase()
                .trim()
                .includes(searchValue?.toLowerCase().trim())
        );

        console.log('searchResultArray', searchResultArray);
        if (searchResultArray?.length > 0) {
            setSearchResult(searchResultArray);
        } else {
            setSearchResult([]);
        }
        if (searchValue?.length === 0) {
            setSearchResult();
        }
    }, [searchValue]);

    useEffect(() => {
        if (searchType) {
            if (searchType === 'All Products') {
                fetchProductData();
            } else {
                queryData(searchType);
            }
        }
    }, [searchType]);

    const renderProduct = () => {
        if (searchResult?.length > 0) {
            return searchResult?.map((productData, index) => (
                <ProductItem productData={productData} key={index} />
            ));
        } else if (searchResult?.length === 0) {
            return (
                <div className='col-span-full'>
                    <img
                        src='https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/no-product-found.jpg?alt=media&token=d1416d64-e878-45c1-b14d-526b789aac85'
                        alt=''
						className='h-full w-full object-contain'
                    />
                </div>
            );
        } else {
            return productData
                ?.slice(0, visibleItems)
                ?.map((productData, index) => (
                    <ProductItem productData={productData} key={index} />
                ));
        }
    };

    const renderLoadmore = () => {
        if (searchResult?.length > 0) {
            if (searchResult?.length > visibleItems) {
                return (
                    <div className='flex items-center justify-center border bg-main text-slate-50 w-[30%] m-auto p-3 text-xl rounded-md mt-4 hover:bg-hovermain cursor-pointer xl:w-[15%]'>
                        <button
                            onClick={() => setVisibleItems(visibleItems + 10)}
                        >
                            Load More
                        </button>
                    </div>
                );
            }
        } else if (searchResult?.length === 0) {
            return;
        } else {
            if (productData.length > visibleItems) {
                return (
                    <div className='flex items-center justify-center border bg-main text-slate-50 w-[30%] m-auto p-3 text-xl rounded-md mt-4 hover:bg-hovermain cursor-pointer xl:w-[15%]'>
                        <button
                            onClick={() => setVisibleItems(visibleItems + 10)}
                        >
                            Load More
                        </button>
                    </div>
                );
            }
        }
    };
    return (
        <>
            <div className='grid sm:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4'>
                {!loading && renderProduct()}
            </div>
            {renderLoadmore()}
            {loading && (
                <div className='flex items-center justify-center fixed top-0 bottom-0 right-0 left-0 h-screen w-screen backdrop-opacity-10 backdrop-invert bg-white/30'>
                    <ReactLoading
                        type='spin'
                        color='#009f7f'
                        height={'200px'}
                        width={'200px'}
                    />
                </div>
            )}
        </>
    );
};

export default Product;
