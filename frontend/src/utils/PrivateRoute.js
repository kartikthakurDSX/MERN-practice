import {Navigate} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

const PrivateRoute = ({children}) => {
    const { auth } = useContext(AuthContext);
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to='/' />;
}

export default PrivateRoute;