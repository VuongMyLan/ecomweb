import React from 'react';
import images from 'assets/img/index';
import './footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookSquare,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { Divider, Menu, Switch } from 'antd';
import { useState } from 'react';
import {
    AppstoreOutlined,
    MailOutlined,
    CalendarOutlined,
    SettingOutlined,
    LinkOutlined,
} from '@ant-design/icons';
import CONSTANT_TEXT from 'components/label.js';

const Footer = () => {
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    const [openKeys, setOpenKeys] = useState(['sub1']);

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const items = [
        getItem('About us', 'sub1', null, [
            getItem('Support Center', '1'),
            getItem('Customer Support', '2'),
            getItem('About Team', '3'),
            getItem('Copyright Issue', '4'),
        ]),
        getItem('Our information', 'sub2', null, [
            getItem('Privacy policy update', '5'),
            getItem('Term & conditions', '6'),
            getItem('Return Policy', '7'),
            getItem('Site Map', '8'),
        ]),
        getItem('Community', 'sub3', null, [
            getItem('Announcements', '9'),
            getItem('Discussion Center', '10'),
            getItem('Answer Center', '11'),
            getItem('Giving Works', '12'),
        ]),
    ];

    const renderFooter = () => {
        const onOpenChange = (keys) => {
            const latestOpenKey = keys.find(
                (key) => openKeys.indexOf(key) === -1
            );
            if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                setOpenKeys(keys);
            } else {
                setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
            }
        };
        return (
            <Menu
                mode='inline'
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                style={{
                    width: '100%',
                    fontSize: '24px',
                    boxShadow: 'none',
                    border: 'none',
                }}
                items={items}
            />
        );
    };

    return (
        <>
            <div className='footer__container flex p-9 text-slate-600 shadow-xl border-t-2 xl:flex-row flex-col xl: items-center '>
                <div className='footer__social flex flex-col xl:w-1/5 xl:border-r-2'>
                    <div className='m-auto flex justify-center items-center xl:m-0 xl:mb-4'>
                        <img
                            src={images.logo}
                            alt='logo'
                            className='object-contain w-10/12 h-full inline-block p-4 text-center lg:w-9/12 xl:p-0 '
                        />
                    </div>
                    <p className='text-center text-xl m-auto md:mt-4 md:text-2xl xl:text-xl xl:m-3 '>
                        We offer high-quality products and the best produce
                        selection. and the ability to get them fresh
                    </p>
                    <div className='text-3xl flex items-center justify-center m-6 social__icon border-b-2 pb-11 xl:mt-0 xl:border-b-0 xl:pt-2'>
                        <a href='/' className='mx-3'>
                            <FontAwesomeIcon
                                icon={faFacebookSquare}
                                className='text-fb hover:text-main'
                            />
                        </a>
                        <a href='/' className='mx-3'>
                            {' '}
                            <FontAwesomeIcon
                                icon={faTwitter}
                                className='text-twitter hover:text-main'
                            />
                        </a>
                        <a href='/' className='mx-3'>
                            {' '}
                            <FontAwesomeIcon
                                icon={faInstagram}
                                className='hover:text-main'
                            />
                        </a>
                    </div>
                </div>
                <div className='flex flex-col lg:w-full lg:pl-10 lg:flex-row pl-0 xl:w-4/5 xl:text-xl'>
                    <div className='footer__about hidden lg:flex lg:flex-col lg:w-2/5 lg:text-lg '>
                        <p className='font-semibold py-2 xl:text-2xl'>
                            About us
                        </p>
                        <a href='/' className='py-2'>
                            Support Center
                        </a>
                        <a href='/' className='py-2'>
                            Customer Support
                        </a>
                        <a href='/' className='py-2'>
                            About Team
                        </a>
                        <a href='/' className='py-2'>
                            Copyright Issue
                        </a>
                    </div>
                    <div className='footer__info lg:flex lg:flex-col lg:w-2/5 lg:text-lg hidden'>
                        <p className='font-semibold py-2 xl:text-2xl'>
                            Our information
                        </p>
                        <a href='/' className='py-2'>
                            Privacy policy update
                        </a>
                        <a href='/' className='py-2'>
                            Term & conditions
                        </a>
                        <a href='/' className='py-2'>
                            Return Policy
                        </a>
                        <a href='/' className='py-2'>
                            Site Map
                        </a>
                    </div>
                    <div className='footer__info lg:flex lg:flex-col lg:w-2/5 lg:text-lg hidden'>
                        <p className='font-semibold py-2 xl:text-2xl'>
                            Community
                        </p>
                        <a href='/' className='py-2'>
                            Announcements
                        </a>
                        <a href='/' className='py-2'>
                            Discussion Center
                        </a>
                        <a href='/' className='py-2'>
                            Answer Center
                        </a>
                        <a href='/' className='py-2'>
                            Giving Works
                        </a>
                    </div>
                    {renderFooter()}
                    <div className='footer__info flex flex-col w-11/12 m-auto text-2xl border-t-2 my-11 pt-5 lg:w-2/5 lg:mt-0 lg:border-0 lg:pt-0 lg:text-lg'>
                        <p className='font-semibold py-2 xl:text-2xl'>
                            Ours Newsletter
                        </p>
                        <p>
                            Subscribe to our newsletter and we will inform you
                            about newest directory and promotions
                        </p>
                        <input
                            placeholder='Email address'
                            className='w-full outline-none p-1 border-slate-950 border-solid border mt-5 rounded-sm placeholder:text-xl py-3 px-2 text-xl'
                        />
                        <button className='text-center border-1 footer__button--send text-slate-50 rounded-lg mt-5 text-2xl py-3 px-2 font-semibold bg-main hover:bg-hovermain lg:w-2/6 lg:text-xl'>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
