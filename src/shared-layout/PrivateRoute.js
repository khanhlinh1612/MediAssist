import React, { useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = ({ children }) => {
  const { userInfo } = useContext(UserContext);
  return userInfo ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
