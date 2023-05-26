import Button from 'components/button/Button';
import React, { useState } from 'react';
import './sidebar.scss';

const SubSidebar = ({ item }) => {
    const [subNavBar, setSubNavBar] = useState(false);

    const showNavbar = () => {
        setSubNavBar(!subNavBar);
    };
    return (
        <>
            <Button
                to='/'
                className='text-base text-slate-600 flex items-center justify-between ml-1 py-3 pl-2 pr-3'
                onClick={item.subNav && showNavbar}
            >
                <span className='ml-0 text-base'>{item.icon}</span>
                <span className='ml-3 w-40 text-left'>{item.title}</span>

                <span className='ml-3 mr-2'>
                    {item.subNav && subNavBar
                        ? item.iconClosed
                        : item.iconOpened}
                </span>
            </Button>
            <div className={subNavBar ? 'subItem__container' : null}>
                {subNavBar &&
                    item.subNav?.map((item, index) => (
                        <Button
                            key={index}
                            className='text-base text-slate-600 flex items-center justify-center m-auto p-3 w-6/12 '
                        >
                            <span className='w-40 text-left'>{item.title}</span>
                        </Button>
                    ))}
            </div>
        </>
    );
};

export default SubSidebar;
