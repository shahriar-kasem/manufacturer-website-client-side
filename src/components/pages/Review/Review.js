import React from 'react';

const Review = ({ review }) => {
    const { name, description, ratings, img } = review;

    return (
        <section className="card max-w-md bg-base-100 shadow-xl">
            <div className="card-body">
                <p>{description}</p>
                <div className="card-actions flex items-center">
                    <div className="avatar">
                        <div className="w-20 rounded-full mt-2 mr-3">
                            <img src={img} alt={name} />
                        </div>
                    </div>
                    <div>
                        <h4 className='text-xl'>{name}</h4>
                        <div className="rating">
                            <p className='text-lg font-semibold text-orange-500 mr-2'>Ratings:</p>
                            {
                                ratings >= 1 && <li className='mask mask-star-2 bg-orange-400'></li>
                            }
                            {
                                ratings >= 2 && <li className='mask mask-star-2 bg-orange-400'></li>
                            }
                            {
                                ratings >= 3 && <li className='mask mask-star-2 bg-orange-400'></li>
                            }
                            {
                                ratings >= 4 && <li className='mask mask-star-2 bg-orange-400'></li>
                            }
                            {
                                ratings >= 5 && <li className='mask mask-star-2 bg-orange-400'></li>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Review;