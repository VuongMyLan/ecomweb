import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { array } from 'yup';
const SidebarWidgetItem = ({
    images,
    setShowWidget,
    itemWidget,
    handleLogout,
}) => {
    const arrayValue = Object.values(itemWidget);
    const renderlistitem = () => {
        return arrayValue?.map((item, i) => (
            <div className='py-3 hover:text-main block' key={i}>
                {item.title !== 'Log out' ? (
                    <Link to={item.to}>{item.title}</Link>
                ) : (
                    <p onClick={handleLogout}>{item.title}</p>
                )}
            </div>
        ));
    };

    return (
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
            <div className='mt-5 text-xl text-textmain text-left w-3/4'>
                <ul className='text-left'>{renderlistitem()}</ul>
            </div>
        </>
    );
};

export default SidebarWidgetItem;
