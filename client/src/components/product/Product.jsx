import React, { useContext } from 'react';
import './product.scss';
import ProductItem from './ProductItem';
import { ProductData } from '../../Data';
import { CartContext } from 'context/cartContext/cartContext';
import ProductDetail from './ProductDetail';

const Product = () => {
    return (
        <div className='grid sm:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4'>
            {ProductData?.map((productData, index) => (
                <ProductItem productData={productData} key={index} />
            ))}
			
        </div>
    );
};

export default Product;
