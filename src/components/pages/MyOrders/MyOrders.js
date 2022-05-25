import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useUserOrder from '../../../hooks/useUserOrder';

const MyOrders = () => {
    const [user] = useAuthState(auth);
    const {orders, refetch} = useUserOrder(user);

    const cancelOrder = (id) => {
        const proceed = window.confirm('Are you sure you want to cancel this order?');
        if(proceed){
            fetch(`http://localhost:5000/order/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${localStorage.getItem('accessTokenST')}`,
            }
        })
            .then(res => {
                res.json()
                if (res.status === 200) {
                    toast.success('Product deleted successfully!')
                    refetch();
                }
            })
        }
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
                            <th>Order ID</th>
                            <th>Order Transaction ID</th>
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
                            <th>{index +1}</th>
                            <td>{order.customerEmail}</td>
                            <td></td>
                            <td>{order.orderId}</td>
                            <td className='text-center'>{order.purchaseStatus}</td>
                            <td className='text-center'>
                                {
                                    order.purchaseStatus !== 'Shipped'
                                    ?                                 <button onClick={() => cancelOrder(order._id)} className='btn btn-xs btn-error btn-outline'>Cancel Order</button>
                                    :
                                    <button className='btn btn-xs btn-error btn-outline btn-disabled'>Order Confirmed</button>
                                }</td>
                            <td className='text-center'><button className='btn btn-xs btn-success btn-outline'>Pay</button></td>
                        </tr>
                    </tbody>
                    )
                  }
                </table>
            </div>
        </section>
    );
};

export default MyOrders;