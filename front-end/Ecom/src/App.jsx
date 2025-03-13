import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ProductForm from "./components/ProductForm";
import EditProduct from "./components/EditProduct";
import Nav from "./components/Nav";
import Profile from "./components/Profile";
import Order from "./components/MyOrders";
import SelectAddress from "./components/AddressForm";
import OrderConfirmation from "./components/OrderConfirmation";
import PaymentOptions from "./components/PaymentOptions";
import OrderSuccess from "./components/OrderSuccess";

function App() {
  return (
    <>
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/productForm" element={<ProductForm />}/>
        <Route path="/editproductForm/:id" element={<EditProduct />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/order" element={<Order/>}/>
        <Route path="/select-address" element={<SelectAddress/>}/>
        <Route path="/order-confirmation" element={<OrderConfirmation />}/>
        <Route path="/payment-options" element={<PaymentOptions />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/my-orders" element={<Order/>} />
      </Routes>   
    </BrowserRouter>
    </>
  );
}

export default App;