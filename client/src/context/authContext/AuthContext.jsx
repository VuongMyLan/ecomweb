import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Home from 'pages/home/Home';

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
                setCurrentUser(user);
                localStorage.setItem('user', JSON.stringify(currentUser));
            } else {
                setCurrentUser(user);
            }
        });
    }, [currentUser]);

    // console.log('values', values);
    return (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
};
