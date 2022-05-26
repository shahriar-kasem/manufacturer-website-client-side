import React from 'react';
import useReviews from '../../../hooks/useReviews';
import Review from '../Review/Review';
import { useNavigate } from 'react-router-dom';
import reviewLogo from '../../../images/logo/reviewLogo.png';
import useAdmin from '../../../hooks/useAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const Reviews = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const { reviews } = useReviews();
    const [admin] = useAdmin(user);

    return (
        <section className='md:mt-5 lg:w-11/12 md:w-11/12 mx-auto mb-5'>
            <div>
                <div className='flex justify-between items-center mx-1 md:mx-5'>
                    <div className='w-32'>
                        <img src={reviewLogo} alt="" />
                    </div>
                    <div>
                        <i>
                            <h3 className='my-1 text-xl text-blue-400 font-semibold'>Reviews</h3>
                            <p className='text-blue-400'>What our client say about us</p>
                        </i>
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-3'>
                    {
                        reviews?.map((review, index) => <Review
                            key={index}
                            review={review}
                        ></Review>)
                    }
                </div>
            </div>
            {
                !admin && <div className="grid flex-grow card rounded-box place-items-center"><button onClick={() => navigate('/dashboard/addReview')} className="btn w-full">Add Review</button></div>
            }
        </section>
    );
};

export default Reviews;