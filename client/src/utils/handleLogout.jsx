import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

//Signout user
export const handleLogout = () => {
	
    signOut(auth)
        .then(() => {
            console.log('sign out successful');
            localStorage.setItem('user', null);
        })
        .catch((error) => {
            console.log('Fail to sign out');
        });
};
