import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
const PrivateRoute =  ({ element: Component, ...rest }) => {
    const { user } = useContext(AuthContext);

    return user ? <Component {...rest} /> : <Navigate to="/login" />;
  };

export default PrivateRoute;
