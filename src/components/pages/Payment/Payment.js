import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { useQuery } from 'react-query';
import Loading from '../../shared/Loading/Loading';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51L1lxuGY0gr9tAJIZaTi6gjRXFiQIssBXsgr69JFIsEzCts3iCB101S0SDtCnuZncZYpD6CxeJnePioeGGbTqG5d00A5PUEpXQ');

const Payment = () => {
    const { id } = useParams();
    const { data: order, isLoading, refetch } = useQuery(['order', id], () => fetch(`http://localhost:5000/order/${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': `${localStorage.getItem('accessTokenST')}`
        }
    }).then(res => res.json()
    )
    )
    const [totalPrice, setTotalPrice] = useState();
    useEffect(() => {
        const calculatePrice = order?.purchaseQuantity * order?.productPrice;
        setTotalPrice(calculatePrice)
    }, [order])

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section>
            {
                order &&
                <div className='flex flex-col justify-center items-center'>
                    <div className="card w-2/2 md:w-1/2 max-w-md bg-base-100 shadow-xl mr-0 md:mr-3">
                        <div className="card-body">
                            <h6 className='text-lg font-bold text-blue-500'><i>Hello, <span>{order.customerName}</span></i></h6>
                            <h4 className='font-semibold'><span className='font-bold text-lg'>Please pay for</span> <span className='font-semibold text-gray-600'>{order.productName}</span></h4>
                            <p className='font-semibold'>Purchase quantity: <span>{order.purchaseQuantity}</span></p>
                            <p className='font-semibold'>Price: ${order.productPrice}</p>
                            <h5 className='font-bold'>Please pay total: <span className='text-red-500'>${totalPrice}</span></h5>
                        </div>
                    </div>
                    <div className="card w-full md:w-1/2 max-w-md bg-base-100 shadow-xl">
                        <div className="card-body">
                            <Elements stripe={stripePromise}>
                                <CheckoutForm order={order} />
                            </Elements>
                        </div>
                    </div>
                </div>
            }
        </section>
    );
};

export default Payment;