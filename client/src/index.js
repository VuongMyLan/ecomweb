import React from 'react';
import ReactDOM from 'react-dom/client';
import style from './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartContextProvider } from 'context/cartContext/cartContext';
import { AuthContextProvider } from 'context/authContext/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <AuthContextProvider>
        <CartContextProvider>
            <App />
        </CartContextProvider>
    </AuthContextProvider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
