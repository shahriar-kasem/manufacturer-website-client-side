import React from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';

const ResetPassword = () => {

    const [
        sendPasswordResetEmail,
        error
    ] = useSendPasswordResetEmail(auth);

    const { register, handleSubmit } = useForm();
    const onSubmit = (data, e) => {
        const email = data.email;
        sendPasswordResetEmail(email);
        toast('Email sent! Check your inbox.')
        e.target.reset();
    };

    return (
        <div className='my-10 flex flex-col justify-center'>
            <div>
                {
                    error &&
                    <p className='text-2xl my-2 text-red-600 font-semibold'>{error.message}</p>
                }
            </div>
            <div>
                <h1 className='text-red-600 font-semibold text-lg text-center'> Forget your password?</h1>
            </div>
            <form className='flex flex-col w-2/2 md:w-1/2 lg:w-1/4 mx-auto' onSubmit={handleSubmit(onSubmit)}>
                <input className='py-1 rounded border-2 pl-1 my-2 input' type='email' placeholder='Enter your email' {...register("email", { required: true, maxLength: 300 })} />
                <input className='btn btn-info text-white font-semibold py-1 px-2 rounded' type="submit" value='Reset password' />
            </form>
        </div>
    );
};

export default ResetPassword;