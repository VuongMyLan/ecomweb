import React, { useContext, useEffect, useState } from 'react';
import './shoppinglist.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faMinus,
    faTrash,
    faUpRightAndDownLeftFromCenter,
} from '@fortawesome/free-solid-svg-icons';
import CollapseComponent from './Collapse';
import { GetDoc } from 'utils/getData';
import { AuthContext } from 'context/authContext/AuthContext';
import Tippy from '@tippyjs/react';
import { Link, useNavigate } from 'react-router-dom';
const ShoppingList = ({ className, setShowShoppingList, setExpand }) => {
    const navigate = useNavigate();
    const [shoppingLists, setShoppingList] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser.type === 'Member') {
            GetDoc('shoppingLists', currentUser.uid, setShoppingList);
        } else {
            navigate('/login');
        }
    }, []);

    return (
        <div
            className={`flex-1 bg-slate-200 rounded-md shopping__list ${className} ${
                setShowShoppingList && 'fixed right-0 top-0'
            } ${!setShowShoppingList && 'w-full m-auto'}`}
        >
            <div
                className={`${
                    !setShowShoppingList && 'md:w-[90%] xl:w-[70%] m-auto'
                } h-screen p-4`}
            >
                <div className='font-bold flex justify-between items-center '>
                    <p>Shopping List</p>
                    {setShowShoppingList && (
                        <p className='flex items-center'>
                            <span>
                                {' '}
                                <FontAwesomeIcon
                                    icon={faCircleXmark}
                                    className='text-xl hover:text-main mr-5 cursor-pointer'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowShoppingList(false);
                                    }}
                                />
                            </span>

                            <span
                                onClick={() =>
                                    setShowShoppingList(!shoppingLists)
                                }
                            >
                                <Link to='/shoppinglists'>
                                    <FontAwesomeIcon
                                        icon={faUpRightAndDownLeftFromCenter}
                                        className='text-base hover:text-main mr-5'
                                    />
                                </Link>
                            </span>
                        </p>
                    )}
                </div>
                {currentUser.type === 'Member' &&
                    Object.values(shoppingLists)?.map((item, i) => (
                        <CollapseComponent item={item} key={i} />
                    ))}
            </div>
        </div>
    );
};

export default ShoppingList;
