import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../shared/Loading/Loading';

const Purchase = () => {
    const { id } = useParams();
    const [user] = useAuthState(auth);
    const [userName, setUserName] = useState(user?.displayName);
    const [userEmail, setUserEmail] = useState(user?.email);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { data: tool, isLoading } = useQuery('productData', () => fetch(`http://localhost:5000/product/${id}`).then(res => res.json()));

    const [minimum, setMinimum] = useState();
    const [maximum, setMaximum] = useState();
    useEffect(() => {
        const minimumPurchase = tool?.minimumOrderQuantity;
        const maximumPurchase = tool?.availableQuantity;
        setMinimum(minimumPurchase)
        setMaximum(maximumPurchase)
    }, [tool])

    const handlePurchase = async (data, event) => {
        const productId = tool._id;
        const productName = tool.name;
        const productPrice = tool.price;
        const customerName = data.name;
        const customerEmail = data.email;
        const purchaseQuantity = parseInt(data.quantity);
        const phone = data.phone;
        const purchase = { productId, productName, productPrice, customerName, customerEmail, purchaseQuantity, phone }
        if ((purchaseQuantity > tool?.minimumOrderQuantity) && (purchaseQuantity < tool?.availableQuantity)) {
            axios({
                method: 'POST',
                url: `http://localhost:5000/order`,
                data: purchase,
            });
        }
        else {
            toast.error('Something went wrong! Please try again later')
        }
    };
    const handleName = (event) => {
        const newName = event.target.value;
        setUserName(newName);
    }
    const handleEmail = event => {
        const newEmail = event.target.value;
        setUserEmail(newEmail);
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section>
            <div className="hero w-full bg-spring-background">
                <div className="hero-content flex-col-reverse lg:flex-row-reverse">
                    <div className="flex flex-col items-center lg:text-left w-full md:w-1/2 lg:pl-20">
                        <div>
                            <img className='h-48' src={tool?.img} alt="" />
                        </div>
                        <h1 className="text-xl font-bold mt-2">{tool?.name}</h1>
                        <p className="py-6">{tool?.description}</p>
                        <h3 className='text-lg text-red-500 font-semibold'>Minimum purchase amount: {tool?.minimumOrderQuantity}</h3>
                        <h3 className='text-xl text-success font-bold'>Available amount: {tool?.availableQuantity}</h3>
                        <h3 className='text-3xl font-semibold'>Price: {tool?.price}</h3>
                    </div>
                    <div className="card w-full lg:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <h2 className='text-center text-success font-bold'><i>Purchase now!</i></h2>
                            <form className='flex flex-col items-center' onSubmit={handleSubmit(handlePurchase)}>
                                <div onChange={handleName} className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        value={userName || ''}
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
                                <div onChange={handleEmail} className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        value={userEmail || ''}
                                        type="email"
                                        placeholder='Your email'
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
                                        <span className="label-text">Phone</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Phone"
                                        className="input input-bordered w-full max-w-xs"
                                        {...register("phone", {
                                            required: {
                                                value: true,
                                                message: 'Phone number is required'
                                            }
                                        })}
                                    />
                                    <label className="label">
                                        {errors.phone?.type === 'required' && <p className='text-red-500'><small>{errors.phone.message}</small></p>}
                                    </label>
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Address</span>
                                    </label>
                                    <textarea
                                        rows={3}
                                        type="text"
                                        placeholder="Address"
                                        className="textarea input-bordered w-full max-w-xs"
                                        {...register("address", {
                                            required: {
                                                value: true,
                                                message: 'Address is required'
                                            }
                                        })}
                                    />
                                    <label className="label">
                                        {errors.address?.type === 'required' && <p className='text-red-500'><small>{errors.address.message}</small></p>}
                                    </label>
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Quantity
                                            <br />
                                            <span className='text-xs text-red-400'>Minimum purchase {minimum}</span>
                                            <span className='text-xs'> and </span>
                                            <span className='text-xs text-green-600'>Available amount {maximum}</span>
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Amount"
                                        className="input input-bordered w-full max-w-xs"
                                        {...register("quantity", {
                                            min: minimum,
                                            max: maximum,
                                            required: {
                                                value: true,
                                                message: 'Quantity is required'
                                            }
                                        })}
                                    />
                                    <label className="label">
                                        {errors.quantity?.type === 'required' && <p className='text-red-500'><small>{errors.quantity.message}</small></p>}
                                        {errors.quantity?.type === 'min' && <p className='text-red-500'><small>Minimum purchase amount can be {minimum}</small></p>}
                                        {errors.quantity?.type === 'max' && <p className='text-red-500'><small>Maximum purchase amount can be {maximum}</small></p>}
                                    </label>
                                </div>
                                <input className='btn btn-outline btn-success' type="submit" value='Proceed' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Purchase;