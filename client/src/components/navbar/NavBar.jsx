import React from 'react';
import CONSTANT_TEXT from 'components/label';
const NavBar = ({ className }) => {
    const { PROFILE__TEXT } = CONSTANT_TEXT;

    return (
        <div className={`${className}`}>
            <div className='mt-[10px] mx-[10px]'>
                <ul>
                    {Object.values(PROFILE__TEXT).map((item, i) => (
                        <li
                            key={i}
                            className='py-[10px] pl-[10px] hover:text-main cursor-pointer hover:font-bold'
                        >
                            {item.title}
                        </li>
                    ))}

                    <li></li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
