import React from 'react';
import images from 'assets/img/index';
import './header.scss';
const Header = () => {
    console.log(images);
    return (
        <div className='header__container flex justify-between items-center p-2'>
            <div className='header__left flex items-center'>
                <div className='header__logo'>
                    <img
                        src={images.logo}
                        className='logo__img object-cover w-full h-full p-2'
                        alt=''
                    />
                </div>
                <div className='header__selection'>
                    <ul className='flex'>
                        <li className='link ml-2  mr-2'>
                            <a className='' href='/'>
                                Recipes
                            </a>
                        </li>
                        <li>
                            <a href='/'>Groceries Store</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='header__right'>
                {' '}
                <ul className='flex'>
                    <li className='link mr-1'>
                        <a className='' href='/'>
                            Recipes
                        </a>
                    </li>
                    <li>
                        <a href='/'>Groceries Store</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
