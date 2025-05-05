import Header from 'components/header/Header';
import Profile from 'components/profile/Profile';
import Sidebar from 'components/sidebar/Sidebar';
import React, { Fragment, useState } from 'react';
import ProfileHeader from 'components/profile/ProfileHeader';
import NavBar from 'components/navbar/NavBar';
import './wishlist.scss';
import Order from 'components/order/Order';
import Wishlists from 'components/wishlists/Wishlists';

const WishListPage = () => {
    return (
	<div className='profile__container'>
             {/* <ProfileHeader className='col-span-2 bg-slate-600 xl:hidden' /> */}
            <Header className='' />
            <div className='flex mt-[80px]'>
                <NavBar className='xl:w-[200px] hidden xl:block' />
                <Wishlists className='flex-1 bg-slate-200 mx-auto p-2 lg:px-[100px]' />
            </div>
        </div>
    );
};

export default WishListPage;
