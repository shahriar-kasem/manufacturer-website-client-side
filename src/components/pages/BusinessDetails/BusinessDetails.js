import React from 'react';

const BusinessDetails = () => {
    return (
        <section className='my-10'>
            <div className="hero bg-business-summary">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content w-full text-white py-10 md:py-20">
                    <div className="w-full">
                        <h1 className="text-lg md:text-2xl lg:text-3xl text-center font-bold"><i>A LEADING GLOBAL DIVERSIFIED INDUSTRIAL</i></h1>
                        <p className='text-center mb-5'><i><small>BASED ON REVENUE</small></i></p>
                        <div className='flex flex-col md:flex-row justify-evenly mt-10 lg:mt-15'>
                            <div className='flex flex-col items-center mt-4 md:mt-0'>
                                <div className='w-20 mt-6'><img src="https://i.ibb.co/Hhk2Kkh/people-group-solid-svg.png" alt="" /></div>
                                <div><h3 className=' text-xl font-semibold'>120+ customers</h3></div>
                            </div>
                            <div className='flex flex-col items-center mt-4 md:mt-0'>
                                <div className='w-24'><img src='https://i.ibb.co/4JHy1VH/hand-holding-usd-solid-svg.png' alt="" /></div>
                                <div><h3 className='mt-2 text-xl font-semibold'>225M+ Annual revenue</h3></div>
                            </div>
                            <div className='flex flex-col items-center mt-4 md:mt-2'>
                                <div className='w-20'><img src="https://i.ibb.co/jfDQPcB/thumbs-up-solid-svg.png" alt="" /></div>
                                <div><h3 className='mt-2 text-xl font-semibold'>44K+ Reviews</h3></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BusinessDetails;