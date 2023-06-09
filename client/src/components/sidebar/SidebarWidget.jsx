import React from 'react';
import images from 'assets/img/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import SidebarWidgetItem from './SidebarWidgetItem';
import CONSTANT_TEXT from 'components/label';

const SidebarWidget = ({
    className,
    setShowWidget,
    itemWidget,
	handleLogout
}) => {
    return (
        <div
            className={`${className} w-96 bg-slate-50 h-screen fixed z-50 flex flex-col pt-3 items-center shadow-2xl lg:hidden`}
        >
            {
                <SidebarWidgetItem
                    images={images}
                    setShowWidget={setShowWidget}
                    itemWidget={itemWidget}
					handleLogout={handleLogout}
                />
            }
        </div>
    );
};

export default SidebarWidget;
