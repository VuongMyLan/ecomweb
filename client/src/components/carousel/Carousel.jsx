import Image from 'components/image/Image';
import React, { Fragment } from 'react';
import images from 'assets/img/index';
import SearchItem from 'components/search/Search';
import './carousel.scss';
const Carousel = () => {
    return (
        <div className='carousel__container w-full mt-[80px] xl:mt-0'>
            <Image
                src='https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/CarouselBanner.jpg?alt=media&token=da10fd89-496a-4a81-af98-2f09f6e0955d'
                alt='carousel'
                className='carousel__banner object-contain w-full h-full xl:object-cover'
            />
            <div className='carousel__search flex items-center justify-center flex-col bg-clip-text w-[80%] m-auto p-2'>
                <span className='lg:text-[40px] xl:mb-7 mb-3 font-semibold drop-shadow-2xl text-center sm:text-left text-2xl'>
                    Groceries Delivered In Your Doorsteps
                </span>
                <span className='text-center mb-7 font-medium shadow-2 text-xs md:text-sm bg-slate-100 px-3 rounded-md py-1'>
                    Enjoy your healthy and fresh ingredients delivered everyday
                </span>
                <SearchItem className='hidden xl:flex max-w-[80%] 2xl:w-1/2' />
            </div>
        </div>
    );
};

export default Carousel;
