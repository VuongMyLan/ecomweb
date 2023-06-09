import React, { useContext, useState } from 'react';
import images from 'assets/img/index';
import SearchItem from 'components/search/Search';
import { SubMenuItem } from 'components/submenuItems/SubMenuItem';
import './header.scss';
import CONSTANT_TEXT from 'components/label';
// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faBell,
    faCartShopping,
    faCircleXmark,
    faLanguage,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

// Tippy
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import TippyHeadless from '@tippyjs/react/headless';
import { CartContext } from 'context/cartContext/cartContext';
import SidebarWidget from 'components/sidebar/SidebarWidget';
import Modal from 'components/modal/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const Header = () => {
    const user = true;
    const { cart } = useContext(CartContext);
    const sidebarItemWidget = CONSTANT_TEXT.HEADER_TEXT;
    const profileItemWidget = CONSTANT_TEXT.PROFILE__TEXT;
    const navigate = useNavigate();

    // Calculate quantity in Cart
    let quantity = cart?.reduce((totalSum, curValue) => {
        return curValue.quantity + totalSum;
    }, 0);

    // show Search on header
    const [showSearch, setShowSearch] = useState(false);
    const renderSearch = () => {
        window.addEventListener('scroll', () => {
            const carouselEle = document.querySelector('.carousel__container');
            if (carouselEle) {
                const carouselLocation = carouselEle.getBoundingClientRect();
                if (-carouselLocation.y > carouselLocation.height / 2) {
                    setShowSearch(true);
                } else {
                    setShowSearch(false);
                }
            }
        });
    };
    renderSearch();
    const [SearchSm, setSearchSm] = useState(false);
    //showSearch on small device
    const showSearchSm = () => {
        setSearchSm(!SearchSm);
    };

    // show SidebarWidget on small device
    const [showSideBarWidget, setShowSideBarWidget] = useState(false);
    const renderSideBarWidget = () => {
        setShowSideBarWidget(true);
    };

    // show ProfileWidget on small device
    const [showProfileWidget, setShowProfileWidget] = useState(false);
    const renderProfileWidget = () => {
        setShowProfileWidget(true);
    };

    //Signout user
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log('sign out successful');
                localStorage.setItem('user', null);
                navigate('/login');
            })
            .catch((error) => {
                console.log('Fail to sign out');
            });
    };

    return (
        <>
            <div className='header__container flex items-center justify-between text-stone-700 bg-slate-100 py-1 fixed top-0 left-0 right-0 hidden lg:flex'>
                <div className='header__left flex items-center font-semibold lg:w-1/3 justify-start'>
                    <div className='header__logo ml-2'>
                        <Link to='/'>
                            <img
                                src={images.logo}
                                className='logo__img object-contain w-full h-full p-2'
                                alt=''
                            />
                        </Link>
                    </div>
                    <div className='header__selection '>
                        <ul className='flex items-center text-base'>
                            <li className='link ml-2  mr-2 p-2 border-gray-200 header__item'>
                                <a className='' href='/'>
                                    Recipes
                                </a>
                            </li>
                            <li className='link ml-2  mr-2 p-2 header__item'>
                                <a href='/'>Store</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {showSearch && <SearchItem className='hidden' />}
                <div className='header__right font-semibold lg:w-2/5 xl:w-1/3'>
                    {' '}
                    <ul className='flex items-center justify-end'>
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
                                <FontAwesomeIcon
                                    icon={faLanguage}
                                    className='header__icon--lang'
                                />
                            </li>
                        </Tippy>
                        <Tippy content='Notification'>
                            <li className='link p-2 header__item'>
                                <FontAwesomeIcon
                                    icon={faBell}
                                    className='header__icon--noti'
                                />
                            </li>
                        </Tippy>
                        <div className='relative'>
                            <div className='rounded-full bg-red-500 text-slate-50 p-1 w-5 h-5 text-center flex justify-center items-center text-xs font-medium absolute right-0 top-0'>
                                {quantity}
                            </div>
                            <Tippy content='Cart'>
                                <Link to='/cart'>
                                    <li className='link p-2 header__item'>
                                        <FontAwesomeIcon
                                            icon={faCartShopping}
                                            className='header__icon--cart'
                                        />
                                    </li>
                                </Link>
                            </Tippy>
                        </div>
                        {user ? (
                            <TippyHeadless
                                interactive
                                arrow={true}
                                className='tippyHeader'
                                placement={'bottom-end'}
                                delay={[0, 300]}
                                render={(attrs) => (
                                    <div
                                        className='box'
                                        tabIndex='-1'
                                        {...attrs}
                                    >
                                        <SubMenuItem
                                            handleLogout={handleLogout}
                                        />
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
            <div className='header__sm bg-backgroundcolor fixed bottom-0 left-0 right-0 z-50 lg:hidden shawdow-2xl pt-1 z-40'>
                <ul className='flex justify-between items-center'>
                    <li
                        className='p-3 hover:text-main'
                        onClick={() => setShowProfileWidget(false)}
                    >
                        <a href='#' onClick={renderSideBarWidget}>
                            <FontAwesomeIcon
                                icon={faBars}
                                className='text-3xl text-slate-500 hover:text-main'
                            />
                        </a>
                    </li>
                    <li>
                        <a
                            href='#'
                            className='inline-block'
                            onClick={showSearchSm}
                        >
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className='text-3xl text-slate-500 hover:text-main'
                            />
                        </a>
                    </li>
                    <li>
                        <Link to='/cart'>
                            <p className='relative'>
                                <span href='#' className='h-full inline-block'>
                                    <FontAwesomeIcon
                                        icon={faCartShopping}
                                        className='text-3xl text-slate-500 hover:text-main'
                                    />
                                </span>
                                <span className='rounded-full bg-red-500 text-slate-50 p-1 w-6 h-6 text-center flex justify-center items-center text-xs font-medium absolute right-0 bottom-7 header__icon--cartsm'>
                                    {quantity}
                                </span>
                            </p>
                        </Link>
                    </li>
                    <li
                        className='px-3 py-2'
                        onClick={() => setShowSideBarWidget(false)}
                    >
                        <a href='#' onClick={renderProfileWidget}>
                            <img
                                src='https://plus.unsplash.com/premium_photo-1664637351074-6f91797711ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80'
                                alt=''
                                className='avatar__img m-2 mt-1 rounded-full w-10 h-10 border-2 hover:border-main '
                            />
                        </a>
                    </li>
                </ul>
            </div>
            <div className='flex items-center justify-around p-2 shadow-2xl h-20 lg:hidden mt-2'>
                <img
                    src={images.logo}
                    alt='logoheader'
                    className='w-auto object-contain h-full'
                />
            </div>
            {SearchSm && <SearchItem className='w-100vw px-5 m-2' />}
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
            {showProfileWidget && (
                <SidebarWidget
                    itemWidget={profileItemWidget}
                    className='profileWidget right-0 top-0 bottom-0'
                    setShowWidget={setShowProfileWidget}
                    handleLogout={handleLogout}
                />
            )}
            {showProfileWidget && (
                <Modal setShowWidget={setShowProfileWidget} />
            )}
        </>
    );
};

export default Header;
