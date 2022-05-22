import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useReviews from '../../../hooks/useReviews';
import Footer from '../../shared/Footer/Footer';
import Banner from '../Banner/Banner';
import BusinessDetails from '../BusinessDetails/BusinessDetails';
import Review from '../Review/Review';
import Tools from '../Tools/Tools';

const Home = () => {
    const [reviews] = useReviews();
    const navigate = useNavigate();
    const homeReview = reviews.length - 4;

    return (
        <section>
            <Banner></Banner>
            <Tools></Tools>
            <BusinessDetails></BusinessDetails>
            <section className='md:mt-5 lg:w-10/12 mg:w-11/12 mx-auto'>
                <div>
                    <div className='flex justify-between items-center mx-1 md:mx-5'>
                        <div className='w-36'>
                            <img src="https://i.ibb.co/pLKmYV0/quote-sign-icon-quotation-mark-symbol-vector-3756804.png" alt="" />
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
                            reviews.slice(reviews.length - homeReview).map((review, index) => <Review
                                key={index}
                                review={review}
                            ></Review>)
                        }
                    </div>
                </div>
                <div class="flex flex-col w-full lg:flex-row my-3 md:my-5">
                    <div class="grid flex-grow card rounded-box place-items-center"><button onClick={() => navigate('/reviews/#newReview')} class="btn w-full">Add Review</button></div>
                    <div class="divider lg:divider-horizontal">OR</div>
                    <div class="grid flex-grow card rounded-box place-items-center"><button onClick={()=> navigate('/reviews')} class="btn w-full">See all reviews</button></div>
                </div>
            </section>
            <Footer></Footer>
        </section>
    );
};

export default Home;