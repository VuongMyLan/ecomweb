import React from 'react';
import './product.scss';
import ProductItem from './ProductItem';
import { ProductData } from '../../Data';

const Product = () => {
    return (
        <div className='grid grid-cols-5 gap-5'>
            <ProductItem productData={ProductData[0]} />
            <ProductItem productData={ProductData[0]} />
            <ProductItem productData={ProductData[0]} />
            <ProductItem productData={ProductData[0]} />
            <ProductItem productData={ProductData[0]} />
        </div>
    );
};

export default Product;
