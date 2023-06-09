import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import images from 'assets/img';

const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const LoginForm = () => {
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    return (
        <div className='h-full'>
            <img
                src={images.logo}
                className='object-contain w-3/4 m-auto h-3/4 mt-2 sm:w-1/2 logo__img'
                alt=''
            />

            <Form
                name='basic'
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 12,
                }}
                className='mt-[20px] h-full '
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
            >
                <Form.Item
                    label='Username'
                    name='username'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Password'
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                    <a className='login-form-forgot text-right block underline text-blue-500 text-xs' href='#'>
                        Forget password?
                    </a>
                </Form.Item>

                <Form.Item
                    name='remember'
                    valuePropName='checked'
                    {...tailFormItemLayout}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button
                        htmlType='submit'
                        className='bg-main text-slate-50 px-[20px] w-2/5'
                    >
                        Log in
                    </Button>
                </Form.Item>
            </Form>
            <p className='text-center text-slate-400 mb-[20px]'>
                By signing up, you agree to the{' '}
                <a href='' className='underline'>
                    Terms & Conditions
                </a>{' '}
                and{' '}
                <a href='' className='underline'>
                    Privacy Policy
                </a>
            </p>
        </div>
    );
};

export default LoginForm;
