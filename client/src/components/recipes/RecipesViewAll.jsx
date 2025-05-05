import Header from 'components/header/Header';
import { fetchRandom } from 'context/apiCall/ApiCall';
import React, { useContext, useEffect, useState } from 'react';
import RecipeItem from './RecipeItem';
import Footer from 'components/footer/Footer';
import { useParams } from 'react-router-dom';
import { AuthContext } from 'context/authContext/AuthContext';
import CONSTANT_TEXT from 'components/label.js';
import { SavedRecipesContext } from 'context/savedrecContext/SavedRecipesContext';
import { SearchContext } from 'context/searchContext/SearchContext';
import ReactLoading from 'react-loading';
const RecipesViewAll = () => {
    const { DIET, MEAL_TYPE } = CONSTANT_TEXT;
    const params = useParams();

    const [viewAllData, setViewAllData] = useState([]);
    const [savedRecList, setSaveRecList] = useState([]);
    const [searchRecipe, setSearchRecipe] = useState([]);
    const [loading, setLoading] = useState(false);

    // Context
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(SavedRecipesContext);
    const { searchValue, setSearchValue } = useContext(SearchContext);

    const fetchData = async () => {
        setLoading(true);
        if (Object.values(MEAL_TYPE).includes(params.id)) {
            const result = await fetchRandom(null, null, params.id, false);
            setViewAllData(result);
        }
        if (Object.values(DIET).includes(params.id)) {
            const result = await fetchRandom(null, params.id, null, false);
            setViewAllData(result);
        }
        if (params.id === 'savedrecipes') {
            setViewAllData({});
        }

        if (params.id === 'search') {
            const result = await fetchRandom(searchValue, null, null, false);
            console.log('result', result);
            setSearchRecipe(result);
			setViewAllData({});
        }
        setLoading(false);
    };
    console.log('searchRecipe', searchRecipe);

    useEffect(() => {
        setSaveRecList(data);
    }, [data]);

    useEffect(() => {
        fetchData();
    }, [params]);

    const { hits } = viewAllData || {};
    return (
        <>
            <Header />
            {params.id === 'savedrecipes' && (
                <div className='mt-[80px] p-2 2xl:w-[80%] 2xl:mx-auto '>
                    <div className='flex justify-between mb-2 pt-2 pl-[20px]'>
                        <p className='text-xl font-bold'>Saved Recipes</p>
                    </div>

                    <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 m-auto'>
                        {Object.values(savedRecList)?.map((item, i) => (
                            <RecipeItem
                                item={{ recipe: item }}
                                key={i}
                                savedRecList={savedRecList}
                            />
                        ))}
                    </div>
                </div>
            )}
            {Object.keys(viewAllData).length !== 0 && (
                <div className='mt-[80px] p-2 2xl:w-[80%] 2xl:mx-auto '>
                    <div className='flex justify-between mb-2 pt-2 pl-[20px]'>
                        <p className='text-xl font-bold'>
                            {params.id.charAt(0).toUpperCase() +
                                params.id?.slice(1)}{' '}
                            Meal
                        </p>
                    </div>
                    <p className='text-slate-500 pl-[20px]'>
                        Discover budget-friendly recipes that use affordable
                        pantry staple ingredients to create healthy cheap meals
                        that won't break the bank.
                    </p>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 m-auto'>
                        {hits?.map((item, i) => (
                            <RecipeItem
                                item={item}
                                key={i}
                                savedRecList={savedRecList}
                            />
                        ))}
                    </div>
                </div>
            )}
            {params.id === 'search' && (
                <div className='mt-[80px] p-2 2xl:w-[80%] 2xl:mx-auto '>
                    <div className='flex justify-between mb-2 pt-2 pl-[20px]'>
                        <p className='text-xl font-bold'>
                            {params.id.charAt(0).toUpperCase() +
                                params.id?.slice(1)}{' '}
                            Results
                        </p>
                    </div>
                    <p className='text-slate-500 pl-[20px]'>
                        Discover budget-friendly recipes that use affordable
                        pantry staple ingredients to create healthy cheap meals
                        that won't break the bank.
                    </p>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 m-auto'>
                        {searchRecipe?.hits?.map((item, i) => (
                            <RecipeItem
                                item={item}
                                key={i}
                                savedRecList={savedRecList}
                            />
                        ))}
                    </div>
                </div>
            )}

            {params.id === 'search' && searchRecipe.length === 0 && (
                <div className='text-center text-3xl text-main p-5'>No recipes are found</div>
            )}
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

export default RecipesViewAll;
