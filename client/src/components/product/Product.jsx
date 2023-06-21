import React, { useContext, useEffect, useState } from 'react';
import './product.scss';
import ProductItem from './ProductItem';
import { ProductData } from '../../Data';
import { CartContext } from 'context/cartContext/cartContext';
import ProductDetail from './ProductDetail';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { SearchContext } from 'context/searchContext/SearchContext';
const Product = () => {
    const [productData, setProductData] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [visibleItems, setVisibleItems] = useState(10);

    const { searchValue, setSearchValue, searchType, setSearchType } =
        useContext(SearchContext);

    // Load More function
    const loadMore = () => {
        setVisibleItems(visibleItems + 10);
    };

    // Fetch Products
    const fetchProductData = async () => {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setProductData(data);
    };
    // Search function
    const queryData = async (type) => {
        const productRef = collection(db, 'products');
        const q = query(
            productRef,
            where('categories', 'array-contains', type)
        );
        const querySnapshot = await getDocs(q);
        const arrayQuery = [];
        querySnapshot.docs.map((doc) => {
            arrayQuery.push(doc.data());
            setProductData(arrayQuery);
        });
    };

    useEffect(() => {
        fetchProductData();
    }, []);

    useEffect(() => {
        const searchResultArray = productData?.filter(
            (item) =>
                item.name?.toLowerCase().trim() ===
                searchValue?.toLowerCase().trim()
        );

        console.log('searchResultArray', searchResultArray);
        if (searchResultArray?.length > 0) {
            setSearchResult(searchResultArray);
            console.log('searchResult', typeof searchResult);
        }
        if (searchValue?.length === 0) {
            setSearchResult([]);
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
        if (searchResult.length > 0) {
            return searchResult?.map((productData, index) => (
                <ProductItem productData={productData} key={index} />
            ));
        } else {
            return productData
                ?.slice(0, visibleItems)
                ?.map((productData, index) => (
                    <ProductItem productData={productData} key={index} />
                ));
        }
    };
    return (
        <>
            <div className='grid sm:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4'>
                {renderProduct()}
            </div>
            <div className='flex items-center justify-center border bg-main text-slate-50 w-[30%] m-auto p-3 text-xl rounded-md mt-4 hover:bg-hovermain cursor-pointer xl:w-[15%]'>
                <button onClick={()=>setVisibleItems(visibleItems + 10)}>Load More</button>
            </div>
        </>
    );
};

export default Product;
