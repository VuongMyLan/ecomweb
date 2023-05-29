import React from 'react';
import images from 'assets/img/index';
import './footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookSquare,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
    return (
        <div className='footer__container flex m-9 text-slate-600'>
            <div className='footer__social flex flex-col w-1/5'>
                <div className='mb-3  m-auto'>
                    <img
                        src={images.logo}
                        alt='logo'
                        className='object-contain w-20 h-20 inline-block'
                    />
                    <span className='footer__title font-semibold text-xl ml-3'>
                        {' '}
                        AURORA'S STORE
                    </span>
                </div>
                <p className='text-center w-3/4 m-auto'>
                    We offer high-quality products and the best produce
                    selection. and the ability to get them fresh
                </p>
                <div className='text-3xl flex items-center justify-center m-6 social__icon '>
                    <a href='/' className='mx-3'>
                        <FontAwesomeIcon
                            icon={faFacebookSquare}
                            style={{ color: '#3065c0' }}
                        />
                    </a>
                    <a href='/' className='mx-3'>
                        {' '}
                        <FontAwesomeIcon
                            icon={faTwitter}
                            style={{ color: '#3a80f8' }}
                        />
                    </a>
                    <a href='/' className='mx-3'>
                        {' '}
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
            </div>
            <div className='w-4/5 pl-10 flex'>
                <div className='footer__about w-1/5 flex flex-col'>
                    <p className='font-semibold py-2'>About us</p>
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
                <div className='footer__info w-1/5 flex flex-col'>
                    <p className='font-semibold py-2'>Our information</p>
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
                <div className='footer__info w-1/5 flex flex-col'>
                    <p className='font-semibold py-2'>Community</p>
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
                <div className='footer__info w-2/5 flex flex-col'>
                    <p className='font-semibold py-2'>Ours Newsletter</p>
                    <p>
                        Subscribe to our newsletter and we will inform you about
                        newest directory and promotions
                    </p>
                    <input
                        placeholder='Email address'
                        className='w-full outline-none p-1 py-2 border-slate-950 border-solid border text-sm mt-3 rounded-sm'
                    />
                    <button className='text-center border-1 footer__button--send text-slate-50 rounded-sm mt-2 text-sm py-2 px-2 font-semibold bg-main hover:bg-hovermain'>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Footer;
