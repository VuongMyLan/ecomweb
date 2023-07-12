import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from 'react-router-dom';
import Home from './pages/home/Home';
import './app.scss';
import ProductDetail from 'components/product/ProductDetail';
import CartPage from 'pages/cart/CartPage';
import Login from 'components/login/Login';
import Register from 'components/register/Register';
import { AuthContext } from 'context/authContext/AuthContext';
import { Fragment, useContext, useState } from 'react';
import ForgetPassword from 'components/register/ForgetPassword';
import ResetPassword from 'components/register/ResetPassword';
import ProfilePage from 'pages/profile/ProfilePage';
import OrderPage from 'pages/order/OrderPage';
import OrderDetail from 'components/order/OrderDetail';
import WishListPage from 'pages/wishlists/WishListPage';
import CheckoutPage from 'pages/checkout/CheckoutPage';
import NavBar from 'components/navbar/NavBar';
import Profile from 'components/profile/Profile';
import Header from 'components/header/Header';
import Order from 'components/order/Order';
import Wishlists from 'components/wishlists/Wishlists';
import Checkout from 'components/checkout/Checkout';
import Recipes from 'components/recipes/Recipes';
import RecipeDetail from 'components/recipes/RecipeDetail';
import RecipesViewAll from 'components/recipes/RecipesViewAll';
import { FloatButton } from 'antd';
import ShoppingList from 'components/shoppingList/ShoppingList';

function App() {
    const { currentUser } = useContext(AuthContext);
    const [showShoppingList, setShowShoppingList] = useState(false);
    // console.log('currentUser', currentUser);
    const RequireAuth = ({ children }) => {
        return currentUser ? children : <Navigate to='/login' />;
    };

    const AppLayout = () => (
        <>
            <Header />
            <div className='flex mt-[80px]'>
                <NavBar className='xl:w-[200px] hidden xl:block' />
                <Outlet />
            </div>
        </>
    );
    return (
        <BrowserRouter>
            <div className='float__button'>
                <FloatButton.BackTop />
                <FloatButton
                    tooltip={<div>Shopping List</div>}
                    style={{
                        left: 50,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    className='shadow-3xl'
                    onClick={() => setShowShoppingList(!showShoppingList)}
                />
                {showShoppingList && (
                    <ShoppingList
                        className='z-[99999] shadow-lg slidein'
                        setShowShoppingList={setShowShoppingList}
                    />
                )}
            </div>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/login' element={<Register />} />
                <Route exact path='/forgetpass' element={<ForgetPassword />} />
                <Route
                    exact
                    path='/resetpassword'
                    element={<ResetPassword />}
                />
                <Route
                    exact
                    path='/product/:id'
                    element={
                        <RequireAuth>
                            <ProductDetail />
                        </RequireAuth>
                    }
                />
                <Route
                    exact
                    path='/recipes'
                    element={
                        <RequireAuth>
                            <Recipes />
                        </RequireAuth>
                    }
                />
                <Route
                    exact
                    path='/recipes/:id'
                    element={
                        <RequireAuth>
                            <RecipeDetail />
                        </RequireAuth>
                    }
                />
                <Route
                    exact
                    path='/recipes/c/:id'
                    element={
                        <RequireAuth>
                            <RecipesViewAll />
                        </RequireAuth>
                    }
                />
                <Route
                    exact
                    path='/cart'
                    element={
                        <RequireAuth>
                            <CartPage />
                        </RequireAuth>
                    }
                />
                <Route
                    exact
                    path='/orders/:ordernumber'
                    element={
                        <RequireAuth>
                            <OrderDetail />
                        </RequireAuth>
                    }
                />
                <Route element={<AppLayout />}>
                    <Route
                        path='/profile'
                        element={
                            <RequireAuth>
                                <Profile className='flex-1 bg-slate-200 mx-auto p-2 lg:px-[100px]' />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path='/order'
                        element={
                            <RequireAuth>
                                <Order className='flex-1 bg-slate-200 mx-auto p-2 lg:px-[100px]' />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path='/wishlist'
                        element={
                            <RequireAuth>
                                <Wishlists className='flex-1 bg-slate-200 mx-auto p-2 lg:px-[100px]' />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path='/checkout'
                        element={
                            <RequireAuth>
                                <Checkout className='flex-1 bg-slate-200 mx-auto p-2 lg:px-[100px]' />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path='/shoppingLists'
                        element={
                            <RequireAuth>
                                <ShoppingList />
                            </RequireAuth>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
