import React from 'react';
import profilePic from '../../../images/mypic/profilePic.jpg';
import assignment_9 from '../../../images/project-ss/assignment-9-home-dashboard.png';
import assignment_10 from '../../../images/project-ss/assignment-10.png';
import assignment_11 from '../../../images/project-ss/assignment-11.png';

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
            <div className='mt-10 ml-2 md:ml-10'>
                <h3 className='text-2xl text-blue-500 font-bold text-start'><i>Technologies i've learned as a web developer</i> - </h3>
                <ul className='list-disc ml-5 md:ml-10 mt-3 text-lg font-semibold text-rose-600 uppercase grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1'>
                    <li>Expressjs</li>
                    <li>Mongodb</li>
                    <li>Javascript</li>
                    <li>React</li>
                    <li>React Router</li>
                    <li>Nodejs</li>
                    <li>Firebase</li>
                    <li>Bootstrap</li>
                    <li>Tailwind</li>
                </ul>
                <p className='my-5 mx-10 text-lg font-semibold text-gray-400'><i>I'm hungry to Learn. This is a short list of technologies i've learned till now. I'm still learning and exploring new technologies. As a web developer i always try to stay updated.</i></p>
            </div>
            <div className='mt-10 ml-2 md:ml-10'>
                <h2 className='text-2xl text-blue-500 font-bold mb-6 text-start'><i>Some of my project details are below</i> - </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    <div class="card w-96 glass mt-5">
                        <figure><img className='h-48' src={assignment_9} alt="car!" /></figure>
                        <div class="card-body">
                            <h2 class="card-title">Project Name: <span className='text-orange-500'>Sports World</span></h2>
                            <p><span className='font-bold'>Description:</span> In this website you can see our business details chart in Dashboard. You can check our customer reviews. For getting more information about our products you can check out our Blog page. If you want our contact information check About page.</p>
                            <div class="card-actions justify-end">
                                <a href='https://m-55-product-analysis-website-shahriarkasem.netlify.app/' target='_blank' class="btn btn-primary">Explore</a>
                            </div>
                        </div>
                    </div>
                    <div class="card w-96 glass mt-5">
                        <figure><img className='h-48' src={assignment_10} alt="car!" /></figure>
                        <div class="card-body">
                            <h2 class="card-title">Project Name: <span className='text-orange-500'>Royels Therapy</span></h2>
                            <p><span className='font-bold'>Description:</span> In this website you can take my appointment for your desired therapy. This website has some amazing features. Some key features used in this website are react, react router, firebase and many more. You can get access to our services by login into the website. I always try to customize my services according to my patient needs. If you have any suggestions please feel free to inform us.</p>
                            <div class="card-actions justify-end">
                                <a href='https://independent-service-prov-b402c.web.app/' target='_blank' class="btn btn-primary">Explore</a>
                            </div>
                        </div>
                    </div>
                    <div class="card w-96 glass mt-5">
                        <figure><img className='h-48' src={assignment_11} alt="car!" /></figure>
                        <div class="card-body">
                            <h2 class="card-title">Project Name: <span className='text-orange-500'>BBL WAREHOUSE</span></h2>
                            <p><span className='font-bold'>Description:</span> In this website you can add item on warehouse and after delivery you can reduce item quantity easily. If you want you can also add item quantity. You can add new items from 'Add new item' page. You can manage inventory items from 'Manage inventory' page. You can also see your added items list on 'My items' page. You can give and see our customer feedbacks on 'Customer feedback' page. You can also read and write blogs from 'Blog' page.</p>
                            <div class="card-actions justify-end">
                                <a href='https://warehouse-management-4ec03.web.app/' target='_blank' class="btn btn-primary">Explore</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyPortfolio;