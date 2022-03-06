import { useAuthState } from '../Context';
import { Navigate } from 'react-router';
import React from 'react';


export default function PrivateRoute({children, isPrivate}) {
    const {  token } = useAuthState();
    
    return isPrivate ? token ? children : <Navigate to='/login'/> : children;
}