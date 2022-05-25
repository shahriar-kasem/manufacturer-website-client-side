import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../../firebase.init';
import useUsers from '../../../../hooks/useUsers';
import Loading from '../../../shared/Loading/Loading';

const MakeAdmin = () => {
    const [user] = useAuthState(auth);
    const { users, isLoading, refetch } = useUsers();
    const navigate = useNavigate();
    const [confirm, setConfirm] = useState(null);

    const handleAdmin = (email) => {
        axios.patch(`http://localhost:5000/user/admin?email=${email}`,
        { role: 'Admin' },
        {
            headers: {
                authorization: `${localStorage.getItem('accessTokenST')}`
            },
        },
    ).then(res => {
        if (res.status === 200) {
            toast.success('Successfully made an admin!');
            setConfirm(null);
            refetch();
        }
    }).catch((error) => {
        toast.error('Something went wrong! Please try again later');
        refetch();
        if (error) {
            signOut(auth);
            localStorage.removeItem('accessTokenST');
            navigate('/');
        }
    })
    }
    const handleRemoveAdmin = (email) => {
        axios.patch(`http://localhost:5000/user/admin?email=${email}`,
        { role: '' },
        {
            headers: {
                authorization: `${localStorage.getItem('accessTokenST')}`
            },
        },
    ).then(res => {
        if (res.status === 200) {
            toast('Successfully removed admin status!');
            setConfirm(null);
            refetch();
        }
    }).catch((error) => {
        toast.error('Something went wrong! Please try again later');
        refetch();
        if (error) {
            signOut(auth);
            localStorage.removeItem('accessTokenST');
            navigate('/');
        }
    })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <section>
            <h1 className='text-center text-2xl text-purple-500 font-bold my-2'>Admin Panel</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>User Email</th>
                            <th className='text-center'>User Status</th>
                            <th className='text-center'>Control Status</th>
                        </tr>
                    </thead>
                    {
                        users?.map((u, index) =>
                            <tbody key={u._id}>
                                <tr className={`${u.role === 'Admin' ? 'active' : ''}`} >
                                    <td>{index + 1}</td>
                                    <td>{u.email}</td>
                                    <td className='text-center'>{u.role}</td>
                                    <td className='text-center'>{u.role === 'Admin' ?
                                        // <button disabled={u.email === user.email} onClick={() => handleRemoveAdmin(u.email)} className='btn btn-outline btn-error btn-xs'>Remove Admin</button>
                                        <label disabled={u.email === user.email} onClick={() => setConfirm(u)} htmlFor="remove-admin" className="btn btn-outline btn-error btn-xs">Remove Admin</label>
                                        :
                                        // <button disabled={u.role === 'Admin'} onClick={() => handleAdmin(u.email)} className='btn btn-outline btn-success btn-xs'>Make Admin</button>
                                        <label disabled={u.role === 'Admin'} onClick={() => setConfirm(u)} htmlFor="make-admin" className="btn btn-outline btn-error btn-xs">Make Admin</label>

                                    }</td>
                                </tr>
                            </tbody>
                        )
                    }
                </table>
            </div>
            <input type="checkbox" id="remove-admin" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-full md:w-6/12 max-w-5xl">
                    <h3 className="font-bold text-lg text-red-500">Are you sure you want to remove "{confirm?.email}'s" admin status?</h3>
                    <p></p>
                    <div className='flex justify-end'>
                        <div onClick={() => handleRemoveAdmin(confirm?.email)} className="modal-action">
                            <label htmlFor="remove-admin" className="btn btn-outline btn-error btn-xs">Yes</label>
                        </div>
                        <div className="modal-action ml-3">
                            <label htmlFor="remove-admin" className="btn btn-outline btn-xs">Cancel</label>
                        </div>
                    </div>
                </div>
            </div>
            <input type="checkbox" id="make-admin" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-full md:w-6/12 max-w-5xl">
                    <h3 className="font-bold text-lg text-red-500">Are you sure you want to make "{confirm?.email}" an admin?</h3>
                    <p></p>
                    <div className='flex justify-end'>
                        <div onClick={() => handleAdmin(confirm?.email)} className="modal-action">
                            <label htmlFor="make-admin" className="btn btn-outline btn-error btn-xs">Yes</label>
                        </div>
                        <div className="modal-action ml-3">
                            <label htmlFor="make-admin" className="btn btn-outline btn-xs">Cancel</label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAdmin;