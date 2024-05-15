import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element, ...rest }) => {
    const isLoggedIn = useSelector(state => state.isLoggedIn);

    return isLoggedIn ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
