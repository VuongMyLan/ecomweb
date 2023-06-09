import { Tabs } from 'antd';
import Cart from 'components/cart/Cart';
import React from 'react';
import LoginForm from './LoginForm';
import './login.scss';
import RegisterForm from './ResgisterForm';

const Login = () => {
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: `Log in`,
            children: <LoginForm />,
        },
        {
            key: '2',
            label: `Register`,
            children: <RegisterForm/>,
        },
    ];
    return (
        <div className='login__container flex justify-center items-center w-screen h-screen bg-loginBackground bg-center bg-no-repeat bg-cover'>
            <Tabs
                defaultActiveKey='1'
                items={items}
                onChange={onChange}
                className='w-3/5 h-auto bg-slate-50 border px-[20px] active:text-main rounded-md'
            />
        </div>
    );
};

export default Login;
