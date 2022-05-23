import React, { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import useToken from '../../../hooks/useToken';
import Loading from '../Loading/Loading';

const SignUp = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile] = useUpdateProfile(auth);

    const location = useLocation();
    const navigate = useNavigate();

    const [token] = useToken(user || gUser);

    let from = location.state?.from?.pathname || "/";

    const { register, formState: { errors }, handleSubmit } = useForm();
    const signUp = async (data) => {
        const displayName = data.name;
        const email = data.email;
        const password = data.password;
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({
            displayName
        });
    };

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, from, navigate])

    if (loading || gLoading) {
        return <Loading></Loading>
    }

    return (
        <section>
            <div className="card max-w-md bg-base-100 shadow-xl mx-auto">
                <div className="">
                    <h1 className='text-xl font-semibold text-blue-500 text-center'>Please SignUp</h1>
                    <form className='flex flex-col items-center' onSubmit={handleSubmit(signUp)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'Name is required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <p className='text-red-500'><small>{errors.name.message}</small></p>}
                            </label>
                        </div>
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
                            error && <p className='text-red-500 my-1'><small>{error.message}</small></p>
                        }
                        <input className='btn btn-outline w-full md:w-10/12 max-w-xs' type="submit" value='Sign Up' />
                    </form>
                    <div>
                        <p className='text-center'><small>Already have an account? <Link className='text-blue-500' to='/login'>Please login</Link></small></p>
                    </div>
                </div>
                <div className="divider">Or</div>
                {
                    gError && <p className='text-red-500 py-1 text-center'><small>{gError.message}</small></p>
                }
                <div className='flex justify-center mb-5'>
                    <button onClick={() => signInWithGoogle()} className='btn btn-outline w-full md:w-10/12 max-w-xs'>Continue with Google</button>
                </div>
            </div>
        </section>
    );
};

export default SignUp;