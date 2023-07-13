/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
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
    faHome,
    faLanguage,
    faMagnifyingGlass,
    faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

// Tippy
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import TippyHeadless from '@tippyjs/react/headless';
import { CartContext } from 'context/cartContext/cartContext';
import SidebarWidget from 'components/sidebar/SidebarWidget';
import Modal from 'components/modal/Modal';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { AuthContext } from 'context/authContext/AuthContext';
import { GetSavedRec } from 'utils/getData';

const Header = () => {
    const user = true;
    const { currentUser } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const sidebarItemWidget = CONSTANT_TEXT.HEADER_TEXT;
    const profileItemWidget = CONSTANT_TEXT.PROFILE__TEXT;
    const [searchIcon, setSearchIcon] = useState();
    const [userInfo, setUserInfo] = useState([]);
    const navigate = useNavigate();
    const { pathname } = useLocation();

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
                setShowProfileWidget(false);
                localStorage.setItem('user', null);
            })
            .catch((error) => {
                console.log('Fail to sign out');
            });
    };

    useEffect(() => {
        if (currentUser) {
            GetSavedRec('users', currentUser.uid, setUserInfo);
        }
    }, [currentUser]);

    console.log();
    return (
        <>
            <div className='header__container items-center justify-between text-stone-700 bg-slate-100 py-1 fixed top-0 left-0 right-0 hidden xl:flex'>
                <div className='header__left flex items-center font-semibold xl:w-[25%] justify-start'>
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
                                <Link className='' to='/recipes'>
                                    Recipes
                                </Link>
                            </li>
                            <li className='link ml-2  mr-2 p-2 header__item'>
                                <Link to='/'>Store</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {showSearch && (
                    <SearchItem className='hidden xl:flex max-w-[30%] 2xl:w-1/2' />
                )}
                <div className='header__right font-semibold xl:min-w-[400px]'>
                    {' '}
                    <ul className='flex items-center justify-end'>
                        <li className='link p-2 header__item'>
                            <Link to='/recipes/c/savedrecipes'>
                                Saved Recipes
                            </Link>
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
                        {currentUser ? (
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
                                            handleLogout={() => {
                                                handleLogout();
                                                navigate('/login');
                                            }}
                                        />
                                    </div>
                                )}
                            >
                                <img
                                    src={
                                        (currentUser && userInfo.img) ||
                                        'https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/default-avatar.webp?alt=media&token=91818476-3ba0-4c46-8071-d34c96310817'
                                    }
                                    alt=''
                                    className='avatar__img m-2 mt-1'
                                />
                            </TippyHeadless>
                        ) : (
                            <li className='link ml-2 mr-2 py-2 px-3 button__login text-slate-50 rounded-md font-semibold header__item'>
                                <Link to='/login'>Log in / Register</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className='header__sm bg-backgroundcolor fixed bottom-0 left-0 right-0 xl:hidden shadow-2xl pt-1 z-40'>
                <ul className='flex justify-between items-center'>
                    <li
                        className='p-3 hover:text-main'
                        onClick={() => setShowProfileWidget(false)}
                    >
                        <span onClick={renderSideBarWidget}>
                            <FontAwesomeIcon
                                icon={faBars}
                                className='text-3xl text-slate-500 hover:text-main'
                            />
                        </span>
                    </li>
                    <li>
                        {pathname === '/' || pathname === '/recipes' ? (
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
                        ) : (
                            <Link to='/' className='cursor-pointer'>
                                <FontAwesomeIcon
                                    icon={faHome}
                                    className='text-3xl text-slate-500 hover:text-main'
                                />
                            </Link>
                        )}
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
                    {!currentUser ? (
                        <Tippy content='Login / Register'>
                            <li className='link ml-2 mr-2 py-2 px-3 button__login  rounded-md font-semibold header__item '>
                                <Link to='/login'>
                                    <FontAwesomeIcon
                                        icon={faRightToBracket}
                                        className='text-3xl text-slate-500'
                                    />
                                </Link>
                            </li>
                        </Tippy>
                    ) : (
                        <li
                            className='px-3 py-2'
                            onClick={() => setShowSideBarWidget(false)}
                        >
                            <a href='#' onClick={renderProfileWidget}>
                                <img
                                    src={
                                        (currentUser && userInfo.img) ||
                                        'https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/default-avatar.webp?alt=media&token=91818476-3ba0-4c46-8071-d34c96310817'
                                    }
                                    alt=''
                                    className='avatar__img m-2 mt-1 rounded-full w-10 h-10 border-2 hover:border-main '
                                />
                            </a>
                        </li>
                    )}
                </ul>
            </div>
            <div className='fixed z-[49] flex bg-slate-50 top-0 bottom-0 left-0 right-0 items-center justify-around p-2 border border-b-2 h-20 xl:hidden header__sm__logo'>
                <a href='/' className='w-auto object-contain h-full'>
                    <img
                        src={images.logo}
                        alt='logoheader'
                        className='w-auto object-contain h-full '
                    />
                </a>
            </div>
            {SearchSm && (
                <SearchItem className='w-100vw px-5 m-2 mt-[80px] mb-[-80px] xl:hidden' />
            )}
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
