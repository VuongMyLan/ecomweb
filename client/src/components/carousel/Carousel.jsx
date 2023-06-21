import Image from 'components/image/Image';
import React, { Fragment } from 'react';
import images from 'assets/img/index';
import SearchItem from 'components/search/Search';
import './carousel.scss';
const Carousel = () => {
    return (
        <div className='carousel__container w-full mt-[80px] xl:mt-0'>
            <Image
                src={images.carousel1}
                alt='carousel'
                className='carousel__banner object-contain w-full h-full xl:object-cover'
            />
            <div className='carousel__search flex items-center justify-center flex-col '>
                <span className='xl:text-3xl xl:mb-7 text-2xl mb-3 font-semibold drop-shadow-2xl text-center sm:text-left'>
                    Groceries Delivered In Your Doorsteps
                </span>
                <span className='text-center text-base mb-7 font-medium shadow-2 p-4'>
                    Enjoy your healthy and fresh ingredients delivered everyday
                </span>
                <SearchItem className='hidden' />
            </div>
        </div>
    );
};

export default Carousel;
