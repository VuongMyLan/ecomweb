import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from 'context/authContext/AuthContext';
import { db, storage } from '../../firebase';
import {
    collection,
    doc,
    getDocs,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';
import { GetSavedRec } from 'utils/getData';
export const SavedRecipesContext = createContext();

const SavedRecipesContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (currentUser?.type === 'Member') {
            GetSavedRec('savedrecipes', currentUser.uid, setData);
        }
    }, []);

    return (
        <SavedRecipesContext.Provider value={{ data: data }}>
            {children}
        </SavedRecipesContext.Provider>
    );
};
export default SavedRecipesContextProvider;
