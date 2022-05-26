import React from 'react';

const SocialResponsibility = () => {
    return (
        <section className='bg-slate-100 py-5 lg:py-10 px-5 md:px-10 lg:px-15 mb-4'>
            <h2 className='text-center mb-3 md:mb-6 lg:mb-4 font-bold text-3xl text-blue-500'><i>Social Responsibility</i></h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                <div className='flex flex-col items-center'>
                    <img className='w-32' src="https://i.ibb.co/ZgLhppH/people.jpg" alt="" />
                    <h5 className='text-center font-semibold text-lg'>PEOPLE</h5>
                    <h6 className='text-center font-bold text-xl text-blue-400'>Empower Makers</h6>
                    <div className='ml-2'>
                        <h6 className='font-semibold'>Help people thrive in a changing world.</h6>
                        <ul>
                            <li>* Empower 10 million makers and creators to thrive in a changing world</li>
                            <li>* Achieve 50-50 gender parity in leadership</li>
                            <li>* And by 2025, increase our spend with certified Diverse Suppliers to at least 10% and develop diverse suppliers</li>
                        </ul>
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <img className='w-40 mt-4' src="https://i.ibb.co/LY5G9HB/planet.jpg" alt="" />
                    <h5 className='text-center font-semibold text-lg mt-3'>PLANET</h5>
                    <h6 className='text-center font-bold text-xl text-blue-400'>Create a More Sustainable World</h6>
                    <div className='ml-2'>
                        <h6 className='font-semibold'>Have a positive environmental impact.</h6>
                        <ul>
                            <li>* Go beyond carbon neutral across our operations</li>
                            <li>* Set and meet context-based water targets, where relevant and necessary</li>
                            <li>* Achieve Zero Waste to Landfill across our operations</li>
                        </ul>
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <img className='w-40 mt-10' src="https://i.ibb.co/Mnvdprz/product.jpg" alt="" />
                    <h5 className='text-center font-semibold text-lg mt-1'>PRODUCT</h5>
                    <h6 className='text-center font-bold text-xl text-blue-400'>Innovate With Purpose</h6>
                    <div className='ml-2'>
                        <h6 className='font-semibold'>Make products that do a world of good.</h6>
                        <ul>
                            <li>* Enhance the lives of 500 million people with products that fulfill unmet societal needs</li>
                            <li>* Reduce our Scope 3 emissions 35% from a 2017 baseline</li>
                            <li>* And by 2025, make our packaging reusable; recyclable or compostable</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialResponsibility;