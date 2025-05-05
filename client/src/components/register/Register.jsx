import { Tabs } from 'antd';
import Cart from 'components/cart/Cart';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import './login.scss';
import RegisterForm from './ResgisterForm';

const Register = () => {
    const [login, setLogin] = useState(true);
    const [index, setIndex] = useState(0);
    const loginTitle = ['Log In', 'Register'];

    return (
        <div className='Register__container flex justify-center items-center w-full h-screen bg-loginBackground bg-center bg-no-repeat bg-cover'>
            <div className='w-[90%] md:w-1/2 h-auto bg-slate-50 rounded-md text-center'>
                <div className='h-auto w-11/12 border-b-2 m-auto flex items-center justify-center'>
                    {loginTitle?.map((title, i) => (
                        <button
                            key={i}
                            className={`px-5 inline-block text-center py-2 ${
                                i === index
                                    ? 'bg-main text-slate-50 shadow-xl rounded-md'
                                    : ''
                            }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIndex(i);
                                setLogin(!login);
                            }}
                        >
                            {title}
                        </button>
                    ))}
                </div>
                {login ? <LoginForm /> : <RegisterForm />}
            </div>
        </div>
    );
};

export default Register;
