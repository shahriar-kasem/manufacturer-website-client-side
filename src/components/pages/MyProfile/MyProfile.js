import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Ocean from '../../../images/background/Ocean.png';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const [editProfile, setEditProfile] = useState(false);
    const [updateProfile] = useUpdateProfile(auth);
    const [name, setName] = useState(user?.displayName);
    const email = user?.email;
    const { data: userData, refetch } = useQuery('userProfile', () => fetch(`http://localhost:5000/user/profile?email=${email}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `${localStorage.getItem('accessTokenST')}`
        }
    }).then(res => res.json()
    )
    )
    const [city, setCity] = useState();
    const [education, setEducation] = useState();
    const [phone, setPhone] = useState();
    useEffect(()=>{
        const city = userData?.city;
        const education = userData?.education;
        const phone = userData?.phone;
        setCity(city);
        setEducation(education);
        setPhone(phone);
    },[userData])

    const updateProfileInfo = async(event) => {
        event.preventDefault();
        const newName = event.target.name.value;
        const education = event.target.education.value;
        const city = event.target.city.value;
        const phone = event.target.phone.value;
        const newUserData = {education, city, phone};
        await updateProfile({displayName: newName});
        axios.patch(`http://localhost:5000/user/profile?email=${email}`,
            newUserData,
            {
                headers: {
                    authorization: `${localStorage.getItem('accessTokenST')}`
                },
            },
        ).then(res => {
            if (res.status === 200) {
                toast.success('Successfully updated profile');
                setEditProfile(false);
                refetch();
            }
        }).catch((error) => {
            toast.error('Something went wrong! Please try again later');
            refetch();
            if (error) {
                signOut(auth);
                localStorage.removeItem('accessTokenST');
                Navigate('/');
            }
        })
    }
    const handleName = (event) => {
        const newName = event.target.value;
        setName(newName);
    }
    const handleEducation = (event) => {
        const newEducation = event.target.value;
        setEducation(newEducation);
    }
    const handleCity = (event) => {
        const newCity = event.target.value;
        setCity(newCity);
    }
    const handlePhone = (event) => {
        const newPhone = event.target.value;
        setPhone(newPhone);
    }

    return (
        <section>
            <h1 className='text-center text-2xl text-purple-500 font-bold my-2'>My Profile</h1>
            <div class="card bg-base-100 shadow-xl image-full">
                <figure><img src={Ocean} alt="Shoes" /></figure>
                <div class="card-body flex items-center">
                    <div class="card w-11/12 bg-base-100 shadow-xl">
                        <div class="card-body text-black">
                            <h2 class="card-title">                   <button disabled={editProfile} onClick={() => setEditProfile(true)} class="btn btn-xs btn-outline btn-info">Edit info</button></h2>
                            <form onSubmit={updateProfileInfo}>
                                <div onChange={handleName} class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text">Full Name</span>
                                    </label>
                                    <input
                                        readOnly={!editProfile}
                                        value={name || ''}
                                        name='name'
                                        type="text" placeholder="Type here" class="input input-bordered input-primary w-full max-w-xs"
                                        required
                                    />
                                </div>
                                <div class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text">Email: <small>You can't change your email</small></span>
                                    </label>
                                    <input
                                        readOnly
                                        value={user?.email}
                                        name='email'
                                        type="email" placeholder="Type here" class="input input-bordered input-primary w-full max-w-xs" />
                                </div>
                                <div onChange={handleCity} class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text">Location/City</span>
                                    </label>
                                    <input
                                        readOnly={!editProfile}
                                        value={city || ''}
                                        type="text"
                                        name="city"
                                        placeholder="Type here" class="input input-bordered input-primary w-full max-w-xs" required
                                    />
                                </div>
                                <div onChange={handleEducation} class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text">Education</span>
                                    </label>
                                    <input
                                        readOnly={!editProfile}
                                        value={education || ''}
                                        type="text" placeholder="Type here"
                                        name="education" class="input input-bordered input-primary w-full max-w-xs"
                                        required
                                    />
                                </div>
                                <div onChange={handlePhone} class="form-control w-full max-w-xs">
                                    <label class="label">
                                        <span class="label-text">Phone</span>
                                    </label>
                                    <input
                                        readOnly={!editProfile}
                                        value={phone || ''}
                                        name='phone'
                                        type="number" placeholder="Type here" class="input input-bordered input-primary w-full max-w-xs" required
                                    />
                                </div>
                                <div class="card-actions justify-start mt-3">
                                    <input disabled={!editProfile} class="btn btn-outline btn-success" type="submit" value="update" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyProfile;