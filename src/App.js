import { Routes, Route } from "react-router-dom"; //version 6
import Register from './pages/auth/Register';
import ActivationEmail from "./pages/auth/ActivationEmail";
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// page (not Login)
import Home from './pages/Home';
import Product from "./pages/Product";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";

// pages admin
import HomeAdmin from "./pages/admin/HomeAdmin";
import ManageAdmin from "./pages/admin/ManageAdmin";
import CreateCategory from "./pages/admin/category/CreateCategory";
import UpdateCategory from "./pages/admin/category/UpdateCategory";

import CreateProduct from "./pages/admin/product/CreateProduct";
import UpdateProduct from "./pages/admin/product/UpdateProduct";
import ManageOrder from "./pages/admin/ManageOrder";
import CheckPayment from "./pages/admin/CheckPayment";

// pages user
import Checkout from "./pages/Checkout";
import WishList from "./pages/user/WishList"
import HomeUser from "./pages/user/HomeUser"
import History from "./pages/user/History"
import Invoices from "./pages/user/Invoices";

// service api 
import { currentUser } from "./services/authAPI";

// redux
import { useDispatch } from "react-redux";

// routes
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";

// SideDrawer
import { SideDrawer } from "./components/drawer/SideDrawer";
import { ToastContainer } from "react-toastify";



function App() {
  const dispatch = useDispatch();
  const idToken = localStorage.token;
  if (idToken) {
    currentUser(idToken)
      .then((res) => {
        // console.log(res.data);
        dispatch({
          type: "LOGIN",
          payload: {
            token: idToken,
            username: res.data.username,
            role: res.data.role,
          },
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
    <ToastContainer />
    <SideDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />


        {/* Authen */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users/activate/:activation_token" element={<ActivationEmail />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/users/reset/:reset_token" element={<ResetPassword />} />

        {/* Admin protect route => <AdminRoute> */}
        <Route path="/admin/index" element={
          <AdminRoute>
            {/* children */}
            <HomeAdmin />
          </AdminRoute>
        } />

        <Route path="/admin/manage" element={
          <AdminRoute>
            {/* children */}
            <ManageAdmin />
          </AdminRoute>
        } />

        <Route path="/admin/create-category" element={
          <AdminRoute>
            {/* children */}
            <CreateCategory />
          </AdminRoute>
        } />

        <Route path="/admin/update-category/:id" element={
          <AdminRoute>
            {/* children */}
            <UpdateCategory />
          </AdminRoute>
        } />

        <Route path="/admin/create-product" element={
          <AdminRoute>
            {/* children */}
            <CreateProduct />
          </AdminRoute>
        } />

        <Route path="/admin/update-product/:id" element={
          <AdminRoute>
            {/* children */}
            <UpdateProduct />
          </AdminRoute>
        } />

        <Route path="/admin/orders" element={
          <AdminRoute>
            {/* children */}
            <ManageOrder />
          </AdminRoute>
        } />
        <Route path="/admin/check-payment" element={
          <AdminRoute>
            {/* children */}
            <CheckPayment />
          </AdminRoute>
        } />


        {/* User protect route => <UserRoute> */}
        <Route path="/user/index" element={
          <UserRoute>
            {/* children */}
            <HomeUser />
          </UserRoute>
        } />

        <Route path="/checkout" element={
          <UserRoute>
            {/* children */}
            <Checkout />
          </UserRoute>
        } />

        <Route path="/user/wishlist" element={
          <UserRoute>
            {/* children */}
            <WishList />
          </UserRoute>
        } />

        <Route path="/user/history" element={
          <UserRoute>
            {/* children */}
            <History />
          </UserRoute>
        } />

        <Route path="/user/invoices/:id" element={
          <UserRoute>
            {/* children */}
            <Invoices />
          </UserRoute>
        } />

        <Route path="/user/update-invoices/:id" element={
          <UserRoute>
            {/* children */}
            <Invoices />
          </UserRoute>
        } />
      </Routes>
    </>
  )
}

export default App;