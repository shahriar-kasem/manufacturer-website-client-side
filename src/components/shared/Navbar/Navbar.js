import React from 'react';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

const Navbar = () => {
    const [user, loading] = useAuthState(auth);

    const logout = () => {
        signOut(auth);
    }

    const menu = <>
        <li className='hover:text-purple-500 hover:bordered'><Link to='/home'>Home</Link></li>
        <li className='hover:text-purple-500 hover:bordered'><Link to='/dashboard'>Dashboard</Link></li>
        <li className='hover:text-purple-500 hover:bordered'><Link to='/blog'>Blog</Link></li>
        <li className='hover:text-purple-500 hover:bordered'><Link to='/reviews'>Reviews</Link></li>
        <li className='hover:text-purple-500 hover:bordered'><Link to='/myPortfolio'>My Portfolio</Link></li>
        {
            !user && <li className='hover:text-purple-500 hover:bordered'><Link to='/login'>Login</Link></li>
        }
    </>

    return (
        <section>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                menu
                            }
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-xl">Manufacturer</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {
                            menu
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {
                                    !user && <img src='https://i.ibb.co/D4jRPc7/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png' alt='profile-icon' />
                                }
                                {
                                    !user?.photoURL ?
                                    <img src='https://i.ibb.co/D4jRPc7/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png' alt='profile-icon' />
                                    :
                                    <img src={user.photoURL} alt='profile-icon' />
                                }
                            </div>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li className='hover:text-purple-500 hover:bordered'><Link to=''>Profile</Link></li>
                            {
                                !user && <>
                                    <li className='hover:text-purple-500 hover:bordered'><Link to='/login'>Login</Link></li>
                                    <li className='hover:text-purple-500 hover:bordered'><Link to='/signup'>SignUp</Link></li>
                                </>
                            }
                            {
                                user && <li className='hover:text-purple-500 hover:bordered'><button onClick={logout}>Logout</button></li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Navbar;