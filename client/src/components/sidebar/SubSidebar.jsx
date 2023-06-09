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
                className='text-sm text-slate-600 flex items-center justify-around py-3 pl-1 lg:text-lg'
                onClick={item.subNav && showNavbar}
            >
                <span className='text-base w-1/6 pl-2'>{item.icon}</span>
                <span className='text-base w-4/6'>{item.title}</span>

                <span className='pr-2 w-1/6'>
                    {item.subNav && subNavBar
                        ? item.iconClosed
                        : item.iconOpened}
                </span>
            </Button>
            <div
                className={
                    subNavBar
                        ? 'subItem__container w-4/6 m-auto flex flex-col items-start justify-start'
                        : null
                }
            >
                {subNavBar &&
                    item.subNav?.map((item, index) => (
                        <Button
                            key={index}
                            className='text-sm text-slate-600 py-2 pl-1 xl:text-base'
                        >
                            <span className='w-full text-left'>
                                {item.title}
                            </span>
                        </Button>
                    ))}
            </div>
        </>
    );
};

export default SubSidebar;
