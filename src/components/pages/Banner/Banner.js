import React from 'react';

const Banner = () => {
    return (
        <section className='md:mt-2 lg:mt-4'>
           <div className="hero bg-base-200 rounded md:px-3 lg:px-8">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src="https://api.lorem.space/image/movie?w=260&h=400" className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">Box Office News!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
        </section>
    );
};

export default Banner;