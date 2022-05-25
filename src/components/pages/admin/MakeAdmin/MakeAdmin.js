import axios from 'axios';
import { signOut } from 'firebase/auth';
import React from 'react';
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

    const handleAdmin = (email) => {
        const proceed = window.confirm('Are you sure you want to make this user an admin?');
       if(proceed){
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
    }
    const handleRemoveAdmin = (email) => {
        const proceed = window.confirm("Are you sure you want to remove this user's admin status?");
        if(proceed){
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
                                        <button disabled={u.email === user.email} onClick={() => handleRemoveAdmin(u.email)} className='btn btn-outline btn-error btn-xs'>Remove Admin</button>
                                        :
                                        <button disabled={u.role === 'Admin'} onClick={() => handleAdmin(u.email)} className='btn btn-outline btn-success btn-xs'>Make Admin</button>

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