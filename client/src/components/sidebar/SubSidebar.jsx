import Button from 'components/button/Button';
import React, { useContext, useEffect, useState } from 'react';
import './sidebar.scss';
import { SearchContext } from 'context/searchContext/SearchContext';

const SubSidebar = ({ item, setShowWidget }) => {
    const [subNavBar, setSubNavBar] = useState(false);

    const showNavbar = () => {
        setSubNavBar(!subNavBar);
    };
    const { searchType, setSearchType } = useContext(SearchContext);

    return (
        <>
            <div
                className='text-sm text-slate-600 flex items-center justify-around py-3 pl-1 lg:text-lg cursor-pointer'
                onClick={item.subNav && showNavbar}
            >
                <span className='text-base w-1/6 pl-2'>{item.icon}</span>
                <span
                    className='text-base w-4/6'
                    onClick={(e) => {
                        setSearchType(e.target.innerText);
                        if (!item.subNav) {
                            setShowWidget(false);
                        }
                    }}
                >
                    {item.title}
                </span>

                <span className='pr-2 w-1/6 text-base'>
                    {item.subNav && subNavBar
                        ? item.iconClosed
                        : item.iconOpened}
                </span>
            </div>
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
                            <span
                                className='w-full text-left text-base'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // console.log(e.target.innerText);
                                    setSearchType(e.target.innerText);
                                    setShowWidget(false);
                                }}
                            >
                                {item.title}
                            </span>
                        </Button>
                    ))}
            </div>
        </>
    );
};

export default SubSidebar;
