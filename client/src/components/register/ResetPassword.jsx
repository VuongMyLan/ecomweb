import React, { useContext, useState } from 'react';
import images from 'assets/img';
import { Field, Form, Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import { auth, db } from '../../firebase';
import { AuthContext } from 'context/authContext/AuthContext';
import { confirmPasswordReset, sendPasswordResetEmail } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
const ResetPassword = () => {
    const [message, setMessage] = useState();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Validation
    let userSchema = yup.object().shape({
        newpassword: yup
            .string()
            .min(5)
            .matches(passwordRules, {
                message:
                    'Password should have min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit',
            })
            .required('Please enter your password'),
    });

    //get user from AuthContext
    const { currentUser, setCurrentUser } = useContext(AuthContext);

    //get param from url
    const useQuery = () => {
        const location = useLocation();
        console.log(location.search);
        return new URLSearchParams(location.search);
    };
    const query = useQuery();
    const oobCode = query.get('oobCode');

    //resetpassword
    const onSubmit = async (values, action) => {
        confirmPasswordReset(auth, oobCode, values.newpassword)
            .then((res) => {
                setMessage('Password has been changed');

                navigate('/');
            })
            .catch((err) => console.log(err));
        const user = doc(db, 'users', currentUser.uid);
        console.log('user', user);
        await updateDoc(user, {
            password: values.newpassword,
            confirmPassword: values.newpassword,
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
                    {error && (
                        <p className='text-red bg-slate-50 font-bold w-2/5 text-center mt-[20px] rounded-md'>
                            {error}
                        </p>
                    )}
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={userSchema}
                        onSubmit={onSubmit}
                    >
                        {(props) => (
                            <Form className='my-[30px] w-11/12 m-auto flex flex-col items-center'>
                                <Field name='newpassword'>
                                    {({
                                        field, // { name, value, onChange, onBlur }
                                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                        meta,
                                    }) => {
                                       
                                        return (
                                            <div className='flex flex-col w-11/12 m-auto my-4 xl:w-3/4'>
                                                <label
                                                    htmlFor='newpassword'
                                                    className='text-left px-2 text-base '
                                                >
                                                    New password:
                                                </label>
                                                <input
                                                    id='newpassword'
                                                    type='password'
                                                    placeholder='Please enter your new password'
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

export default ResetPassword;
