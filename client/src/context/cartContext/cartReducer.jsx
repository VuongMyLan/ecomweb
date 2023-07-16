const cartReducer = (state, action) => {
    console.log('action.type', action.type);
    let id;
    if (action.type !== 'FETCH_DATA') {
        id = action.payload.productData.id;
    }
    // console.log('state.cart', state.cart);
    switch (action.type) {
        case 'FETCH_DATA':
            const newArray = [];
            Object.values(action.payload)?.forEach((item) =>
                newArray.push(item)
            );
            return {
                ...state,
                cart: [...newArray],
            };

        case 'ADD_TO_CART':
            console.log('state', state);
            console.log('action.payload', action.payload);
            if (state.cart.length === 0) {
                return {
                    ...state,
                    cart: [...state.cart, action.payload],
                };
            } else {
                let find = state.cart.find(
                    (item) => item.productData.id === id
                );
                if (find) {
                    state.cart?.forEach((item) => {
                        if (item.productData.id === id) {
                            item.quantity = item.quantity + 1;
                        }
                    });
                    find = {};
                    return {
                        ...state,
                    };
                } else {
                    return {
                        ...state,
                        cart: [...state.cart, action.payload],
                    };
                }
            }

        case 'REMOVE_FROM_CART': {
            let find = state.cart?.find((item) => item.productData.id === id);
            let newArr;
            if (find) {
                state.cart?.map((item) => {
                    if (item.productData.id === id && item.quantity > 0) {
                        item.quantity = item.quantity - 1;
                    }
                });
                newArr = state.cart.filter((item) => item.quantity !== 0);
            }
            return {
                ...state,
                cart: [...newArr],
            };
        }
        case 'DELETE_ITEM': {
            const newstate = state.cart?.filter(
                (item) => item.productData.id !== id
            );
            console.log('newState', newstate);
            return {
                ...state,
                cart: [...newstate],
            };
        }
        default:
            return state;
    }
};

export default cartReducer;
