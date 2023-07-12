import Header from 'components/header/Header';
import React from 'react';
import NavBar from 'components/navbar/NavBar';
import Checkout from 'components/checkout/Checkout';

const CheckoutPage = () => {
    return (
	<div className='profile__container'>
            <Header className='' />
            <div className='flex mt-[80px]'>
                <NavBar className='xl:w-[200px] hidden xl:block' />
                <Checkout className='flex-1 bg-slate-200 mx-auto p-2 lg:px-[100px]' />
            </div>
        </div>
    );
};

export default CheckoutPage;
