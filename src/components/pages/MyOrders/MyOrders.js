import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const MyOrders = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/orders/${user?.email}`,{
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `${localStorage.getItem('accessTokenST')}`
            }
        })
        .then(res=>res.json())
        .then(data=>setOrders(data))
    },[user])

    return (
       <section>
            <h1 className='text-center text-2xl text-purple-500 font-bold my-2'>Here is your order list</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
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
                            <td>{order.orderId}</td>
                            <td className='text-center'>{order.purchaseStatus}</td>
                            <td className='text-center'><button className='btn btn-xs btn-error btn-outline'>Cancel Order</button></td>
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