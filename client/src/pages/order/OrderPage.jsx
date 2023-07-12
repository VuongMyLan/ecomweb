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
            <div className='flex'>
                <NavBar className='xl:w-[200px] hidden xl:block' />
                <Order className='flex-1 bg-slate-200 mx-auto p-2 lg:px-[50px] mb-[60px]' />
            </div>
        </div>
    );
};

export default OrderPage;
