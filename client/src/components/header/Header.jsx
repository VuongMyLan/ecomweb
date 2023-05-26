import React from 'react';
import images from 'assets/img/index';
import SearchItem from 'components/search/Search';
import { SubMenuItem } from 'components/submenuItems/SubMenuItem';
import './header.scss';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBell,
    faCartShopping,
    faLanguage,
} from '@fortawesome/free-solid-svg-icons';

// Tippy
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import TippyHeadless from '@tippyjs/react/headless';

const Header = () => {
    const user = true;

    return (
        <div className='header__container flex items-center justify-around text-stone-700 bg-slate-100 py-1'>
            <div className='header__left flex items-center font-semibold'>
                <div className='header__logo'>
                    <img
                        src={images.logo}
                        className='logo__img object-cover w-full h-full'
                        alt=''
                    />
                </div>
                <div className='header__selection '>
                    <ul className='flex'>
                        <li className='link ml-2  mr-2 p-2 border-gray-200 header__item'>
                            <a className='' href='/'>
                                Recipes
                            </a>
                        </li>
                        <li className='link ml-2  mr-2 p-2 header__item'>
                            <a href='/'>Grocery Store</a>
                        </li>
                    </ul>
                </div>
            </div>

            <SearchItem />
            <div className='header__right font-semibold'>
                {' '}
                <ul className='flex items-center justify-center'>
                    <li className='link p-2 header__item'>
                        <a className='' href='/'>
                            Saved Recipes
                        </a>
                    </li>
                    <li className='link p-2 header__item'>
                        <a href='/'>Offers</a>
                    </li>
                    <Tippy content='Languages'>
                        <li className='link p-2 header__item'>
                            <a href='/'>
                                <FontAwesomeIcon
                                    icon={faLanguage}
                                    className='header__icon--lang'
                                />
                            </a>
                        </li>
                    </Tippy>
                    <Tippy content='Notification'>
                        <li className='link p-2 header__item'>
                            <a href='/'>
                                <FontAwesomeIcon
                                    icon={faBell}
                                    className='header__icon--noti'
                                />
                            </a>
                        </li>
                    </Tippy>
                    <Tippy content='Cart'>
                        <li className='link p-2 header__item'>
                            <a href='/'>
                                <FontAwesomeIcon
                                    icon={faCartShopping}
                                    className='header__icon--cart'
                                />
                            </a>
                        </li>
                    </Tippy>
                    {user ? (
                        <TippyHeadless
                            interactive
                            arrow={true}
                            className='tippyHeader'
                            placement={'bottom-end'}
                            delay={[0, 300]}
                            render={(attrs) => (
                                <div className='box' tabIndex='-1' {...attrs}>
                                    <SubMenuItem />
                                </div>
                            )}
                        >
                            <img
                                src='https://plus.unsplash.com/premium_photo-1664637351074-6f91797711ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80'
                                alt=''
                                className='avatar__img m-2 mt-1'
                            />
                        </TippyHeadless>
                    ) : (
                        <li className='link ml-2 mr-2 py-2 px-3 button__login text-slate-50 rounded-md font-semibold header__item'>
                            <a href='/'>Log in / Register</a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Header;
