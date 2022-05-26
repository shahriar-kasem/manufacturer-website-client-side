import React from 'react';
import profilePic from '../../../images/mypic/profilePic.jpg';

const MyPortfolio = () => {
    return (
        <section>
            <h1 className='text-3xl text-center font-bold text-blue-500 mt-3 mb-5'><i>Welcome to my portfolio</i></h1>
            <div>
                <div>
                    <div class="hero min-h-screen bg-beach-background">
                        <div class="hero-content flex-col lg:flex-row">
                            <img className='rounded-lg lg:mr-10' src={profilePic} alt='' />
                            <div>
                                <h1 class="text-5xl font-bold">Name: Shahriar Kasem</h1>
                                <p class="py-6 text-lg font-semibold">Email: shahriarkasem@gmail.com</p>
                               <div>
                                   <h4 className='text-center text-xl font-bold my-3'><i>Educational Qualification</i></h4>
                               <div class="overflow-x-auto">
                                    <table class="table w-10/12 md:w-full mx-auto">
                                        <thead>
                                            <tr>
                                                <th className='text-center'>Qualification</th>
                                                <th className='text-center'><span className='hidden md:block'>Subject</span></th>
                                                <th className='hidden md:block text-center'>Name of the Institution</th>
                                                <th className='text-center'><span>Year of passing</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th className='text-center'>Honours</th>
                                                <th className='text-center'><span className='hidden md:block'>Management</span></th>
                                                <td className='hidden md:block text-center'>Brindaban Govt. College, Habiganj</td>
                                                <td className='text-center'><span>Studying</span></td>
                                            </tr>
                                            <tr>
                                                <th className='text-center'>HSC</th>
                                                <th className='text-center'><span className='hidden md:block'>Science</span></th>
                                                <td className='hidden md:block text-center'>Chunarughat Govt. College, Chunarughat</td>
                                                <td className='text-center'><span>2019</span></td>
                                            </tr>
                                            <tr>
                                                <th className='text-center'>SSC</th>
                                                <th className='text-center'><span className='hidden md:block'>Science</span></th>
                                                <td className='hidden md:block text-center'>D.C.P High School, Chunarughat</td>
                                                <td className='text-center'><span>2017</span></td>
                                            </tr>                                           
                                        </tbody>
                                    </table>
                                </div>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyPortfolio;