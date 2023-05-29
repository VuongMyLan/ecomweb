const cartReducer = (state, action) => {
    const id = action.payload.productData.id;
    switch (action.type) {
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
                    state.cart?.map((item) => {
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
        default:
            return state;
    }
};

export default cartReducer;
