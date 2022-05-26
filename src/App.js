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
import AddReview from './components/pages/AddReview/AddReview';
import MyProfile from './components/pages/MyProfile/MyProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './components/shared/RequireAuth/RequireAuth';
import MyOrders from './components/pages/MyOrders/MyOrders';
import ManageOrders from './components/pages/admin/ManageOrders/ManageOrders';
import AddProduct from './components/pages/admin/AddProduct/AddProduct';
import MakeAdmin from './components/pages/admin/MakeAdmin/MakeAdmin';
import ManageProducts from './components/pages/admin/ManageProducts/ManageProducts';
import Tools from './components/pages/Tools/Tools';
import Purchase from './components/pages/Purchase/Purchase';
import RequireAdmin from './components/pages/RequireAdmin/RequireAdmin';
import AddBlog from './components/pages/admin/AddBlog/AddBlog';
import Payment from './components/pages/Payment/Payment';
import MyPortfolio from './components/pages/MyPortfolio/MyPortfolio';

function App() {
  return (
    <section>
      <div className='lg:mx-20'>
        <Navbar></Navbar>
      </div>
      <div>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/home' element={<Home></Home>}></Route>
          <Route path='/dashboard' element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }>
            <Route index element={<MyProfile></MyProfile>}></Route>
            <Route path='myOrders' element={<MyOrders></MyOrders>}></Route>
            <Route path='addReview' element={<AddReview></AddReview>}></Route>
            <Route path='manageOrders' element={
              <RequireAdmin>
                <ManageOrders></ManageOrders>
              </RequireAdmin>
            }></Route>
            <Route path='addProduct' element={
              <RequireAdmin>
                <AddProduct></AddProduct>
              </RequireAdmin>
            }></Route>
            <Route path='addBlog' element={
              <RequireAdmin>
                <AddBlog></AddBlog>
              </RequireAdmin>
            }></Route>
            <Route path='makeAdmin' element={
              <RequireAdmin>
                <MakeAdmin></MakeAdmin>
              </RequireAdmin>
            }></Route>
            <Route path='manageProducts' element={
              <RequireAdmin>
                <ManageProducts></ManageProducts>
              </RequireAdmin>
            }></Route>
          </Route>
          <Route path='/tools' element={<Tools></Tools>}></Route>
          <Route path='/purchase/:id' element={
            <RequireAuth>
              <Purchase></Purchase>
            </RequireAuth>
          }></Route>
          <Route path='/payment/:id' element={
            <RequireAuth>
              <Payment></Payment>
            </RequireAuth>
          }></Route>
          <Route path='/blog' element={<Blog></Blog>}></Route>
          <Route path='/reviews' element={<Reviews></Reviews>}></Route>
          <Route path='/myPortfolio' element={<MyPortfolio></MyPortfolio>}></Route>
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
