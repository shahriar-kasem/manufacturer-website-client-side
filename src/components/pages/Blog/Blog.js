import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useAdmin from '../../../hooks/useAdmin';

const Blog = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    const navigate = useNavigate();
    const [confirm, setConfirm] = useState(null);
    const { data: blogs, refetch } = useQuery('blogsData', () => fetch(`http://localhost:5000/blogs`).then(res => res.json()))

    const handleBlogDelete = (id) => {
        fetch(`http://localhost:5000/blog/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `${localStorage.getItem('accessTokenST')}`,
            }
        })
            .then(res => {
                res.json()
                if (res.status) {
                   if(res.status === 200){
                    toast.success('Product deleted successfully!')
                    setConfirm(null)
                    refetch()
                   }
                   else{
                       toast.error('Something went wrong! Please try again later')
                       navigate('/')
                   }
                }
            })
    }

    return (
        <section>
            <h1 className='text-blue-500 text-4xl font-bold text-center'><i>Blogs</i></h1>
            <div>
                {
                    blogs &&
                    blogs.map(blog =>
                        <div key={blog._id}>
                            <div className="card w-11/12 bg-base-100 shadow-xl mx-auto mt-4">
                                <div className="card-body">
                                    <h2 className="text-xl font-bold text-center">Question: {blog.name}</h2>
                                    <p className='text-lg text-start font-semibold'><span className='underline'>Answer:</span> {blog.description}</p>
                                </div>
                                {
                                    admin && <div className="card-actions justify-end">
                                        {/* <button onClick={()=> handleBlogDelete(blog._id)} className="btn btn-xs btn-outline btn-error">Delete Blog</button> */}
                                        <label onClick={() => setConfirm(blog)} htmlFor="delete-blog" className="btn btn-outline btn-error btn-xs">Delete Blog</label>
                                    </div>
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            <input type="checkbox" id="delete-blog" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-full md:w-6/12 max-w-5xl">
                    <h3 className="font-bold text-lg text-red-500">Are you sure you want to delete this blog?</h3>
                    <p></p>
                    <div className='flex justify-end'>
                        <div onClick={() => handleBlogDelete(confirm?._id)} className="modal-action">
                            <label htmlFor="delete-blog" className="btn btn-outline btn-error btn-xs">Yes</label>
                        </div>
                        <div className="modal-action ml-3">
                            <label htmlFor="delete-blog" className="btn btn-outline btn-xs">Cancel</label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog;