const { createContext, useState } = require('react');

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
    const [searchValue, setSearchValue] = useState(' ');
    const [searchType, setSearchType] = useState();
    return (
        <SearchContext.Provider
            value={{
                searchValue: searchValue,
                setSearchValue: setSearchValue,
                searchType: searchType,
                setSearchType: setSearchType,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
