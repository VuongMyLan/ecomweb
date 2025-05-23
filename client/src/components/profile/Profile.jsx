import React, { useContext, useEffect, useState } from 'react';
import images from 'assets/img';
import { Field, Formik, Form } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
    faCloudArrowUp,
    faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from 'context/authContext/AuthContext';
import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp,
    updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../../firebase';
import Tippy from '@tippyjs/react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import ProfileHeader from './ProfileHeader';
import './profile.scss';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const Profile = ({ className }) => {
    const [isEdit, setIsEdit] = useState(true);
    const [updateComplete, setUpdateComplete] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
        phonenumber: '',
        username: '',
        gender: '',
        address: '',
        img: '',
    });
    const [img, setImg] = useState();
    const [perc, setPerc] = useState(null);
    const [uploadProfilePic, setUploadProfilePic] = useState(false);

    // show Sidebar Profile on small device
    const [showSideBarWidget, setShowSideBarWidget] = useState(false);
    const renderSideBarWidget = () => {
        setShowSideBarWidget(true);
    };

    // Validation
    let profileSchema = yup.object().shape({
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
        // address: yup.string().required('Please enter your address'),
        // phonenumber: yup.string().required(),
        gender: yup
            .string()
            .oneOf(['male', 'female', 'other'], 'Invalid Gender')
            .required('Please select your gender'),
    });

    //get User Data
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const getData = async () => {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // const { username, email, password, gender, phonenumber, address } =
            //     docSnap.data();
            setData({
                email: docSnap.data().email,
                password: docSnap.data().password,
                phonenumber: docSnap.data().phonenumber,
                username: docSnap.data().username,
                gender: docSnap.data().gender,
                address: docSnap.data().address,
                img: docSnap.data().img,
            });
        } else {
            console.log('No such document!');
        }
    };

    // Upload profile picture
    const handleUpload = (e) => {
        setImg(e.target.files[0]);
    };
    const uploadFile = () => {
        if (img) {
            const name = new Date().getTime();
            const storageRef = ref(storage, img.name);
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setPerc(progress);
                    console.log('Upload is ' + progress + '% done');
                    setUploadProfilePic(true);
                    setTimeout(() => {
                        setUploadProfilePic(false);
                    }, 5000);
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        async (downloadURL) => {
                            const user = doc(db, 'users', currentUser.uid);
                            await updateDoc(user, {
                                img: downloadURL,
                            });
                        }
                    );
                }
            );
        }
    };

    useEffect(() => {
        getData();
        img && uploadFile();
    }, [img]);

    // Submitform
    const onSubmit = async (values, action) => {
        console.log(values);
        try {
            const user = doc(db, 'users', currentUser.uid);
            if (values.phonenumber === undefined) {
                await updateDoc(user, {
                    ...values,
                    phonenumber: '',
                });
            } else if (values.address === undefined) {
                await updateDoc(user, {
                    ...values,
                    address: '',
                });
            } else {
                await updateDoc(user, {
                    ...values,
                });
            }
            setUpdateComplete(true);
            setTimeout(() => {
                setUpdateComplete(false);
            }, 5000);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`${className}`}>
            <div className='profile__img bg-slate-200 rounded-lg pt-[10px]'>
                <div className='flex flex-col items-center'>
                    <img
                        src={
                            (img && URL.createObjectURL(img)) ||
                            data.img ||
                            'https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/default-avatar.webp?alt=media&token=91818476-3ba0-4c46-8071-d34c96310817'
                        }
                        alt=''
                        className='h-[200px] w-[200px] object-cover rounded-md m-auto'
                    />
                    <Tippy content='Upload photo'>
                        <p className='mt-[20px] border bg-main rounded-md p-2 text-slate-50 cursor-pointer hover:bg-hovermain'>
                            <label htmlFor='uploadfile'>
                                <FontAwesomeIcon
                                    icon={faCloudArrowUp}
                                    className='cursor-pointer'
                                />
                            </label>
                            <input
                                className='ml-2 mr-2 hidden'
                                type='file'
                                id='uploadfile'
                                onChange={handleUpload}
                            />
                        </p>
                    </Tippy>
                    {uploadProfilePic && (
                        <p className='mt-3 text-red-500'>
                            Your profile picture has been update successfully!
                        </p>
                    )}
                    {updateComplete && (
                        <p className='mt-3 text-center'>
                            Your profile Information has been update
                            successfully!
                        </p>
                    )}
                </div>
                <div className='mt-[20px]'>
                    <div>
                        <Formik
                            initialValues={data}
                            validationSchema={profileSchema}
                            enableReinitialize
                            onSubmit={onSubmit}
                        >
                            {(props) => (
                                <Form className='my-[30px] w-[90%] sm:w-[70%] m-auto mb-[60px] flex flex-col bg-white rounded-md pt-5'>
                                    <Field name='username'>
                                        {({
                                            field, // { name, value, onChange, onBlur }
                                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                            meta,
                                        }) => {
                                            return (
                                                <div className='flex flex-col w-11/12 m-auto my-2 xl:w-3/4'>
                                                    <div className='flex justify-between items-center'>
                                                        <label
                                                            htmlFor='username'
                                                            className='text-left px-2 text-base '
                                                        >
                                                            Username:
                                                        </label>
                                                        <span
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setIsEdit(
                                                                    !isEdit
                                                                );
                                                            }}
                                                        >
                                                            <Tippy content='Edit info'>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faPenToSquare
                                                                    }
                                                                />
                                                            </Tippy>
                                                        </span>
                                                    </div>

                                                    <input
                                                        id='username'
                                                        type='text'
                                                        disabled={isEdit}
                                                        placeholder='Aurora Lan'
                                                        className={`outline-none my-2 py-1 border px-2 rounded-md placeholder:text-sm disabled:bg-slate-300${
                                                            meta.touched &&
                                                            meta.error
                                                                ? 'border border-red-400'
                                                                : ''
                                                        }`}
                                                        {...field}
                                                    />
                                                    {meta.touched &&
                                                        meta.error && (
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
                                                <div className='flex flex-col w-11/12 m-auto my-2 xl:w-3/4'>
                                                    <label
                                                        htmlFor='email'
                                                        className='text-left px-2 text-base '
                                                    >
                                                        Email:
                                                    </label>
                                                    <input
                                                        disabled={isEdit}
                                                        id='email'
                                                        type='text'
                                                        placeholder='auroralan@gm.com'
                                                        className={`outline-none my-2 py-1 border px-2 rounded-md placeholder:text-sm disabled:bg-slate-300${
                                                            meta.touched &&
                                                            meta.error
                                                                ? 'border border-red-400'
                                                                : ''
                                                        }`}
                                                        {...field}
                                                    />
                                                    {meta.touched &&
                                                        meta.error && (
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
                                            <div className='flex flex-col w-11/12 m-auto xl:w-3/4 my-2'>
                                                <label
                                                    htmlFor='password'
                                                    className='text-left px-2 text-base '
                                                >
                                                    Password:
                                                </label>
                                                <input
                                                    disabled={isEdit}
                                                    id='password'
                                                    type='password'
                                                    placeholder='Please enter your password'
                                                    className={`outline-none my-2 py-1 border px-2 rounded-md placeholder:text-sm disabled:bg-slate-300${
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
                                        )}
                                    </Field>
                                    <Field name='phonenumber'>
                                        {({
                                            field, // { name, value, onChange, onBlur }
                                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                            meta,
                                        }) => (
                                            <div className='flex flex-col w-11/12 m-auto xl:w-3/4 my-2'>
                                                <label
                                                    htmlFor='phonenumber'
                                                    className='text-left px-2 text-base '
                                                >
                                                    Phone Number
                                                </label>
                                                <input
                                                    disabled={isEdit}
                                                    id='phonenumber'
                                                    type='text'
                                                    placeholder='+84 09xxxxxx'
                                                    className={`outline-none my-2 py-1 border px-2 rounded-md placeholder:text-sm disabled:bg-slate-300${
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
                                        )}
                                    </Field>
                                    <Field name='address'>
                                        {({
                                            field, // { name, value, onChange, onBlur }
                                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                            meta,
                                        }) => (
                                            <div className='flex flex-col w-11/12 m-auto xl:w-3/4 my-2'>
                                                <label
                                                    htmlFor='address'
                                                    className='text-left px-2 text-base '
                                                >
                                                    Address
                                                </label>
                                                <input
                                                    disabled={isEdit}
                                                    id='address'
                                                    type='text'
                                                    placeholder='Unit 1708 Corgi Boulevard, LA, USA '
                                                    className={`outline-none my-2 py-1 border px-2 rounded-md placeholder:text-sm disabled:bg-slate-300${
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
                                        )}
                                    </Field>
                                    <Field name='gender'>
                                        {({
                                            field, // { name, value, onChange, onBlur }
                                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                            meta,
                                        }) => (
                                            <div className='flex flex-col w-11/12 m-auto xl:w-3/4 my-2'>
                                                <select
                                                    disabled={isEdit}
                                                    id='confirmPassword'
                                                    type='password'
                                                    placeholder='Please enter your password'
                                                    className={`outline-none my-2 py-1 border px-2 rounded-md placeholder:text-sm disabled:bg-slate-300${
                                                        meta.touched &&
                                                        meta.error
                                                            ? 'border border-red-400'
                                                            : ''
                                                    }`}
                                                    {...field}
                                                >
                                                    <option value=''>
                                                        Please select your
                                                        gender
                                                    </option>
                                                    <option value='male'>
                                                        Male
                                                    </option>
                                                    <option value='female'>
                                                        Female
                                                    </option>
                                                    <option value='other'>
                                                        Other
                                                    </option>
                                                </select>
                                                {meta.touched && meta.error && (
                                                    <div className='error text-red-500 text-sm mt-[-5px]'>
                                                        {meta.error}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                    <div className='mt-[30px] w-full flex justify-center mb-[20px]'>
                                        <button
                                            type='submit'
                                            disabled={
                                                (perc !== null && perc < 100) ||
                                                props.isSubmitting
                                            }
                                            className='bg-main text-slate-50 rounded-md p-2 font-bold text-base hover:bg-hovermain w-1/2 disabled:opacity-75 disabled:cursor-not-allowed'
                                        >
                                            Update
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <p className='text-slate-500 text-right mx-4 text-sm m-3 shadow-xl'>
                © Copyright Aurora Ltd., 2023
            </p>
        </div>
    );
};

export default Profile;
