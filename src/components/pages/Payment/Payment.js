import React from 'react';
import { useParams } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useQuery } from 'react-query';
import Loading from '../../shared/Loading/Loading';

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
    const totalPrice = order?.purchaseQuantity * order?.productPrice;
    // console.log(order)

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section>
            {
                order &&
                <div className='flex justify-center'>
                    <div class="card w-96 bg-base-100 shadow-xl">
                        <div class="card-body">
                            <h6 className='text-lg font-bold text-blue-500'><i>Hello, {order.customerName}</i></h6>
                            <h4>Please pay for <span className='font-semibold text-info'>{order.productName}</span></h4>
                            <p className='font-semibold'>Purchase quantity: <span className='text-info'>{order.purchaseQuantity}</span></p>
                            <p className='font-semibold'>Price: ${order.productPrice}</p>
                            <h5 className='font-bold'>Please pay total: <span className='text-red-500'>${totalPrice}</span></h5>
                        </div>
                    </div><div class="card w-96 bg-base-100 shadow-xl">
                        <div class="card-body">
                            <Elements stripe={stripePromise}>
                                <CheckoutForm  key={order?._id}  order={order} />
                            </Elements>
                        </div>
                    </div>
                </div>
            }
        </section>
    );
};

export default Payment;