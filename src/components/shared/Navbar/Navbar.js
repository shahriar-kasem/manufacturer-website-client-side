import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const menu = <>
        <li className='hover:text-purple-500 hover:bordered'><Link to='/home'>Home</Link></li>
        <li className='hover:text-purple-500 hover:bordered'><Link to='/dashboard'>Dashboard</Link></li>
        <li className='hover:text-purple-500 hover:bordered'><Link to='/blog'>Blog</Link></li>
        <li className='hover:text-purple-500 hover:bordered'><Link to='/reviews'>Reviews</Link></li>
        <li className='hover:text-purple-500 hover:bordered'><Link to='/login'>Login</Link></li>
        <li className='hover:text-purple-500 hover:bordered'><Link to=''></Link></li>
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
                                <img src="https://api.lorem.space/image/face?hash=33791" />
                            </div>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                           <li className='hover:text-purple-500 hover:bordered'><Link to=''>Profile</Link></li>
                           <li className='hover:text-purple-500 hover:bordered'><Link to=''>Login</Link></li>
                           <li className='hover:text-purple-500 hover:bordered'><Link to=''>SignUp</Link></li>
                           <li className='hover:text-purple-500 hover:bordered'><button>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Navbar;