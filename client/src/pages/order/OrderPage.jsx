import Header from 'components/header/Header';
import Profile from 'components/profile/Profile';
import Sidebar from 'components/sidebar/Sidebar';
import React, { Fragment, useState } from 'react';
import ProfileHeader from 'components/profile/ProfileHeader';
import NavBar from 'components/navbar/NavBar';
import './orderpage.scss';
import Order from 'components/order/Order';

const OrderPage = () => {
    return (
        <div className='profile__container'>
            <ProfileHeader className='col-span-2 bg-slate-600 xl:hidden' />
            <Header className='hidden xl:flex profile__header' />
            <div className='grid xl:grid-cols-12 xl:gap-3'>
                <NavBar className='xl:col-span-2 hidden xl:block' />
				{<Order className='xl:col-span-10' />}
            </div>
        </div>
    );
};

export default OrderPage;
