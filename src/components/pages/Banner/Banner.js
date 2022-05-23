import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';

const Banner = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <section className='md:mt-2 lg:mt-4'>
      <div class="hero min-h-screen bg-banner-background">
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-md">
            <h1 class="mb-5 text-4xl font-bold"><i>Hello {user ? user.displayName : 'User'}</i></h1>
            <p class="mb-5">We define success as: delivering value to our customers, colleagues and communities. Our commitment to quality, safety and sustainability helps us on our path to becoming the type of uniquely human-centered global industrial company that keeps every stakeholder in mind, while helping to make the world better.</p>
            <button onClick={()=> navigate('/tools')} class="btn btn-outline btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;