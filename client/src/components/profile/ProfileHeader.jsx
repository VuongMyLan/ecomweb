import React, { useState } from 'react';
import images from 'assets/img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import CONSTANT_TEXT from 'components/label';
import SidebarWidget from 'components/sidebar/SidebarWidget';
import Modal from 'components/modal/Modal';

const ProfileHeader = () => {
    // show SidebarWidget on small device
    const [showSideBarWidget, setShowSideBarWidget] = useState(false);
    const renderSideBarWidget = () => {
        setShowSideBarWidget(true);
    };
    const sidebarItemWidget = CONSTANT_TEXT.PROFILE__TEXT;

    return (
        <div className='h-[80px] flex items-center '>
            <div
                className='mr-8 ml-4 flex items-center justify-center text-3xl cursor-pointer hover:text-main'
                onClick={() => renderSideBarWidget()}
            >
                <FontAwesomeIcon icon={faBars} />
            </div>
            <a href='/'>
                <img src={images.logo} alt='logo' className='w-auto h-[50px]' />
            </a>
            {showSideBarWidget && (
                <SidebarWidget
                    itemWidget={sidebarItemWidget}
                    className='sidebarWidget left-0 top-0 bottom-0'
                    setShowWidget={setShowSideBarWidget}
                />
            )}
            {showSideBarWidget && (
                <Modal setShowWidget={setShowSideBarWidget} />
            )}
        </div>
    );
};

export default ProfileHeader;
