import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useReviews from '../../../hooks/useReviews';

const AddReview = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [reviews, setReviews] = useReviews();
    const [star, setStar] = useState(5);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const userProfileAlt = 'https://i.ibb.co/D4jRPc7/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png';
    const userImg = user?.photoURL || userProfileAlt;

    const addReview = (data, event) => {
        const name = data.name;
        const description = data.description;
        const ratings = star;
        const img = userImg;
        const email = user.email;
        const review = { name, description, ratings, img, email };
        const newReviews = [...reviews, review];
        setReviews(newReviews)
        axios({
            method: 'POST',
            url: 'http://localhost:5000/review',
            data: review,
        });
        event.target.reset();
        navigate('/reviews')
        toast.success('Review added successfully')
    };

    return (
        <section>
            <div id='newReview' className='mt-10 mb-5'>
                <h3 className='text-center text-xl text-blue-500 font-semibold'><i>Add a new review</i></h3>
                <form className='flex flex-col items-center' onSubmit={handleSubmit(addReview)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            readOnly
                            value={user.displayName}
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
                            <span className="label-text">Review</span>
                        </label>
                        <textarea
                            rows={5}
                            type="text"
                            placeholder="Description"
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
                    {/* <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Ratings</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Ratings"
                            className="input input-bordered w-full max-w-xs"
                            {...register("ratings", {
                                min: 1,
                                max: 5,
                                required: {
                                    value: true,
                                    message: 'Ratings is required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.ratings?.type === 'required' && <p className='text-red-500'><small>{errors.ratings.message}</small></p>}
                            {errors.ratings?.type === 'min' && <p className='text-red-500'><small>Minimum ratings can be 1</small></p>}
                            {errors.ratings?.type === 'max' && <p className='text-red-500'><small>Maximum ratings can be 5</small></p>}
                        </label>
                    </div> */}
                    {/* alternative */}
                    <div className='form-control w-full max-w-xs'>
                        <label className="label">
                            <span className="label-text">Ratings</span>
                        </label>
                        <div className="rating input input-bordered w-full max-w-xs flex items-center mb-5">
                            <input onChange={() => setStar(1)} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input onChange={() => setStar(2)} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input onChange={() => setStar(3)} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input onChange={() => setStar(4)} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input onChange={() => setStar(5)} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        </div>
                    </div>

                    <input className='btn btn-outline' type="submit" value='Add review' />
                </form>
            </div>
        </section>
    );
};

export default AddReview;