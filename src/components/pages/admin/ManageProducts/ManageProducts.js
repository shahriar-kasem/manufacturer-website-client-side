import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useProducts from '../../../../hooks/useProducts';
import Loading from '../../../shared/Loading/Loading';

const ManageProducts = () => {
    const { products, isLoading, refetch } = useProducts();
    const [confirm, setConfirm] = useState(null);

    const handleProductDelete = (id) => {
        fetch(`https://gentle-spire-70229.herokuapp.com/product/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${localStorage.getItem('accessTokenST')}`,
            }
        })
            .then(res => {
                res.json()
                if (res.status === 200) {
                    toast.success('Product deleted successfully!')
                    refetch()
                    setConfirm(null)
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section>
            <h1 className='text-center text-2xl text-purple-500 font-bold my-2'>Manage Products</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
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
                                    <td>
                                        <label onClick={() => setConfirm(product)} htmlFor="delete-product" className="btn btn-outline btn-error btn-xs">Delete</label>
                                    </td>
                                </tr>
                            </tbody>)
                    }
                </table>
            </div>
            <input type="checkbox" id="delete-product" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-full md:w-6/12 max-w-5xl">
                    <h3 className="font-bold text-lg text-red-500">Are you sure you want to delete "{confirm?.name}"?</h3>
                    <p></p>
                    <div className='flex justify-end'>
                        <div onClick={() => handleProductDelete(confirm?._id)} className="modal-action">
                            <label htmlFor="delete-product" className="btn btn-outline btn-error btn-xs">Yes</label>
                        </div>
                        <div className="modal-action ml-3">
                            <label htmlFor="delete-product" className="btn btn-outline btn-xs">Cancel</label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManageProducts;