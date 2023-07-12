import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import { getDetailMeal } from 'context/apiCall/ApiCall';
import React, { useContext, useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import {
    collection,
    doc,
    onSnapshot,
    query,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { AuthContext } from 'context/authContext/AuthContext';
import { GetDoc } from 'utils/getData';

const RecipeDetail = () => {
    const paramURL = useParams();
    const [mealDetail, setMealDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const [shoppingList, setShoppingList] = useState([]);
    const [shoppingListItem, setShoppingListItem] = useState([]);
    const fetchDetailMeal = async (uri) => {
        setLoading(true);
        const result = await getDetailMeal(uri);
        console.log('result', result);
        setMealDetail([result]);
        setLoading(false);
    };
    useEffect(() => {
        fetchDetailMeal(paramURL.id);
    }, [paramURL]);

    useEffect(() => {
        if (currentUser) {
            GetDoc('shoppingLists', currentUser.uid, setShoppingList);
        }
    }, []);

    useEffect(() => {
        if (shoppingList) {
            setShoppingListItem(
                Object.values(shoppingList)?.filter(
                    (item) => item.recipeID === paramURL.id
                )
            );
        }
    }, [shoppingList]);

    const handleAddtoShoppingLists = async (item, uri, document, uid) => {
        if (shoppingListItem.length === 0) {
            console.log(123);
            await setDoc(doc(db, document, uid), {
                [uri]: {
                    ingredientLines: [item],
                    label: mealDetail[0].recipe.label,
                    uri: mealDetail[0].recipe.uri,
                    recipeID: paramURL.id,
                },
            });
        }
        if (shoppingListItem.length > 0 && mealDetail.length > 0) {
            shoppingListItem[0]?.ingredientLines.push(item);
            await updateDoc(doc(db, document, uid), {
                [uri]: {
                    ingredientLines: shoppingListItem[0].ingredientLines,
                    label: mealDetail[0].recipe.label,
                    uri: mealDetail[0].recipe.uri,
                    recipeID: paramURL.id,
                },
            });
        }
    };
    const handleRemoveFromShoppingLists = async (item, uri, document, uid) => {
        if (mealDetail.length > 0 && shoppingListItem.length > 0) {
            const updateIngreList = shoppingListItem[0].ingredientLines.filter(
                (itemList) => itemList !== item
            );
            console.log('updateIngreList', updateIngreList);
            console.log(123);
            await updateDoc(doc(db, document, uid), {
                [uri]: {
                    ingredientLines: updateIngreList,
                    label: mealDetail[0].recipe.label,
                    uri: mealDetail[0].recipe.uri,
                    recipeID: paramURL.id,
                },
            });
        }
    };
    console.log('shoppingList', shoppingList);
    console.log('shoppingListItem', shoppingListItem);
    const {
        images,
        image,
        ingredientLines,
        label,
        totalTime,
        dietLabels,
        healthLabels,
        url,
    } = mealDetail[0]?.recipe || {};

    return (
        <>
            <Header />
            <div className='mt-[80px] md:relative'>
                <img
                    src='https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/recipes%2Fbaked-avocado-eggs-1675831846883-feature.webp?alt=media&token=5a98a165-0a4f-4d8c-b597-54bb1ec161cd'
                    className='object-cover object-center w-full h-[80vh]'
                    alt=''
                />
                <div className='xl:w-[70%] xl:m-auto'>
                    <p className='text-3xl font-bold text-center text-slate-400 drop-shadow-sm md:absolute md:top-4 md:left-4 md:bg-slate-400 md:text-slate-100 md:p-2 md:rounded-md '>
                        {mealDetail && label}
                    </p>
                    <p className='m-2'>
                        {dietLabels?.map((item, i) => (
                            <span
                                className='text-xs bg-slate-800 font-bold text-slate-200 p-2 px-3 rounded-full mr-2'
                                key={i}
                            >
                                {item.toUpperCase()}
                            </span>
                        ))}
                    </p>
                    <div className='md:flex'>
                        <div className='md:w-[50%]'>
                            <p className='p-2 pb-0'>
                                <span className='text-slate-500'>
                                    How to cook:{' '}
                                </span>
                                <a
                                    className='italic'
                                    href={url}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    {url}
                                </a>
                            </p>
                            <p className='text-slate-500 p-2'>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quaerat asperiores accusamus
                                temporibus quo praesentium non facilis optio
                                quos, dignissimos vero adipisci perferendis
                                numquam. Nesciunt enim nulla ducimus alias
                                itaque sed.
                            </p>
                            <Carousel className='p-2 rounded-lg'>
                                <div>
                                    <img
                                        src={mealDetail && image}
                                        className='rounded-lg'
                                        alt=''
                                        loading='lazy'
                                    />
                                </div>
                            </Carousel>
                        </div>
                        <div className='text-base p-2 rounded-lg bg-slate-200 md:w-[50%] '>
                            <p className='font-bold text-xl'>Ingredients</p>
                            {ingredientLines?.map((item, i) => (
                                <div className='flex items-center' key={i}>
                                    <span className='ml-[20px] py-1'>
                                        - {item}
                                    </span>

                                    <span className='ml-3 text-xs'>
                                        {shoppingListItem.length > 0 &&
                                        shoppingListItem[0].ingredientLines?.includes(
                                            item
                                        ) ? (
                                            <Tippy content='Remove from shopping lists'>
                                                <FontAwesomeIcon
                                                    className='text-red-500 outline-none'
                                                    icon={faMinus}
                                                    onClick={() => {
                                                        console.log(item);
                                                        handleRemoveFromShoppingLists(
                                                            item,
                                                            paramURL.id,
                                                            'shoppingLists',
                                                            currentUser.uid
                                                        );
                                                    }}
                                                />
                                            </Tippy>
                                        ) : (
                                            <Tippy content='Add to shopping lists'>
                                                <FontAwesomeIcon
                                                    className='outline-none text-main'
                                                    icon={faPlus}
                                                    onClick={() => {
                                                        console.log(item);
                                                        handleAddtoShoppingLists(
                                                            item,
                                                            paramURL.id,
                                                            'shoppingLists',
                                                            currentUser.uid
                                                        );
                                                    }}
                                                />
                                            </Tippy>
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {loading && (
                <div className='flex items-center justify-center fixed top-0 bottom-0 right-0 left-0 h-screen w-screen backdrop-opacity-10 backdrop-invert bg-white/30'>
                    <ReactLoading
                        type='spin'
                        color='#009f7f'
                        height={'200px'}
                        width={'200px'}
                    />
                </div>
            )}
        </>
    );
};

export default RecipeDetail;
