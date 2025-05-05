import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import React, { Fragment, useEffect, useState } from 'react';
import { fetchRandom } from 'context/apiCall/ApiCall';
import CONSTANT_TEXT from '../label.js';
import ReactLoading from 'react-loading';
import { GetAllDocs, queryDocs } from 'utils/getData';
import { Link } from 'react-router-dom';
const RecipesTest = () => {
    const [recipeData, setrecipeData] = useState([]);
    const [dietData, setdietData] = useState([]);
    const [mealTypeData, setmealTypeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { DIET, MEAL_TYPE } = CONSTANT_TEXT;

    useEffect(() => {
        const newDietData = [];

        Object.values(DIET)?.forEach(async (type) => {
            const balanceData = await queryDocs('homeRecipes', 'diet', type);
            const find = dietData?.find((item) => item.diet === type);
            if (find) {
                return;
            } else {
                newDietData.push(...balanceData);
                setdietData(newDietData);
            }
        });
    }, []);
    useEffect(() => {
        const newMealType = [];
        Object.values(MEAL_TYPE)?.forEach(async (type) => {
            const balanceData = await queryDocs(
                'homeRecipes',
                'mealType',
                type
            );
            const find = mealTypeData?.find((item) => item.mealType === type);
            if (find) {
                return;
            } else {
                newMealType.push(...balanceData);
                setmealTypeData(newMealType);
            }
        });
    }, []);
    console.log('mealTypeData', mealTypeData);
    const { recipe } =
        (recipeData && recipeData.hits && recipeData.hits[0]) || {};

    return (
        <Fragment>
            <Header />
            <div className='mt-[80px] flex flex-col bg-slate-100'>
                <div className='bg-slate-100 xl:w-[70%] xl:mx-auto xl:bg-slate-100'>
                    <div className='flex justify-around outline-none'>
                        <select className='p-2 px-3 bg-slate-200 text-slate-500 mt-[10px] rounded-lg'>
                            <option>Browse By Collection</option>
                            <option>Featured Recipes </option>
                            <option>Budget Meals </option>
                        </select>
                    </div>
                    <div className='my-2 p-2'>
                        <div>
                            <div className='flex justify-between'>
                                <p className='text-xl font-bold'>
                                    Featured Recipe
                                </p>
                                <p className='cursor-pointer'>View All</p>
                            </div>
                            <div className='bg-white rounded-md pb-2 md:flex md:justify-center p-3 '>
                                <div className='md:w-[30%] lg:w-[50%] rounded-2xl'>
                                    <img
                                        src='https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/recipes%2FDummyDish.webp?alt=media&token=9057dbd1-19e0-41d3-baf6-38e9bcb66327'
                                        alt='recipe'
                                        className='rounded-2xl object-cover object-center h-full w-full lg:h-[300px]'
                                    />
                                </div>
                                <div className='md:ml-10 md:flex-1'>
                                    <div className='text-slate-800 font-bold text-xl py-3 flex items-center '>
                                        <p> Easy Microwave Baked Potatoes</p>
                                        <span className='bg-yellow-100 p-2 rounded-full text-slate-500 text-sm ml-1'>
                                            {recipe && recipe.totalTime}m
                                        </span>
                                    </div>

                                    <p className='text-slate-500'>
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Dolor odit, dicta
                                        laboriosam itaque, corporis esse
                                        doloremque sequi qui quos at dolorum
                                        similique consequatur nemo. Autem quod
                                        deserunt modi facilis at?
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className='text-xl font-bold mt-5 mb-2'>
                                Popular Categories
                            </p>
                            <div className='flex flex-wrap justify-between m-auto '>
                                {dietData?.map((item, i) => (
                                    <div
                                        className='flex bg-white rounded-md p-2 mb-2 w-[40%] min-w-[290px]'
                                        key={i}
                                    >
                                        <img
                                            alt=''
                                            src={
                                                'https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/recipes%2FDummyDish.webp?alt=media&token=9057dbd1-19e0-41d3-baf6-38e9bcb66327' ||
                                                {}
                                            }
                                            className='h-[80px] w-[80px] rounded-md'
                                        />
                                        <div>
                                            <p className='px-2 text-xl text-slate-600'>
                                                {(item &&
                                                    item.diet
                                                        ?.charAt(0)
                                                        .toUpperCase() +
                                                        item.diet?.slice(1)) ||
                                                    123}
                                            </p>
                                            <p className='px-2 text-sm text-slate-500'>
                                                {item && item?.count} recipes
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {mealTypeData?.map((item, i) => (
                            <div className='my-6' key={i}>
                                <div className='flex justify-between mb-2 pt-2'>
                                    <p className='text-xl font-bold'>
                                        {item.mealType}
                                    </p>
                                    <p className='cursor-pointer'>View All</p>
                                </div>
                                <p className='text-slate-500'>
                                    Discover budget-friendly recipes that use
                                    affordable pantry staple ingredients to
                                    create healthy cheap meals that won't break
                                    the bank.
                                </p>
                                <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 m-auto'>
                                    {item &&
                                        item?.hits
                                            ?.slice(0, 4)
                                            ?.map((item, i) => (
                                                <div
                                                    className='h-[400px] bg-white rounded-xl m-auto mt-5 w-[70%] md:w-[90%] shadow hover:-translate-y-2 duration-100 ease-in cursor-pointer'
                                                    key={i}
                                                >
                                                    <Link
                                                        to={`/recipes/${
                                                            item?.recipe.uri.split(
                                                                '#'
                                                            )[1]
                                                        }`}
                                                        className='w-full h-full p-[1px] block'
                                                    >
                                                        <div className='w-full h-[80%]'>
                                                            <img
                                                                src={
                                                                    'https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/recipes%2FDummyDish.webp?alt=media&token=9057dbd1-19e0-41d3-baf6-38e9bcb66327'
                                                                }
                                                                alt='recipe'
                                                                className='rounded-xl object-cover w-full h-full'
                                                            />
                                                        </div>
                                                        <div className='text-slate-800 font-bold text-[18px] py-3 flex items-center w-[90%] m-auto'>
                                                            <p>
                                                                {item.recipe
                                                                    ?.label
                                                                    .length >=
                                                                20
                                                                    ? item.recipe?.label.slice(
                                                                          0,
                                                                          19
                                                                      ) + '...'
                                                                    : item
                                                                          .recipe
                                                                          ?.label}
                                                            </p>{' '}
                                                            <span className='bg-yellow-100 p-2 rounded-full text-slate-500 text-sm ml-1'>
                                                                {
                                                                    item.recipe
                                                                        ?.totalTime
                                                                }
                                                                m
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                </div>
                            </div>
                        ))}
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
            </div>
        </Fragment>
    );
};

export default RecipesTest;
