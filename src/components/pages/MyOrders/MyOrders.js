import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useUserOrder from '../../../hooks/useUserOrder';

const MyOrders = () => {
    const [user] = useAuthState(auth);
    const { orders, refetch } = useUserOrder(user);
    const navigate = useNavigate();
    const [confirm, setConfirm] = useState(null);

    const cancelOrder = (id) => {
        fetch(`https://gentle-spire-70229.herokuapp.com/order/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${localStorage.getItem('accessTokenST')}`,
            }
        })
            .then(res => {
                res.json()
                if (res.status === 200) {
                    toast.success('Product deleted successfully!')
                    setConfirm(null);
                    refetch();
                }
            })
    }

    const handlePay = (id) => {
        navigate(`/payment/${id}`)
    }

    return (
        <section>
            <h1 className='text-center text-2xl text-purple-500 font-bold my-2'>Here is your order list</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th className='text-center'>Order ID</th>
                            <th className='text-center'>Order Transaction ID</th>
                            <th className='text-center'>Purchase Status</th>
                            <th className='text-center'>Order</th>
                            <th className='text-center'>Payment</th>
                        </tr>
                    </thead>
                    {
                        orders &&
                        orders.map((order, index) =>
                            <tbody key={order._id}>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{order.customerEmail}</td>
                                    <td>{order._id}</td>
                                    <td>{order.transactionId}</td>
                                    <td className='text-center'>{order.purchaseStatus}</td>
                                    <td className='text-center'>
                                        {
                                            order.purchaseStatus !== 'Shipped'
                                                ?
                                                <label disabled={order.paymentStatus === 'paid'} onClick={() => setConfirm(order)} htmlFor="cancel-order" className="btn btn-outline btn-error btn-xs">Cancel Order</label>
                                                :
                                                <button className='btn btn-xs btn-error btn-outline btn-disabled'>Order Confirmed</button>
                                        }</td>
                                    <td className='text-center'>
                                        {
                                            order.paymentStatus === 'paid' ?
                                            <button className='btn btn-xs btn-success btn-outline btn-disabled'>Paid</button>
                                            :
                                            <button onClick={() => handlePay(order._id)} className='btn btn-xs btn-success btn-outline'>Pay</button>
                                        }
                                        </td>
                                </tr>
                            </tbody>
                        )
                    }
                </table>
            </div>
            <input type="checkbox" id="cancel-order" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-full md:w-6/12 max-w-5xl">
                    <h3 className="font-bold text-lg text-red-500">Are you sure you want to cancel this order?</h3>
                    <p></p>
                    <div className='flex justify-end'>
                        <div onClick={() => cancelOrder(confirm?._id)} className="modal-action">
                            <label htmlFor="cancel-order" className="btn btn-outline btn-error btn-xs">Yes</label>
                        </div>
                        <div className="modal-action ml-3">
                            <label htmlFor="cancel-order" className="btn btn-outline btn-xs">Cancel</label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyOrders;