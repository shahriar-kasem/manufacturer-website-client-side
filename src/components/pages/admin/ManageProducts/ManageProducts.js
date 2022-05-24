import React from 'react';
import { toast } from 'react-toastify';
import useProducts from '../../../../hooks/useProducts';
import Loading from '../../../shared/Loading/Loading';

const ManageProducts = () => {
    const { products, isLoading, refetch } = useProducts();
    // console.log(products)

    const handleProductDelete = (id) => {
        fetch(`http://localhost:5000/product/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${localStorage.getItem('accessTokenST')}`,
            }
        })
            .then(res => {
                res.json()
                if (res.status) {
                    toast.success('Product deleted successfully!')
                    refetch()
                }
            })
    }

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <section>
            <h1 className='text-center text-2xl text-purple-500 font-bold my-2'>Manage Products</h1>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th className='text-center'>Available quantity</th>
                            <th className='text-center'>Minimum order quantity</th>
                            <th className='text-center'>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    {
                        products?.map((product, index) =>
                            <tbody key={product._id}>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{product.name}</td>
                                    <td className='text-center'>{product.availableQuantity}</td>
                                    <td className='text-center'>{product.minimumOrderQuantity}</td>
                                    <td className='text-center'>{product.price}</td>
                                    <td><button onClick={() => handleProductDelete(product._id)} class="btn btn-outline btn-error btn-xs">Delete</button></td>
                                </tr>
                            </tbody>)
                    }
                </table>
            </div>
        </section>
    );
};

export default ManageProducts;