import React, { useContext, useState } from 'react';
import images from 'assets/img';
import { Field, Form, Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import { auth, db } from '../../firebase';
import { AuthContext } from 'context/authContext/AuthContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [message, setMessage] = useState();
    const [error, setError] = useState('');

    const navigate = useNavigate();
    let userSchema = yup.object().shape({
        email: yup
            .string()
            .email('Please enter a valid email')
            .required('Please enter your email'),
    });

    //get user from AuthContext
    const { currentUser, setCurrentUser } = useContext(AuthContext);

    const onSubmit = (values, action) => {
        sendPasswordResetEmail(auth, values.email, {
            url: 'http://localhost:3000/login',
        })
            .then(() => {
                setMessage('Password reset email has been sent');
                console.log('auth', auth);
            })
            .catch((error) => {
                setError('Email does not exist');
            });
    };
    return (
        <div className='flex flex-col justify-center items-center w-screen h-screen bg-loginBackground bg-center bg-no-repeat bg-cover'>
            <div className='w-2/3 h-auto m-auto bg-slate-50 rounded-md'>
                <div className='mt-7'>
                    <img
                        src={images.logo}
                        className='object-contain w-3/4 m-auto h-3/4 mt-4 sm:w-1/2 logo__img'
                        alt=''
                    />
                </div>
                <div className='w-11/12 m-auto flex flex-col items-center'>
                    {message && (
                        <p className='text-main bg-slate-50 font-bold w-2/5 text-center mt-[20px] rounded-md'>
                            {message}
                        </p>
                    )}
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={userSchema}
                        onSubmit={onSubmit}
                    >
                        {(props) => (
                            <Form className='my-[30px] w-11/12 m-auto flex flex-col items-center'>
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
                                                        meta.touched &&
                                                        meta.error
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

                                <button
                                    type='submit'
                                    className='w-11/12 text-center m-auto bg-main text-slate-50 rounded-md p-2 font-bold text-base hover:bg-hovermain xl:w-3/4'
                                >
                                    Reset Password
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
