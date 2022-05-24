import React from 'react';
import Tool from '../Tool/Tool';
import useProducts from '../../../hooks/useProducts';

const Tools = () => {
    const {products} = useProducts();

    return (
        <section className='md:mt-5 lg:w-11/12 md:w-11/12 mx-auto mb-5'>
            <h1 className='text-green-500 text-4xl font-bold text-center'><i>Tools</i></h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-3 mx-auto mt-5'>
                {
                    products.map(product => <Tool
                    key={product._id}
                    product={product}
                    ></Tool>)
                }
            </div>
        </section>
    );
};

export default Tools;