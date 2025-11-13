import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading';

const PrivateRoute = ({children}) => {
    const {user, loading } = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return <>
        <Loading></Loading>
        </>
    }
    if(user){
        return children;
    }
    return <Navigate state={location?.pathname} to="/auth"></Navigate>
};

export default PrivateRoute;