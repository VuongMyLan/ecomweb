import React, { useContext, useEffect, useState } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import {
    handleAddToSaveRecipes,
    removeFromSavedRecipes,
} from 'utils/handleCart';
import { AuthContext } from 'context/authContext/AuthContext';
import { GetDoc } from 'utils/getData';
const RecipeItem = ({ item, savedRecList }) => {
    console.log('savedRecList', savedRecList);
    const { recipe } = item || {};
    const { currentUser } = useContext(AuthContext);
    const [savedRec, setSaveRec] = useState(false);
    const recipeID = recipe.uri.split('#')[1];

    useEffect(() => {
        if (savedRecList) {
            const findItem = Object.values(savedRecList)?.filter(
                (item) => item.uri === recipe.uri
            );
            if (findItem.length > 0) {
				console.log('savedRecList', savedRecList);
                setSaveRec(true);
            } else {
                setSaveRec(false);
            }
        }
    }, [currentUser, savedRecList, recipe.uri]);
    return (
        <div className='h-[450px] relative bg-white rounded-xl m-auto mt-5 w-[90%] md:w-[90%] shadow hover:-translate-y-2 duration-100 ease-in cursor-pointer'>
            <Tippy content='Saved recipes'>
                <div className='absolute z-[20] right-5 top-5 bg-slate-100 p-2 rounded-full h-[30px] w-[30px] flex  items-center justify-center shadow'>
                    {!savedRec ? (
                        <HeartOutlined
                            onClick={(e) => {
                                console.log(123);
                                e.stopPropagation();
                                handleAddToSaveRecipes(recipe, currentUser.uid);
                            }}
                        />
                    ) : (
                        <HeartFilled
                            style={{ color: 'Red' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                removeFromSavedRecipes(recipe, currentUser.uid);
                            }}
                        />
                    )}
                </div>
            </Tippy>
            <Link
                to={`/recipes/${recipe.uri.split('#')[1]}`}
                className='w-full h-full p-[1px] block '
            >
                <div className='w-full h-[80%]'>
                    <img
                        src={
                            recipe.image ||
                            'https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/recipes%2FCheesy%20Ham%20Omelet.webp?alt=media&token=eca24aa2-60b7-470a-8746-7ddad9b99ff6'
                        }
                        loading='lazy'
                        alt='recipe'
                        className='rounded-xl object-cover w-full h-full p-1'
                    />
                </div>
                <div className='text-slate-800 font-bold text-[18px] py-3 flex items-center w-[90%] m-auto'>
                    <p className='hidden md:block'>
                        {recipe.label.length >= 30
                            ? recipe.label.slice(0, 30) + '...'
                            : recipe.label}
                    </p>
                    <p className='md:hidden'>{recipe.label}</p>
                    <span className='bg-yellow-100 p-2 rounded-full text-slate-500 text-sm ml-1'>
                        {recipe.totalTime}m
                    </span>
                </div>
            </Link>
        </div>
    );
};

export default RecipeItem;
