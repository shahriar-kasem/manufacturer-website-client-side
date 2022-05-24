import React from 'react';
import useOrders from '../../../../hooks/useOrders';
import Loading from '../../../shared/Loading/Loading';

const ManageOrders = () => {
    const { orders, isLoading } = useOrders();

    if(isLoading){
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
                            <th>Update Status</th>
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
                            <td>{order.purchaseStatus}</td>
                            <td>{order.paymentStatus}</td>
                            <td><button className='btn btn-outline btn-info btn-xs'>Update</button></td>
                        </tr>
                    </tbody>
                    )
                  }
                </table>
            </div>
        </section>
    );
};

export default ManageOrders;