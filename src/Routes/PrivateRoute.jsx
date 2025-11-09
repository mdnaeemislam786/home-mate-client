import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading } = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return <>
        <span>loadding...</span>
        </>
    }
    if(user){
        return children;
    }
    return <Navigate state={location?.pathname} to="/auth"></Navigate>
};

export default PrivateRoute;