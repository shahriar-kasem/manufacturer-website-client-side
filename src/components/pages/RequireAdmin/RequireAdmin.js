import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';
import useAdmin from '../../../hooks/useAdmin';
import Loading from '../../shared/Loading/Loading';

const RequireAdmin = ({children}) => {
    const [user, loading] = useAuthState(auth);
    const [admin] = useAdmin(user);
    const location = useLocation();

    if(loading){
      return <Loading></Loading>
    }
   
    if (!user || !admin) {
        return <Navigate to="/login" state={{ from: location }} replace />;
      }
    
      return children;
};

export default RequireAdmin;