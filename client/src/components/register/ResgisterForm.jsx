import { useContext, useEffect, useState } from 'react';
import React from 'react';
import images from 'assets/img';
import { Field, Form, Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import { auth, db } from '../../firebase';

import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';
import { AuthContext } from 'context/authContext/AuthContext';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const RegisterForm = () => {
    const navigate = useNavigate();
    let signUpSchema = yup.object().shape({
        username: yup.string().min(5).required('Please enter your username'),
        email: yup
            .string()
            .email('Please enter a valid email')
            .required('Please enter your email'),
        password: yup
            .string()
            .min(5)
            .matches(passwordRules, {
                message:
                    'Password should have min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit',
            })
            .required('Please enter your password'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Please re-enter your password'),
        gender: yup
            .string()
            .oneOf(['male', 'female', 'other'], 'Invalid Gender')
            .required('Please select your gender'),
    });
    const onSubmit = async (values, action) => {
        console.log('value', values);
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            console.log('res', res);
            await setDoc(doc(db, 'users', res.user.uid), {
                ...values,
                timeStamp: serverTimestamp(),
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const { currentUser } = useContext(AuthContext);
    console.log('currentUser', currentUser);

    return (
        <div className='h-full'>
            <img
                src={images.logo}
                className='object-contain w-3/4 m-auto h-3/4 mt-4 sm:w-1/2 logo__img'
                alt=''
            />

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: '',
                    username: '',
                    gender: '',
                }}
                validationSchema={signUpSchema}
                onSubmit={onSubmit}
            >
                {(props) => (
                    <Form className='my-[30px] w-11/12 m-auto'>
                        <Field name='username'>
                            {({
                                field, // { name, value, onChange, onBlur }
                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                meta,
                            }) => {
                                return (
                                    <div className='flex flex-col w-11/12 m-auto my-4 xl:w-3/4'>
                                        <label
                                            htmlFor='username'
                                            className='text-left px-2 text-base '
                                        >
                                            Username:
                                        </label>
                                        <input
                                            id='username'
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
                                            Email:
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
                                        Password:
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
                                </div>
                            )}
                        </Field>
                        <Field name='confirmPassword'>
                            {({
                                field, // { name, value, onChange, onBlur }
                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                meta,
                            }) => (
                                <div className='flex flex-col w-11/12 m-auto xl:w-3/4 my-4'>
                                    <label
                                        htmlFor='confirmPassword'
                                        className='text-left px-2 text-base '
                                    >
                                        Confirm Password:
                                    </label>
                                    <input
                                        id='confirmPassword'
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
                                </div>
                            )}
                        </Field>
                        <Field name='gender'>
                            {({
                                field, // { name, value, onChange, onBlur }
                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                meta,
                            }) => (
                                <div className='flex flex-col w-11/12 m-auto xl:w-3/4 my-4'>
                                    <select
                                        id='confirmPassword'
                                        type='password'
                                        placeholder='Please enter your password'
                                        className={`outline-none my-2 py-1 border px-2 rounded-md placeholder:text-sm ${
                                            meta.touched && meta.error
                                                ? 'border border-red-400'
                                                : ''
                                        }`}
                                        {...field}
                                    >
                                        <option value=''>
                                            Please select your gender
                                        </option>
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>
                                        <option value='other'>Other</option>
                                    </select>
                                    {meta.touched && meta.error && (
                                        <div className='error text-red-500 text-sm mt-[-5px]'>
                                            {meta.error}
                                        </div>
                                    )}
                                </div>
                            )}
                        </Field>
                        <button
                            disabled={props.isSubmitting}
                            type='submit'
                            className='mt-[30px] w-1/2 bg-main text-slate-50 rounded-md p-2 font-bold text-base hover:bg-hovermain'
                        >
                            Sign Up
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

export default RegisterForm;
