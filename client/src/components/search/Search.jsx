import React, { useContext, useState } from 'react';
import './search.scss';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { SearchContext } from 'context/searchContext/SearchContext';
import { useLocation, useNavigate } from 'react-router-dom';

const { Search } = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1677ff',
        }}
    />
);

const SearchItem = ({ className }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // get SearchContext
    const { searchValue, setSearchValue } = useContext(SearchContext);
    const handleKeyPress = (e, value) => {
        if (e.key === 'Enter') {
            console.log('Enter key pressed');
            if (location.pathname === '/recipes') {
                navigate('/recipes/c/search');
            }
            if (location.pathname === '/') {
                setSearchValue(value);
            }
        }
        if (location.pathname === '/recipes') {
            navigate('/recipes/c/search');
            setSearchValue('');
        }
    };
    return (
        <div
            className={`searchItem__icon text-center flex items-center justify-center ${className}`}
        >
            <input
                placeholder='Search your ingredients '
                spellCheck={false}
                className='py-1 px-3 w-full placeholder:text-base'
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
                onKeyDown={(e) => handleKeyPress(e)}
            />

            <button
                className='search-btn px-2 flex justify-center items-center'
                onMouseDown={(e) => e.preventDefault()}
            >
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className='search__icon text-lg px-2'
                    onClick={(e) => {
                        console.log('searchValue', searchValue);
                        handleKeyPress(e, searchValue);
                    }}
                />
            </button>
        </div>
    );
};

export default SearchItem;
