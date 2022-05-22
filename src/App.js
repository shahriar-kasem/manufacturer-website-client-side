import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Login from './components/shared/Login/Login';
import SignUp from './components/shared/SignUp/SignUp';
import NotFound from './components/shared/NotFound/NotFound';
import Blog from './components/pages/Blog/Blog';
import Navbar from './components/shared/Navbar/Navbar';
import Reviews from './components/pages/Reviews/Reviews';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <section>
      <div className='lg:mx-10'>
      <Navbar></Navbar>
      </div>
      <div>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/blog' element={<Blog></Blog>}></Route>
        <Route path='/reviews' element={<Reviews></Reviews>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      </div>
      <ToastContainer />
    </section>
  );
}

export default App;
