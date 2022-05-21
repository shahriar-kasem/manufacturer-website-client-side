import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Login from './components/shared/Login/Login';
import SignUp from './components/shared/SignUp/SignUp';
import NotFound from './components/shared/NotFound/NotFound';
import Blog from './components/pages/Blog/Blog';

function App() {
  return (
    <section>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
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
