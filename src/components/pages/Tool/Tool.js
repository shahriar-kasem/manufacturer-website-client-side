import React from 'react';

const Tool = ({ product }) => {
    const { name, img, description, minimumOrderQuantity, availableQuantity, price } = product;

    return (
        <div class="card max-w-md bg-base-100 shadow-xl">
            <figure><img className='rounded-lg' src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-start">
                    <button class="btn btn-outline btn-success">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Tool;