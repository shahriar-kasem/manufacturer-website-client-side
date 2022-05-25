import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Subscribe = () => {
    const [country, setCountry] = useState('');

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data, e) => {
        const name = data.name;
        const email = data.email;
        const subscriberCountry = country;
        const subscriber = { name, email, subscriberCountry };
        fetch(`http://localhost:5000/subscribe/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(subscriber),
        })
            .then(res => res.json())
            .then(data => {
                if (data.upsertedCount === 1) {
                    toast.success('Thanks for Subscribing')
                    e.target.reset();
                }
                else if (data.modifiedCount === 1) {
                    toast.success('You are already a subscriber! Your information updated')
                    e.target.reset();
                }
                else if (data.matchedCount === 1) {
                    toast('You are already a subscriber!')
                }
                else {
                    toast.error("Something is wrong! Please try again later")
                }
            })
    };

    return (
        <section className='bg-beach-background opacity-80 hover:opacity-100 flex justify-center my-5 md:my-10 lg:my-15'>
            <div className='card w-full md:w-6/12 lg:w-4/12 py-5 md:py-10 lg:py-15'>
                <div className='card-bold bg-slate-100 rounded-xl py-5'>
                    <h2 className='text-center text-xl font-bold'><i>Stay Connected!</i></h2>
                    <p className='w-8/12 mx-auto text-xs'><i><span className='font-semibold text-blue-500'>Subscribe</span> with your email and get the latest on our businesses, news and more</i></p>
                    <form className='flex flex-col items-center mb-3' onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Full Name</span>
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
                        <div>
                            <h4 className='font-semibold text-sm'>COUNTRY OF RESIDENCE</h4>
                            <div className='flex flex-col items-start'>
                                <div class="form-control">
                                    <label class="label cursor-pointer">
                                        <input onClick={() => setCountry('United States')} type="radio" name="radio-6" class="radio checked:bg-blue-500" />
                                        <span class="label-text ml-5">United States</span>
                                    </label>
                                </div>
                                <div class="form-control">
                                    <label class="label cursor-pointer">
                                        <input onClick={() => setCountry('United Kingdom')} type="radio" name="radio-6" class="radio checked:bg-blue-500" />
                                        <span class="label-text ml-5">United Kingdom</span>
                                    </label>
                                </div>
                                <div class="form-control">
                                    <label class="label cursor-pointer">
                                        <input onClick={() => setCountry('Europe')} type="radio" name="radio-6" class="radio checked:bg-blue-500" />
                                        <span class="label-text ml-5">Europe</span>
                                    </label>
                                </div>
                                <div class="form-control">
                                    <label class="label cursor-pointer">
                                        <input onClick={() => setCountry('International')} type="radio" name="radio-6" class="radio checked:bg-blue-500" />
                                        <span class="label-text ml-5">International</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <input className='btn btn-outline btn-info w-full md:w-10/12 max-w-xs' type="submit" value='Subscribe' />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Subscribe;