import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ProductForm from "./components/ProductForm";
import EditProduct from "./components/EditProduct";
import Nav from "./components/Nav";
import Profile from "./components/Profile";
// import Address from "./components/AddressForm";
import Order from "./components/MyOrders";

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
        {/* <Route path="/profile/adressform" element={<Address />}/> */}
        <Route path="/order" element={<Order/>}/>
      </Routes>   
    </BrowserRouter>
    </>
  );
}

export default App;