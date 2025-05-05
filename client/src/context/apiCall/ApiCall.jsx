import axios from 'axios';
const BASE_URL = 'https://api.edamam.com/api/recipes/v2';

export const fetchRandom = async (q, diet, typeMeal, random) => {
    try {
        const params = {
            type: 'public',
            beta: 'true',
            dishType: 'main course',
            imageSize: 'LARGE',
            app_id: process.env.REACT_APP_ID,
            app_key: process.env.REACT_APP_KEY,
        };
        if (q) {
            params.q = q;
        }
        if (diet) {
            params.diet = diet;
        }

        if (typeMeal) {
            params.mealType = typeMeal;
        }
        if (random) {
            params.random = random;
        }
        const res = await axios.get(`${BASE_URL}/`, {
            params: params,
        });
        // console.log('res', res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getDetailMeal = async (id) => {
    try {
        const params = {
            type: 'public',
            beta: 'true',
            random: true,
            app_id: process.env.REACT_APP_ID,
            app_key: process.env.REACT_APP_KEY,
        };

        const res = await axios.get(`${BASE_URL}/${id}`, {
            params: params,
        });
        // console.log('res', res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
