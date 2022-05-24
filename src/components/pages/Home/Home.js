import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import useProducts from '../../../hooks/useProducts';
import useReviews from '../../../hooks/useReviews';
import Footer from '../../shared/Footer/Footer';
import Banner from '../Banner/Banner';
import BusinessDetails from '../BusinessDetails/BusinessDetails';
import Review from '../Review/Review';
import Tool from '../Tool/Tool';
import reviewLogo from '../../../images/logo/reviewLogo.png';

const Home = () => {
    const [user] = useAuthState(auth);
    const [products] = useProducts();
    const [reviews] = useReviews();
    const navigate = useNavigate();
    const homeReview = reviews.length - 3;
    const homeProduct = products.length -3;

    return (
        <section>
            <Banner></Banner>
            <section className='mt-5'>
                <div className='md:mt-5 lg:w-11/12 md:w-11/12 mx-auto mb-5'>
                    <h1 className='text-green-500 text-4xl font-bold text-center'><i>Tools</i></h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-3 mx-auto mt-5'>
                        {
                            products.slice(homeProduct, products.length).map(product => <Tool
                                key={product._id}
                                product={product}
                            ></Tool>)
                        }
                    </div>
                    <div className="flex flex-col w-full lg:flex-row my-3 md:my-5">
                    <div className="grid flex-grow card rounded-box place-items-center"><button onClick={() => navigate('/tools')} className="btn w-full">See all Tools</button></div>
                </div>
                </div>
            </section>
            <BusinessDetails></BusinessDetails>
            <section className='md:mt-5 lg:w-11/12 md:w-11/12 mx-auto'>
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
                            reviews?.slice(homeReview, reviews.length).map((review, index) => <Review
                                key={index}
                                review={review}
                            ></Review>)
                        }
                    </div>
                </div>
                <div className="flex flex-col w-full lg:flex-row my-3 md:my-5">
                    <div className="grid flex-grow card rounded-box place-items-center"><button onClick={() => navigate('/reviews')} className="btn w-full">See all reviews</button></div>
                </div>
            </section>
            <Footer></Footer>
        </section>
    );
};

export default Home;