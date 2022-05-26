import axios from 'axios';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../../../firebase.init';

const AddBlog = () => {
    const [user] = useAuthState(auth);

    const { register, formState: { errors }, handleSubmit } = useForm();

    const addBlog = (data, event) => {
        const name = data.name;
        const description = data.description;
        const adminEmail = user.email;
        const newBlog = {name, description, adminEmail};

        axios({
            method: 'POST',
            headers: {
                'authorization': `${localStorage.getItem('accessTokenST')}`
            },
            url: `https://gentle-spire-70229.herokuapp.com/add/blog`,
            data: newBlog,
        }).then(res => {
            if (res.status === 200) {
                event.target.reset();
                toast.success('Blog added successfully')
            }
        }).catch((error) => {
            const errorMessage = error.response.data.message;
            toast.error(errorMessage);
            localStorage.removeItem('accessTokenST')
            signOut(auth);
        })
    };

    return (
        <section>
            <div className='mt-10 mb-5'>
                <h3 className='text-center text-xl text-blue-500 font-semibold'><i>Write a blog</i></h3>
                <form className='flex flex-col items-center' onSubmit={handleSubmit(addBlog)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Header</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Title/Question"
                            className="input input-bordered w-full max-w-xs"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Title/Question is required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.name?.type === 'required' && <p className='text-red-500'><small>{errors.name.message}</small></p>}
                        </label>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            rows={4}
                            type="text"
                            placeholder="Description/Answer"
                            className="textarea input-bordered w-full max-w-xs"
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: 'Description is required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.description?.type === 'required' && <p className='text-red-500'><small>{errors.description.message}</small></p>}
                        </label>
                    </div>
                    <input className='btn btn-outline' type="submit" value='Add Blog' />
                </form>
            </div>
        </section>
    );
};

export default AddBlog;