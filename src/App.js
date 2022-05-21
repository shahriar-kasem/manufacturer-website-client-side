import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Login from './components/shared/Login/Login';
import SignUp from './components/shared/SignUp/SignUp';
import NotFound from './components/shared/NotFound/NotFound';
import Blog from './components/pages/Blog/Blog';
import Navbar from './components/shared/Navbar/Navbar';

function App() {
  return (
    <section className='lg:w-10/12 mg:w-11/12 mx-auto'>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/blog' element={<Blog></Blog>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
    </section>
  );
}

export default App;
