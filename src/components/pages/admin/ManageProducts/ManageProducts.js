import React from 'react';
import useProducts from '../../../../hooks/useProducts';

const ManageProducts = () => {
    const {products, isLoading, refetch} = useProducts();
    // console.log(products)

    return (
        <section>
            <h1 className='text-center text-2xl text-purple-500 font-bold my-2'>Manage Products</h1>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Available quantity</th>
                            <th>Minimum order quantity</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    {
                        products?.map((product,index) => 
                        <tbody key={product._id}>
                            <tr>
                                <th>{index + 1 }</th>
                                <td>{product.name}</td>
                                <td>{product.availableQuantity}</td>
                                <td>{product.minimumOrderQuantity}</td>
                                <td>{product.price}</td>
                                <td><button class="btn btn-outline btn-error btn-xs">Delete</button></td>
                            </tr>
                        </tbody>)
                    }
                </table>
            </div>
        </section>
    );
};

export default ManageProducts;