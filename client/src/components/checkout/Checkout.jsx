import Header from 'components/header/Header';
import { CartContext } from 'context/cartContext/cartContext';
import { Field, Form, Formik, resetForm } from 'formik';
import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { handleCreateOrder } from 'utils/handleCart';
import { AuthContext } from 'context/authContext/AuthContext';
import ReactLoading from 'react-loading';
import { doc, collection, getDoc, query, where } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';

const Checkout = ({ className }) => {
    const checkoutInfo = {
        firstName: '',
        lastName: '',
        phone: '',
        shippingAddress: '',
        paymentMethod: '',
    };
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState({});
    const [loading, setLoading] = useState(false);
    const { cart, dispatch } = useContext(CartContext);
    const { currentUser } = useContext(AuthContext);

    console.log('cart', cart);

    // total payment
    const shippingFee = 2;
    let total;
    let roundedTotal;
    const subtotal = useMemo(() => {
        if (cart) {
            return cart?.reduce((totalPaid, curVal) => {
                return (
                    parseFloat(curVal.productData.promotionprice) *
                        parseFloat(curVal.quantity) +
                    totalPaid
                );
            }, 0);
        }
    }, [cart]);
    if (subtotal) {
        total = +subtotal.toFixed(2) + +shippingFee.toFixed(2);
        roundedTotal = total.toFixed(2);
        console.log(roundedTotal);
    }

    // Validation
    let orderSchema = yup.object().shape({
        firstName: yup.string().required('Please enter your firstName'),
        lastName: yup.string().required('Please enter your lastName'),
        phone: yup.string().required('Please enter your phone number'),
        shippingAddress: yup.string().required('Please enter your Address'),
        paymentMethod: yup
            .string()
            .required('Please select your payment method'),
    });

    // submit form
    const onSubmit = (values, action) => {
        const orderId = uuidv4();
        console.log('values', values);
        handleCreateOrder(
            cart,
            currentUser.uid,
            subtotal.toFixed(2),
            roundedTotal,
            shippingFee,
            orderId,
            values
        );
        action.resetForm();
        navigate(`/orders/${orderId}`);
    };

    // useEffect(() => {
    //     if (cart.length === 0) {
    //         navigate('/');
    //     }
    // }, []);

    return (
        <div className={`${className}`}>
            {cart.length > 0 && (<Formik
                onSubmit={onSubmit}
                initialValues={checkoutInfo}
                enableReinitialize
                validationSchema={orderSchema}
            >
                {(props) => (
                    <Form className='w-11/12 m-auto mb-[70px]'>
                        <Field name='firstName'>
                            {({
                                field, // { name, value, onChange, onBlur }
                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                meta,
                            }) => {
                                return (
                                    <div className='flex flex-col w-11/12 m-auto pt-4 xl:w-3/4'>
                                        <label
                                            htmlFor='firstname'
                                            className='text-left px-2 text-base '
                                        >
                                            <p className='flex items-center'>
                                                <span className='text-red-500 font-bold text-xl mr-1'>
                                                    *{' '}
                                                </span>
                                                First Name:
                                            </p>
                                        </label>
                                        <input
                                            id='firstname'
                                            type='text'
                                            placeholder='Aurora'
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
                        <Field name='lastName'>
                            {({
                                field, // { name, value, onChange, onBlur }
                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                meta,
                            }) => {
                                return (
                                    <div className='flex flex-col w-11/12 m-auto pt-2 xl:w-3/4'>
                                        <label
                                            htmlFor='lastname'
                                            className='text-left px-2 text-base '
                                        >
                                            <p className='flex items-center'>
                                                <span className='text-red-500 font-bold text-xl mr-1'>
                                                    *{' '}
                                                </span>
                                                Last Name:
                                            </p>
                                        </label>
                                        <input
                                            id='lastname'
                                            type='text'
                                            placeholder='Vuong'
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
                        <Field name='phone'>
                            {({
                                field, // { name, value, onChange, onBlur }
                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                meta,
                            }) => {
                                return (
                                    <div className='flex flex-col w-11/12 m-auto pt-2 xl:w-3/4'>
                                        <label
                                            htmlFor='phone'
                                            className='text-left px-2 text-base '
                                        >
                                            <p className='flex items-center'>
                                                <span className='text-red-500 font-bold text-xl mr-1'>
                                                    *{' '}
                                                </span>
                                                Phone Number:
                                            </p>
                                        </label>
                                        <input
                                            id='phone'
                                            type='text'
                                            placeholder='+84 914566xxx'
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
                        <Field name='shippingAddress'>
                            {({
                                field, // { name, value, onChange, onBlur }
                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                meta,
                            }) => {
                                return (
                                    <div className='flex flex-col w-11/12 m-auto pt-2 xl:w-3/4'>
                                        <label
                                            htmlFor='shippingaddress'
                                            className='text-left px-2 text-base '
                                        >
                                            <p className='flex items-center'>
                                                <span className='text-red-500 font-bold text-xl mr-1'>
                                                    *{' '}
                                                </span>{' '}
                                                Shipping Address:{' '}
                                            </p>
                                        </label>
                                        <input
                                            id='shippingaddress'
                                            type='text'
                                            placeholder='Unit 1704 Corgi Boulevard, LA, USA'
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
                        <div className='w-11/12 m-auto bg-slate-50 mt-4 p-2 rounded-md xl:w-3/4'>
                            <p>Your Order</p>
                            {cart?.map((item, i) => (
                                <div
                                    className='flex bg-slate-200 items-center justify-between my-1'
                                    key={i}
                                >
                                    <div className='flex items-center'>
                                        <div className='p-2 mr-3'>
                                            <img
                                                src={item.productData.image}
                                                className='w-[80px] h-[80px]'
                                                alt=''
                                            />
                                        </div>
                                        <div className='p-2'>
                                            <p className='text-base font-bold'>
                                                {item.productData.name}
                                            </p>
                                            <p className='text-main'>
                                                ${' '}
                                                {
                                                    item.productData
                                                        .promotionprice
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-end'>
                                        <div className='text-center mr-3'>
                                            <span className='mr-4'>
                                                x {item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className='flex justify-between py-2'>
                                <p className='w-[50%]'>Subtotal</p> $
                                {subtotal.toFixed(2)}
                            </div>
                            <div className='flex justify-between pb-2'>
                                <p className='w-[50%]'>Shipping fee</p> $
                                {shippingFee.toFixed(2)}
                            </div>
                            <div className='flex justify-between py-2 items-center border-top border-t'>
                                <p className='w-[50%]'>Total</p>
                                <span className='text-xl font-bold text-main'>
                                    $ {roundedTotal && roundedTotal}
                                </span>
                            </div>
                        </div>
                        <div className='w-11/12 m-auto bg-slate-50 mt-4 p-2 rounded-md xl:w-3/4'>
                            <Field name='paymentMethod'>
                                {({
                                    field, // { name, value, onChange, onBlur }
                                    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                    meta,
                                }) => (
                                    <div className='flex flex-col xl:w-3/4 my-4'>
                                        <select
                                            id='paymentMethod'
                                            placeholder='Please enter your payment method'
                                            className={`outline-none my-2 py-1 border px-2 rounded-md placeholder:text-sm ${
                                                meta.touched && meta.error
                                                    ? 'border border-red-400'
                                                    : ''
                                            }`}
                                            {...field}
                                        >
                                            <option value=''>
                                                Please select your payment
                                                method
                                            </option>
                                            <option value='cash'>
                                                Cash on delivery
                                            </option>
                                            {/* <option value='card'>
                                                    Pay by card
                                                </option> */}
                                        </select>
                                        {meta.touched && meta.error && (
                                            <div className='error text-red-500 text-sm mt-[-5px]'>
                                                {meta.error}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className='flex items-center justify-around my-5'>
                            <Link to='/cart'>
                                <p className='hover:text-main cursor-pointer mb-4'>
                                    Return to Cart{' '}
                                </p>
                            </Link>

                            <button
                                disabled={props.isSubmitting}
                                type='submit'
                                className='bg-main text-slate-50 rounded-md p-2 font-bold text-base hover:bg-hovermain px-4 mb-4'
                            >
                                Continue to Shipping
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>)}
            {cart.length === 0 && <div className='text-center'>No items to checkout</div>}
        </div>
    );
};

export default Checkout;
