import React, { Fragment } from 'react';
import './home.scss';
import Header from 'components/header/Header';
import Image from 'components/image/Image';
import Carousel from 'components/carousel/Carousel';
import Sidebar from 'components/sidebar/Sidebar';
import Product from 'components/product/Product';

const Home = () => {
    return (
        <Fragment>
            <Header />
            <Carousel />
            <div className='home__container grid grid-cols-12 my-3'>
                <Sidebar className='col-span-2 h-full' />
                <div className='col-span-10 bg-slate-200 h-full p-5'>
					<Product/>
				</div>
            </div>
        </Fragment>
    );
};

export default Home;
