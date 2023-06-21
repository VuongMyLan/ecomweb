import React from 'react';
import images from 'assets/img/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import SidebarWidgetItem from './SidebarWidgetItem';
import CONSTANT_TEXT from 'components/label';
import Sidebar from './Sidebar';

const SidebarWidget = ({
    className,
    setShowWidget,
    itemWidget,
    handleLogout,
    showFilter,
}) => {
    console.log('showFilter', showFilter);
    return (
        <div
            className={`${className} w-96 bg-slate-50 h-screen fixed z-50 flex flex-col pt-3 items-center shadow-2xl xl:hidden`}
        >
            {!showFilter ? (
                <SidebarWidgetItem
                    images={images}
                    setShowWidget={setShowWidget}
                    itemWidget={itemWidget}
                    handleLogout={handleLogout}
                />
            ) : (
                <>
                    <div className='border-b-2 border-blue-50 flex justify-between items-center w-11/12 '>
                        <img
                            src={images && images.logo}
                            alt='headerlogo'
                            className='p-2 h-16 object-contain'
                        />
                        <span onClick={() => setShowWidget(false)}>
                            <FontAwesomeIcon
                                icon={faCircleXmark}
                                className='text-3xl hover:text-main mr-5'
                            />
                        </span>
                    </div>
                    <Sidebar className="w-[80%] text-xl mt-5" setShowWidget={setShowWidget} />
                </>
            )}
            {}
        </div>
    );
};

export default SidebarWidget;
