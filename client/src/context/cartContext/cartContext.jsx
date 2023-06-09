import { createContext, useReducer, useEffect } from 'react';
import cartReducer from './cartReducer';
import images from 'assets/img/index';
const Cart = {
    cart: [
        {
            productData: {
                id: 3,
                name: 'Blueberries',
                originalprice: 3.2,
                promotionprice: 2,
                image: images.blueberries,
                unit: 'kg',
                thumbnailImg: [images.apple1, images.apple2, images.apple3],
                categories: ['Fruits & Vegetables', 'Fruits'],
                desc: 'An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.',
                sale: function () {
                    return (
                        ((this.originalprice - this.promotionprice) /
                            this.originalprice) *
                        100
                    ).toFixed(1);
                },
            },
            quantity: 3,
        },
    ],
};

export const CartContext = createContext(Cart);
export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, Cart);
    return (
        <CartContext.Provider
            value={{
                cart: state.cart,
                dispatch,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
