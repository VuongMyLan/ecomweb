import React, { Fragment } from 'react';
import './home.scss';
import Header from 'components/header/Header';
import Image from 'components/image/Image';
import Carousel from 'components/carousel/Carousel';
import Sidebar from 'components/sidebar/Sidebar';
import Product from 'components/product/Product';
import Footer from 'components/footer/Footer';
import ProductDetail from 'components/product/ProductDetail';
import { ProductData } from '../../Data';

const Home = () => {
    return (
        <Fragment>
            <Header />
            <Carousel />
            <div className='home__container grid grid-cols-12 my-3 mb-0'>
                <Sidebar className='xl:col-span-2 xl:block h-full hidden home__sidebar' />
                <div className='xl:col-span-10 bg-slate-200 h-full p-5 col-span-12 product__container'>
                    <Product />
                </div>
            </div>
            <Footer />
         
        </Fragment>
    );
};

export default Home;
