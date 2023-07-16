import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { stringify, v4 as uuidv4 } from 'uuid';
const values = {};
export const AuthContext = createContext(values);
export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );
    const values = {
        currentUser,
        setCurrentUser,
    };
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser({ ...user, type: 'Member' });
            } else {
                setCurrentUser(null);
            }
        });
    }, []);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('user')) === null) {
            const temID = uuidv4();
            setCurrentUser({
                type: 'NoneMember',
                uid: `Nonmember_${temID}`,
            });
        }
    }, [currentUser]);

    localStorage.setItem('user', JSON.stringify(currentUser));
    // console.log('values', values);
    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};
