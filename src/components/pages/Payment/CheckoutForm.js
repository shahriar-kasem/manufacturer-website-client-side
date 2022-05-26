import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CheckoutForm = ({ order }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const navigate = useNavigate();

    const { _id, customerEmail, customerName, productPrice, purchaseQuantity } = order;

    useEffect(() => {
        fetch(`http://localhost:5000/create-payment-intent`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `${localStorage.getItem('accessTokenST')}`,
            },
            body: JSON.stringify({ productPrice, purchaseQuantity })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            })

    }, [productPrice, purchaseQuantity])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            // console.log(error)
            setCardError(error.message)
        }
        else {
            setCardError('');
            // console.log('[PaymentMethod]', paymentMethod);
        }
        setSuccess('');
        setProcessing(true);

        // confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: customerName,
                        email: customerEmail
                    },
                },
            },
        );

        if (intentError) {
            setCardError(intentError?.message);
            setProcessing(false);
        }
        else {
            setCardError('');
            setTransactionId(paymentIntent.id);
            // console.log(paymentIntent);
            setSuccess('Congratulations! Your payment is completed.');

            //   update order on database
            const payment = {
                order: _id,
                transactionId: paymentIntent.id,
                totalPaid: (paymentIntent.amount / 100),
                paymentStatus: 'paid',

            }
            fetch(`http://localhost:5000/order/payment/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `${localStorage.getItem('accessTokenST')}`
                },
                body: JSON.stringify(payment)
            }).then(res => res.json()).then(data => {
                setProcessing(false);
                // console.log(data)
                toast.success('Congratulations! Your payment is successful.')
                navigate('/dashboard/myOrders');

            })
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-xs btn-outline btn-success mt-5' type="submit" disabled={!stripe || !clientSecret || success}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-center text-red-500'>{cardError}</p>
            }
            {
                success && <div className='text-center text-green-500 font-semibold'>
                    <p>{success}</p>
                    <p>TransactionId: {transactionId}</p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;