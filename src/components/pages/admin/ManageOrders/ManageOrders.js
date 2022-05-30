import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useOrders from '../../../../hooks/useOrders';
import Loading from '../../../shared/Loading/Loading';

const ManageOrders = () => {
    const { orders, isLoading, refetch } = useOrders();
    const [confirm, setConfirm] = useState(null);

    const handleUpdateOrder = (id) => {
        const purchaseStatus = 'Shipped'
        fetch(`https://gentle-spire-70229.herokuapp.com/order/update/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `${localStorage.getItem('accessTokenST')}`
            },
            body: JSON.stringify({ purchaseStatus })
        }).then(res => res.json()).then(data => {
            toast.success('Order Confirmed Successfully!')
            setConfirm(null);
            refetch()
        })
    }
    const handleDeleteOrder = (id) => {
        fetch(`https://gentle-spire-70229.herokuapp.com/order/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${localStorage.getItem('accessTokenST')}`,
            }
        })
            .then(res => {
                res.json()
                if (res.status === 200) {
                    toast.success('Order Cancelled Successfully!')
                    setConfirm(null);
                    refetch();
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section>
            <h1 className='text-center text-2xl text-purple-500 font-bold my-2'>Manage Orders</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Customer Email</th>
                            <th>Order Transaction ID</th>
                            <th>Purchase Status</th>
                            <th>Payment Status</th>
                            <th className='text-center'>Update Status</th>
                        </tr>
                    </thead>
                    {
                        orders &&
                        orders.map((order, index) =>
                            <tbody key={order._id}>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{order.customerEmail}</td>
                                    <td>{order.transactionId}</td>
                                    <td>{order.purchaseStatus}</td>
                                    <td className='text-center'>{order.paymentStatus}</td>
                                    <td className='text-center'>
                                        {
                                            order.purchaseStatus === 'Shipped' ?
                                                <label className="btn btn-outline btn-success btn-xs btn-disabled">Order Confirmed</label>
                                                :
                                                <label disabled={order.purchaseStatus === 'Shipped'} onClick={() => setConfirm(order)} htmlFor="update-order" className="btn btn-outline btn-info btn-xs">Update Order</label>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        )
                    }
                </table>
            </div>
            <input type="checkbox" id="update-order" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-full md:w-6/12 max-w-5xl">
                    <h3 className="font-bold text-lg text-red-500">What you want to do with this order?</h3>
                    <p></p>
                    <div className='flex justify-end'>
                        <div className="modal-action">
                            <label disabled={confirm?.paymentStatus !== 'paid'} onClick={() => handleUpdateOrder(confirm?._id)} htmlFor="update-order" className="btn btn-outline btn-error btn-xs">Confirm Order</label>
                        </div>
                        <div className="modal-action ml-3">
                            <label onClick={() => handleDeleteOrder(confirm?._id)} htmlFor="update-order" className="btn btn-outline btn-error btn-xs">Cancel Order</label>
                        </div>
                        <div className="modal-action ml-3">
                            <label htmlFor="update-order" className="btn btn-outline btn-xs">Cancel</label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManageOrders;