import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { fetchRandom } from 'context/apiCall/ApiCall';
import CONSTANT_TEXT from 'components/label.js';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import SearchItem from 'components/search/Search.jsx';
import RecipeItem from './RecipeItem';
import { GetSavedRec } from 'utils/getData';
import { AuthContext } from 'context/authContext/AuthContext';
import { SavedRecipesContext } from 'context/savedrecContext/SavedRecipesContext';
import { CaretDownOutlined } from '@ant-design/icons';
import { SearchContext } from 'context/searchContext/SearchContext';
const Recipes = () => {
    const [recipeData, setrecipeData] = useState([]);
    const [dietData, setdietData] = useState([]);
    const [mealTypeData, setmealTypeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [savedRecList, setSaveRecList] = useState([]);
    const [showSelection, setShowSelection] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(SavedRecipesContext);
	const {searchValue,setSearchValue} =useContext(SearchContext)
    const { DIET, MEAL_TYPE } = CONSTANT_TEXT;

    useEffect(() => {
        setSaveRecList(data);
    }, [data]);

    useEffect(() => {
        const fetchData = async (q) => {
			setLoading(true);
            const result = await fetchRandom(q, null, null, 'true');
            setrecipeData(result);
            setLoading(false);
        };

        fetchData('chicken');
        const dietList = [];
        const fetchDietType = async (diet) => {
			setLoading(true);
            const result = await fetchRandom(null, diet, null, 'true');
            const find = await mealTypeData?.find((item) => item.diet === diet);
            if (find) {
                return dietData;
            } else {
                dietList.push({
                    diet,
                    result,
                });
                setTimeout(() => {
                    setdietData(dietList);
                }, 2000);
            }
            setLoading(false);
        };

        const mealList = [];
        const fetchMealType = async (mealType) => {
			setLoading(true);
            const result = await fetchRandom(null, null, mealType, 'true');
            const find = mealTypeData?.find(
                (item) => item.mealType === mealType
            );
            if (find) {
                return mealList;
            } else {
                mealList.push({
                    mealType,
                    result,
                });
                setTimeout(() => {
                    setmealTypeData(mealList);
                }, 2000);
            }
            setLoading(false);
        };

        Object.values(DIET)?.forEach((item) => {
            fetchDietType(item);
        });
        Object.values(MEAL_TYPE)?.forEach((item) => {
            fetchMealType(item);
        });
    }, []);

    console.log('searchValue', searchValue);

  
    const { recipe } =
        (recipeData && recipeData.hits && recipeData.hits[0]) || {};

    return (
        <div className='relative'>
            <Header />
            {showSelection && (
                <div
                    className='absolute top-0 left-0 right-0 bottom-0 z-[1] rounded-md'
                    onClick={() => setShowSelection(false)}
                ></div>
            )}
            <div className='mt-[80px] flex flex-col bg-slate-100'>
                <div className='bg-slate-100 xl:w-[90%] xl:mx-auto xl:bg-slate-100'>
                    <div className='flex justify-around outline-none items-center'>
                        <div
                            className='p-2 px-5 bg-slate-200 text-slate-500 mt-[10px] rounded-lg flex items-center flex-col relative cursor-pointer'
                            onClick={() => setShowSelection(!showSelection)}
                        >
                            <div>
                                <span> Browse by Collection</span>
                                <span className='inline-block ml-2 mt-[-10px]'>
                                    <CaretDownOutlined />
                                </span>
                            </div>

                            {showSelection && (
                                <>
                                    <div className='text-center cursor-pointer absolute top-[100%] left-0 bg-slate-50 shadow w-full z-[2]'>
                                        {Object.values(MEAL_TYPE)?.map(
                                            (item,i) => (
                                                <p className='hover:text-slate-50 py-2 hover:bg-slate-500 hover:rounded-md' key={i}>
                                                    <Link
                                                        to={`/recipes/c/${item}`}
                                                    >
                                                        {item} Ideas
                                                    </Link>
                                                </p>
                                            )
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        <SearchItem className='mt-[10px] ml-[5px]' />
                    </div>
                    <div className='my-2 p-2'>
                        <div>
                            <div className='flex justify-between '>
                                <p className='text-xl font-bold'>
                                    Featured Recipe
                                </p>
                                <p className='cursor-pointer'>View All</p>
                            </div>
                            <Link
                                to={`/recipes/${recipe?.uri.split('#')[1]}`}
                                className='block bg-white rounded-md pb-2 md:flex md:justify-center p-3 '
                            >
                                <div className='md:w-[30%] lg:w-[50%] rounded-2xl'>
                                    <img
                                        loading='lazy'
                                        src={recipe && recipe.image}
                                        alt='recipe'
                                        className='rounded-2xl object-cover object-center h-full w-full lg:h-[300px]'
                                    />
                                </div>
                                <div className='md:ml-10 md:flex-1'>
                                    <div className='text-slate-800 font-bold text-xl py-3 flex items-center '>
                                        <p> {recipe && recipe.label} Ideas</p>
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
                            </Link>
                        </div>
                        <div>
                            <p className='text-xl font-bold mt-5 mb-2'>
                                Popular Categories
                            </p>
                            <div className='flex flex-wrap justify-between m-auto '>
                                {dietData?.map((item, i) => (
                                    <Link
                                        to={`/recipes/c/${item.diet}`}
                                        className='flex bg-white rounded-md p-2 mb-2 w-[40%] min-w-[290px]'
                                        key={i}
                                    >
                                        <img
                                            alt=''
                                            loading='lazy'
                                            src={
                                                (item.result &&
                                                    item.result?.hits[0]?.recipe
                                                        .image) ||
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
                                                {item && item.result?.count}{' '}
                                                recipes
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {mealTypeData?.map((item, i) => (
                            <div className='my-6' key={i}>
                                <div className='flex justify-between mb-2 pt-2'>
                                    <p className='text-xl font-bold'>
                                        {item.mealType}
                                    </p>
                                    <Link
                                        className='cursor-pointer'
                                        to={`/recipes/c/${item.mealType}`}
                                    >
                                        View All
                                    </Link>
                                </div>
                                <p className='text-slate-500'>
                                    Discover budget-friendly recipes that use
                                    affordable pantry staple ingredients to
                                    create healthy cheap meals that won't break
                                    the bank.
                                </p>
                                <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 m-auto'>
                                    {item.result &&
                                        item.result?.hits
                                            ?.slice(0, 4)
                                            ?.map((item, i) => (
                                                <RecipeItem
                                                    item={item}
                                                    key={i}
                                                    savedRecList={savedRecList}
                                                />
                                                // <div
                                                //     className='h-[450px] bg-white rounded-xl m-auto mt-5 w-[70%] md:w-[90%] shadow hover:-translate-y-2 duration-100 ease-in cursor-pointer'
                                                //     key={i}
                                                // >
                                                //     <Link
                                                //         to={`/recipes/${
                                                //             item?.recipe.uri.split(
                                                //                 '#'
                                                //             )[1]
                                                //         }`}
                                                //         className='w-full h-full p-[1px] block'
                                                //     >
                                                //         <div className='w-full h-[80%]'>
                                                //             <img
                                                //                 loading='lazy'
                                                //                 src={
                                                //                     item.recipe
                                                //                         ?.image
                                                //                 }
                                                //                 alt='recipe'
                                                //                 className='rounded-xl object-cover w-full h-full p-1'
                                                //             />
                                                //         </div>
                                                //         <div className='text-slate-800 font-bold text-[18px] py-3 flex items-center w-[90%] m-auto'>
                                                //             <p>
                                                //                 {item.recipe
                                                //                     ?.label
                                                //                     .length >=
                                                //                 20
                                                //                     ? item.recipe?.label.slice(
                                                //                           0,
                                                //                           19
                                                //                       ) + '...'
                                                //                     : item
                                                //                           .recipe
                                                //                           ?.label}
                                                //             </p>{' '}
                                                //             <span className='bg-yellow-100 p-2 rounded-full text-slate-500 text-sm ml-1'>
                                                //                 {
                                                //                     item.recipe
                                                //                         ?.totalTime
                                                //                 }
                                                //                 m
                                                //             </span>
                                                //         </div>
                                                //     </Link>
                                                // </div>
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
    );
};

export default Recipes;
