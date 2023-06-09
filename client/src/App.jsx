import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import './app.scss';
import ProductDetail from 'components/product/ProductDetail';
import CartPage from 'pages/cart/CartPage';
import Login from 'components/login/Login';
import Register from 'components/register/Register';
import { AuthContext } from 'context/authContext/AuthContext';
import { useContext } from 'react';
import ForgetPassword from 'components/register/ForgetPassword';
import ResetPassword from 'components/register/ResetPassword';
import ProfilePage from 'pages/profile/ProfilePage';

function App() {
    const { currentUser } = useContext(AuthContext);
    console.log('currentUser', currentUser);
    const RequireAuth = ({ children }) => {
        return currentUser ? children : <Navigate to='/login' />;
    };
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path='/'
                    element={
                        <RequireAuth>
                            <Home />
                        </RequireAuth>
                    }
                />
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
                    path='/cart'
                    element={
                        <RequireAuth>
                            <CartPage />
                        </RequireAuth>
                    }
                />
                <Route
                    exact
                    path='/profile'
                    element={
                        <RequireAuth>
                            <ProfilePage />
                        </RequireAuth>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
