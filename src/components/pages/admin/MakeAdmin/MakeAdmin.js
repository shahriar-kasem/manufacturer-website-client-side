import axios from 'axios';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../../firebase.init';
import useUsers from '../../../../hooks/useUsers';
import Loading from '../../../shared/Loading/Loading';

const MakeAdmin = () => {
    const { users, isLoading, refetch } = useUsers();
    const navigate = useNavigate();

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
                        users?.map((user, index) =>
                            <tbody key={user._id}>
                                <tr className={`${user.role === 'Admin' ? 'active' : ''}`} >
                                    <td>{index + 1}</td>
                                    <td>{user.email}</td>
                                    <td className='text-center'>{user.role}</td>
                                    <td className='text-center'>{user.role === 'Admin' ?
                                        <button onClick={() => handleRemoveAdmin(user.email)} className='btn btn-xs'>Remove Admin</button>
                                        :
                                        <button disabled={user.role === 'Admin'} onClick={() => handleAdmin(user.email)} className='btn btn-xs'>Make Admin</button>

                                    }</td>
                                </tr>
                            </tbody>
                        )
                    }
                </table>
            </div>
        </section>
    );
};

export default MakeAdmin;