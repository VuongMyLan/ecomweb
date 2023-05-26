import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/button/Button';
import React from 'react';

const ProductItem = ({ productData }) => {
    return (
        <div className='bg-white rounded-xl productItem__container'>
            <div>
                <img
                    src={productData.image}
                    alt='productImage'
                    className='object-contain w-full h-full rounded-t-xl productItem__image'
                />
            </div>
            <div className='flex flex-col'>
                <span className='pl-6 py-2 inline-block text-based text-xl font-semibold'>
                    ${productData.promotionprice} / {productData.unit}
                    <span className='pl-4 font-light line-through text-slate-400 '>
                        ${productData.originalprice} / {productData.unit}
                    </span>
                </span>

                <p className='pl-6 text-based text-xl font-light'>
                    {productData.name}
                </p>
                <p className='flex justify-center text-based p-2 border-slate-300 m-auto w-10/12 my-5 rounded-lg text-slate-400'>
                    <Button className='inline-block productItem__button p-2 rounded-l-lg px-4 flex-1'>
                        <span className='flex-1'>Add to Cart</span>
                    </Button>
                    <span className='bg-slate-200 flex justify-center items-center p-3 rounded-r-lg productItem__button__icon'>
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                </p>
                <p className='text-sm product__percentage'>
                    {productData.sale()}%
                </p>
            </div>
        </div>
    );
};

export default ProductItem;
