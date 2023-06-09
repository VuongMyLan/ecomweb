import Header from 'components/header/Header';
import Profile from 'components/profile/Profile';
import Sidebar from 'components/sidebar/Sidebar';
import React, { Fragment } from 'react';
import CONSTANT_TEXT from 'components/label';

const ProfilePage = () => {
    const { PROFILE__TEXT } = CONSTANT_TEXT;
    return (
        <Fragment>
            <div className='grid grid-cols-12 mt-[80px] gap-2'>
                <div className='col-span-2 bg-slate-600 hidden'></div>
                <Profile className='col-span-12 bg-slate-400'  />
            </div>
        </Fragment>
    );
};

export default ProfilePage;
