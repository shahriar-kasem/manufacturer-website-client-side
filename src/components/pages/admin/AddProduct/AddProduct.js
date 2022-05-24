import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../../firebase.init';

const AddProduct = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();

    const addProduct = (data, event) => {
        const name = data.name;
        const description = data.description;
        const img = data.image;
        const minimumOrderQuantity = parseInt(data.minimumQuantity);
        const availableQuantity = parseInt(data.availableQuantity);
        const price = parseInt(data.price);
        const adminEmail = user.email;
        const newProduct = { name, description, img, minimumOrderQuantity, availableQuantity, price, adminEmail};
        axios({
            method: 'POST',
            headers: {
                'authorization': `${localStorage.getItem('accessTokenST')}`
            },
            url: `http://localhost:5000/add/product`,
            data: newProduct,
        }).then(res=>{
            if(res.status === 200){
                event.target.reset();
                toast.success('Product added successfully')
                // navigate('/tools')
            }
        }).catch((error)=>{
            const errorMessage = error.response.data.message;
            toast.error(errorMessage);
            localStorage.removeItem('accessTokenST')
            signOut(auth);
        })
    };

    return (
        <section>
            <div id='newReview' className='mt-10 mb-5'>
                <h3 className='text-center text-xl text-blue-500 font-semibold'><i>Add a new product</i></h3>
                <form className='flex flex-col items-center' onSubmit={handleSubmit(addProduct)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Product name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Product name"
                            className="input input-bordered w-full max-w-xs"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Product name is required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.name?.type === 'required' && <p className='text-red-500'><small>{errors.name.message}</small></p>}
                        </label>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Product image</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Image URL"
                            className="input input-bordered w-full max-w-xs"
                            {...register("image", {
                                required: {
                                    value: true,
                                    message: 'Product image is required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.image?.type === 'required' && <p className='text-red-500'><small>{errors.image.message}</small></p>}
                        </label>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Details</span>
                        </label>
                        <textarea
                            rows={4}
                            type="text"
                            placeholder="Product description"
                            className="textarea input-bordered w-full max-w-xs"
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: 'Product description is required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.description?.type === 'required' && <p className='text-red-500'><small>{errors.description.message}</small></p>}
                        </label>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Minimum quantity</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Minimum purchase quantity"
                            className="input input-bordered w-full max-w-xs"
                            {...register("minimumQuantity", {
                                required: {
                                    value: true,
                                    message: 'Minimum quantity is required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.minimumQuantity?.type === 'required' && <p className='text-red-500'><small>{errors.minimumQuantity.message}</small></p>}
                        </label>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Available quantity</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Available quantity"
                            className="input input-bordered w-full max-w-xs"
                            {...register("availableQuantity", {
                                required: {
                                    value: true,
                                    message: 'Available quantity is required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.availableQuantity?.type === 'required' && <p className='text-red-500'><small>{errors.availableQuantity.message}</small></p>}
                        </label>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Product price</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Price per unit"
                            className="input input-bordered w-full max-w-xs"
                            {...register("price", {
                                required: {
                                    value: true,
                                    message: 'Available quantity is required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.availableQuantity?.type === 'required' && <p className='text-red-500'><small>{errors.availableQuantity.message}</small></p>}
                        </label>
                    </div>

                    <input className='btn btn-outline' type="submit" value='Add Product' />
                </form>
            </div>
        </section>
    );
};

export default AddProduct;