import React, { useContext } from 'react';
import './product.scss';
import ProductItem from './ProductItem';
import { ProductData } from '../../Data';
import { CartContext } from 'context/cartContext/cartContext';

const Product = () => {
   
    return (
        <div className='grid grid-cols-5 gap-5'>
            {ProductData?.map((productData, index) => (
                <ProductItem
                    productData={productData}
                    key={index}
                />
            ))}
        </div>
    );
};

export default Product;
