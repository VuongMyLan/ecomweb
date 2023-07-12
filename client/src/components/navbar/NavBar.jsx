import React, { useState } from 'react';
import CONSTANT_TEXT from 'components/label';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogout } from 'utils/handleLogout';
const NavBar = ({ className }) => {
    const { PROFILE__TEXT } = CONSTANT_TEXT;
    const navigate = useNavigate();
    const [tab, setTab] = useState();
    console.log('tab', tab);
    return (
        <div className={`${className}`}>
            <div className='mt-[10px] mx-[10px]'>
                <ul>
                    {Object.values(PROFILE__TEXT).map((item, i) => (
                        <li
                            key={i}
                            className={`py-[10px] pl-[10px] hover:text-main cursor-pointer hover:font-bold ${
                                tab === i && 'text-main font-bold'
                            }`}
                        >
                            <Link
                                to={item.to}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setTab(i);
                                    if (
                                        e.target.innerText ===
                                        PROFILE__TEXT.logout.title
                                    ) {
                                        console.log(123);
                                        handleLogout();
                                        navigate('/login');
                                    }
                                }}
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))}

                    <li></li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
