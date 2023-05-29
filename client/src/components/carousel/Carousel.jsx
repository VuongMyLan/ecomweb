import Image from 'components/image/Image';
import React, { Fragment } from 'react';
import images from 'assets/img/index';
import SearchItem from 'components/search/Search';
import './carousel.scss';
const Carousel = () => {
    return (
        <div className='carousel__container w-full'>
            <Image
                src={images.carousel1}
                alt='carousel'
                className='carousel__banner object-cover w-full h-full'
            />
            <div className='carousel__search flex items-center justify-center flex-col'>
                <span className='text-left text-3xl mb-7 font-semibold'>
                    Groceries Delivered In Your Doorsteps
                </span>
				<span className='text-left text-sm mb-7 font-medium'>
                    Enjoy your healthy and fresh ingredients delivered everyday
                </span>
                <SearchItem />
            </div>
        </div>
    );
};

export default Carousel;
