import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useReviews from '../../../hooks/useReviews';

const AddReview = () => {
    const [user] = useAuthState(auth);
    const [userName, setUserName] = useState(user?.displayName);
    const navigate = useNavigate();
    const { refetch } = useReviews();
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
        axios({
            method: 'POST',
            url: 'https://gentle-spire-70229.herokuapp.com/review',
            data: review,
        }).then(res=>{
            if(res.status === 200){
                refetch();
                event.target.reset();
                toast.success('Review added successfully')
            }
        }).catch((error)=>{
            const errorMessage = error.response.data.message;
            toast.error(errorMessage);
            localStorage.removeItem('accessTokenST')
            signOut(auth);
        })
        navigate('/reviews')
    };
    const handleName = (event) => {
        const newName = event.target.value;
        setUserName(newName);
    }

    return (
        <section>
            <div id='newReview' className='mt-10 mb-5'>
                <h3 className='text-center text-xl text-blue-500 font-semibold'><i>Add a new review</i></h3>
                <form className='flex flex-col items-center' onSubmit={handleSubmit(addReview)}>
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