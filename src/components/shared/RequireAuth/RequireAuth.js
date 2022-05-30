import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../Loading/Loading';

const RequireAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.providerData[0]?.providerId === 'password' && !user.emailVerified) {
    return <div>
      <div className='my-5'>
        <h1 className='text-red-600 text-2xl font-semibold my-2'>Your email isn't verified!</h1>
        <h3 className='text-red-500 text-lg font-semibold my-2'>Please verify your email to continue</h3>
        <button onClick={async () => {
          await sendEmailVerification();
          toast('Verification email sent')
        }} className='bg-rose-400 px-5 py-1 mt-1 rounded hover:bg-rose-500 text-white mb-2 font-semibold'>Send Verification Email Again</button>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  }

  return children;
};

export default RequireAuth;