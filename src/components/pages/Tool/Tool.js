import React from 'react';
import { useNavigate } from 'react-router-dom';

const Tool = ({ product }) => {
    const { _id, name, img, description, minimumOrderQuantity, availableQuantity, price } = product;
    const navigate = useNavigate();

    const handlePurchase = (id) => {
        navigate(`/purchase/${id}`)
    }

    return (
        <div className="card max-w-md bg-base-100 shadow-xl mx-auto">
            <figure><img className='rounded-lg h-48' src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p><span className='font-bold text-gray-500'>Tool Details: </span>{description.slice(0, 300)}{description.length < 300 ? '': '..........'}</p>
                <h5 className='text-normal font-semibold text-red-500'>Minimum order quantity: <span className='text-red-600'>{minimumOrderQuantity}</span></h5>
                {
                    (availableQuantity < minimumOrderQuantity) && <h4 className='text-lg font-semibold text-red-600'>Temporarily Unavailable</h4> 
                }
                {
                    (availableQuantity > minimumOrderQuantity) && <h4 className='text-lg font-semibold text-success'>Available quantity: {availableQuantity}</h4> 
                }
                <h6 className='text-lg font-semibold'>Price: ${price}</h6>
                <div className="card-actions justify-start">
                    <button disabled={(availableQuantity < minimumOrderQuantity)} onClick={() => handlePurchase(_id)} className="btn btn-outline btn-success">Purchase</button>
                </div>
            </div>
        </div>
    );
};

export default Tool;