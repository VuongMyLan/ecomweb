import React from 'react';
import './subMenuItem.scss';
import Button from 'components/button/Button';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const subMenuItemData = [
    {
        icon: null,
        title: 'My Profile',
        to: '/profile',
    },
    {
        icon: null,
        title: 'My Orders',
        to: '/order',
    },
    {
        icon: null,
        title: 'My WishList',
        to: '/wishlist',
    },
    {
        icon: null,
        title: 'Checkout',
        to: '/checkout',
    },
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: '/',
    },
];

export const SubMenuItem = ({ handleLogout }) => {
    return (
        <div className='subMenuItem__container text-base font-semibold rounded-lg mt-2 '>
            {/* {subMenuItemData.map((item, index) => (
                <button
                    className='block py-4 p-5 w-full text-left'
                    key={index}
                >
                    {item}
                </button>
            ))} */}
            {subMenuItemData.map((item, index) => (
                <Button
                    key={index}
                    leftIcon={item.icon}
                    className='block py-4 p-5 w-full text-left cursor-pointer'
                    to={item.to}
                    onClick={item.title === 'Log out' ? handleLogout : null}
                >
                    {item.title}
                </Button>
            ))}
        </div>
    );
};
