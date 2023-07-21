import React, { useContext, useEffect, useState } from 'react';
import images from 'assets/img';
import { Field, Form, Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import { auth, db } from '../../firebase';
import { AuthContext } from 'context/authContext/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
const LoginForm = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    let userSchema = yup.object().shape({
        email: yup
            .string()
            .email('Please enter a valid email')
            .required('Please enter your email'),
        password: yup.string().required('Please enter your password'),
    });

    //get user from AuthContext
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser.type === 'Member') {
            navigate('/');
        }
    }, []);

    const onSubmit = async (values, action) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate('/');
                // ...
            })
            .catch((error) => {
                setError(error.message);
            });
    };
    return (
        <div className='h-full'>
            <img
                src={images.logo}
                className='object-contain w-3/4 m-auto h-3/4 mt-4 sm:w-1/2 logo__img'
                alt=''
            />

            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={userSchema}
                onSubmit={onSubmit}
            >
                {(props) => (
                    <Form className='my-[30px] w-11/12 m-auto'>
                        <Field name='email'>
                            {({
                                field, // { name, value, onChange, onBlur }
                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                meta,
                            }) => {
                                return (
                                    <div className='flex flex-col w-11/12 m-auto my-4 xl:w-3/4'>
                                        <label
                                            htmlFor='email'
                                            className='text-left px-2 text-base '
                                        >
                                            <p className='flex items-center'>
                                                <span className='text-red-500 font-bold text-xl mr-1'>
                                                    *{' '}
                                                </span>
                                                Email:
                                            </p>
                                        </label>
                                        <input
                                            id='email'
                                            type='text'
                                            placeholder='Please enter your email'
                                            className={`outline-none my-2 py-1 border px-2 rounded-md placeholder:text-sm ${
                                                meta.touched && meta.error
                                                    ? 'border border-red-400'
                                                    : ''
                                            }`}
                                            {...field}
                                        />
                                        {meta.touched && meta.error && (
                                            <div className='error text-red-500 text-sm mt-[-5px]'>
                                                {meta.error}
                                            </div>
                                        )}
                                    </div>
                                );
                            }}
                        </Field>
                        <Field name='password'>
                            {({
                                field, // { name, value, onChange, onBlur }
                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                meta,
                            }) => (
                                <div className='flex flex-col w-11/12 m-auto xl:w-3/4'>
                                    <label
                                        htmlFor='password'
                                        className='text-left px-2 text-base '
                                    >
                                        <p className='flex items-center'>
                                            <span className='text-red-500 font-bold text-xl mr-1'>
                                                *{' '}
                                            </span>
                                            Password:
                                        </p>
                                    </label>
                                    <input
                                        id='password'
                                        type='password'
                                        placeholder='Please enter your password'
                                        className={`outline-none my-2 py-1 border px-2 rounded-md placeholder:text-sm ${
                                            meta.touched && meta.error
                                                ? 'border border-red-400'
                                                : ''
                                        }`}
                                        {...field}
                                    />
                                    {meta.touched && meta.error && (
                                        <div className='error text-red-500 text-sm mt-[-5px]'>
                                            {meta.error}
                                        </div>
                                    )}
                                    {error && (
                                        <p className='text-red-500'>
                                            Wrong email or password
                                        </p>
                                    )}
                                    <Link to='/forgetpass'>
                                        <span className='text-right text-sm text-blue-500 cursor-pointer underline mt-[1px]'>
                                            Forget password?
                                        </span>
                                    </Link>
                                </div>
                            )}
                        </Field>
                        <button
                            type='submit'
                            className='mt-[30px] w-1/2 bg-main text-slate-50 rounded-md p-2 font-bold text-base hover:bg-hovermain'
                        >
                            Log In
                        </button>
                    </Form>
                )}
            </Formik>
            <p className='text-center text-slate-400 mb-[20px] w-11/12 m-auto text-sm '>
                By signing up, you agree to the{' '}
                <a href='' className='underline hover:text-blue-500'>
                    Terms & Conditions
                </a>{' '}
                and{' '}
                <a href='' className='underline hover:text-blue-500'>
                    Privacy Policy
                </a>
            </p>
        </div>
    );
};

export default LoginForm;
