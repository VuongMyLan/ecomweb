import React from 'react';
import './search.scss';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
const { Search } = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1677ff',
        }}
    />
);

const SearchItem = () => {
    return (
        <div
            className={`searchItem__icon text-center flex items-center justify-center`}
        >
            <input
                placeholder='Search your ingredients'
                spellCheck={false}
                className='py-1 px-3  '
            />

            <button
                className='search-btn px-2 flex justify-center items-center'
                onMouseDown={(e) => e.preventDefault()}
            >
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className='search__icon text-lg px-2'
                />
            </button>
        </div>
    );
};

export default SearchItem;
