import React from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../Loading/Loading';

const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const { register, formState: { errors }, handleSubmit } = useForm();
    const login = (data, event) => {
        const email = data.email;
        const password = data.email;
        signInWithEmailAndPassword(email, password);
        console.log(data);
        event.target.reset();
    };

    if(loading || gLoading){
        return <Loading></Loading>;
    }

    return (
        <section className='mt-5 lg:mt-10'>
            <div class="card max-w-md bg-base-100 shadow-xl mx-auto">
                <div class="">
                    <h1 className='text-xl font-semibold text-blue-500 text-center'>Please login</h1>
                    <form className='flex flex-col items-center' onSubmit={handleSubmit(login)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Please provide a valid email address'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <p className='text-red-500'><small>{errors.email.message}</small></p>}
                                {errors.email?.type === 'pattern' && <p className='text-red-500'><small>{errors.email.message}</small></p>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is required'
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'Your password must contain 8 character or more!'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.password?.type === 'required' && <p className='text-red-500'><small>{errors.password.message}</small></p>}
                                {errors.password?.type === 'minLength' && <p className='text-red-500'><small>{errors.password.message}</small></p>}
                            </label>                            
                        </div>
                        {
                            error && <p className='text-red-500 py-1'><small>{error.message}</small></p>
                        }
                        <input className='btn btn-outline w-full md:w-10/12 max-w-xs' type="submit" value='Login' />
                    </form>
                    <div>
                    <p className='text-center'><small>Forgot password? <Link className='text-blue-500' to='/'>Reset password</Link></small></p>
                        <p className='text-center'><small>New to Manufacturer? <Link className='text-blue-500' to='/signup'>Create new account</Link></small></p>
                    </div>
                </div>
                <div class="divider">Or</div>
                {
                        gError && <p className='text-red-500 py-1 text-center'><small>{gError.message}</small></p>
                    }
                <div className='flex justify-center'>
                    <button onClick={() => signInWithGoogle()} className='btn btn-outline w-full md:w-10/12 max-w-xs'>Continue with Google</button>
                </div>
            </div>
        </section>
    );
};

export default Login;