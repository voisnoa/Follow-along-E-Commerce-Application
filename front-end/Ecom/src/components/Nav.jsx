import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="bg-blue-500 shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* E-Commerce Site Name */}
        <h1 className="text-white text-2xl font-bold">E-Commerce</h1>

        {/* Navigation Links */}
        <ul className="flex gap-8">
          <li>
            <Link to="/" className="text-white text-lg hover:text-gray-200">
              My Products
            </Link>
          </li>
          <li>
            <Link to="/productForm" className="text-white text-lg hover:text-gray-200">
              Add Product
            </Link>
          </li>
          <li>
            <Link to="/cart" className="text-white text-lg hover:text-gray-200">
              Cart
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-white text-lg hover:text-gray-200">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/order" className="text-white text-lg hover:text-gray-200">
              My Orders
            </Link>
          </li>
        </ul>

        {/* Login & Signup Buttons */}
        <div className="flex gap-4">
          <Link to="/login" className="bg-white text-blue-500 px-4 py-2 rounded-lg text-lg font-semibold hover:bg-gray-100">
            Login
          </Link>
          <Link to="/signup" className="bg-white text-blue-500 px-4 py-2 rounded-lg text-lg font-semibold hover:bg-gray-100">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
