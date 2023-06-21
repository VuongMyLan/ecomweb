import React, { Fragment, useState } from 'react';
import './home.scss';
import Header from 'components/header/Header';
import Image from 'components/image/Image';
import Carousel from 'components/carousel/Carousel';
import Sidebar from 'components/sidebar/Sidebar';
import Product from 'components/product/Product';
import Footer from 'components/footer/Footer';
import ProductDetail from 'components/product/ProductDetail';
import { ProductData } from '../../Data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import SidebarWidget from 'components/sidebar/SidebarWidget';

import { SidebarData } from 'components/sidebar/SidebarData';
import Modal from 'components/modal/Modal';
const Home = () => {
    const [showFilter, setShowFilter] = useState(false);
    return (
        <Fragment>
            <Header />
            <Carousel />
            <div
                className='flex items-center justify-center text-center p-2 border bg-slate-200 m-2 mb-[-5px] ml-5 w-[15%] rounded-md xl:hidden font-bold cursor-pointer hover:bg-main hover:text-slate-50'
                onClick={() => {
                    setShowFilter(!showFilter);
                }}
            >
                <span className='mr-3'>
                    <FontAwesomeIcon icon={faFilter} />
                </span>
                Filter
            </div>
            {showFilter && (
                <SidebarWidget
                    itemWidget={SidebarData}
                    className='sidebarWidget left-0 top-0 bottom-0'
                    setShowWidget={setShowFilter}
                    showFilter
                />
            )}
            {showFilter && <Modal setShowWidget={setShowFilter} />}
            <div className='home__container grid grid-cols-12 my-3 mb-0'>
                <Sidebar
                    className='xl:col-span-2 xl:block h-full hidden home__sidebar'
                    setShowWidget={setShowFilter}
                />
                <div className='xl:col-span-10 bg-slate-200 h-full p-5 col-span-12 product__container'>
                    <Product />
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default Home;
