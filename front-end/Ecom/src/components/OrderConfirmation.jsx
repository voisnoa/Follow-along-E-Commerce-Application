

import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [error, setError] = useState(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userEmail = searchParams.get("userEmail");
  const addressParam = searchParams.get("address");

  useEffect(() => {
    if (!userEmail || !addressParam) {
      setError("User email or address not found. Please go back and try again.");
      return;
    }
    fetchCartAndAddress();
  }, [userEmail, addressParam]);

  const fetchCartAndAddress = async () => {
    try {
      console.log("Fetching cart and address for userEmail:", userEmail);
      const cartResponse = await fetch(
        `http://localhost:8080/getCart?userEmail=${encodeURIComponent(userEmail)}`
      );
      if (!cartResponse.ok) {
        throw new Error(`HTTP error! Status: ${cartResponse.status}`);
      }
      const cartData = await cartResponse.json();
      console.log("Cart Data:", cartData);
      setCartItems(cartData.cart || []);
      const total = (cartData.cart || []).reduce(
        (sum, item) => sum + (item.productId.price * item.quantity),
        0
      );
      setSubtotal(total);

      const decodedAddress = JSON.parse(decodeURIComponent(addressParam));
      setSelectedAddress(decodedAddress);
    } catch (error) {
      console.error("Error fetching cart or address:", error);
      setError("An error occurred while loading order details. Please try again later.");
    }
  };

  const handlePlaceOrder = async () => {
    if (!userEmail || !cartItems.length || !selectedAddress) {
      setError("Missing order details. Please check your cart and address.");
      return;
    }

    // Validate cart items
    const validCartItems = cartItems.every(item => 
      item.productId && item.productId._id && item.quantity && item.productId.price
    );
    if (!validCartItems) {
      setError("Invalid cart items. Please review your cart.");
      return;
    }

    // Validate subtotal
    if (!subtotal || subtotal <= 0) {
      setError("Invalid total price. Please review your cart.");
      return;
    }

    // Validate address
    if (!selectedAddress.street || !selectedAddress.city || !selectedAddress.zipCode || !selectedAddress.country) {
      setError("Invalid address. Please select a valid delivery address.");
      return;
    }

    try {
      console.log("Navigating to payment options with data:", {
        userEmail,
        cartItems,
        subtotal,
        selectedAddress,
      });

      // Navigate to payment options page with order details as state
      navigate("/payment-options", {
        state: {
          userEmail,
          cartItems,
          subtotal,
          selectedAddress,
        },
      });
    } catch (error) {
      console.error("Error preparing payment options:", error);
      setError(`Failed to proceed to payment. Please try again later. Details: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-700 ease-in-out hover:shadow-3xl">
        <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-8">Order Confirmation</h1>

        {error ? (
          <div className="bg-red-50 rounded-xl p-6 text-center border border-red-200">
            <p className="text-red-700 text-xl font-medium">{error}</p>
            <button
              onClick={fetchCartAndAddress}
              className="mt-4 bg-red-600 text-white px-5 py-3 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
            >
              Retry
            </button>
          </div>
        ) : isOrderPlaced ? (
          <div className="text-center">
            <p className="text-2xl font-semibold text-green-600 mb-4">Order Placed Successfully!</p>
            <p className="text-gray-600">You’ll be redirected to the homepage in <span className="text-blue-600 font-bold">5 seconds</span>...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Products Section */}
            <div className="mb-6">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">Order Items</h2>
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="p-6 bg-gray-50 rounded-xl shadow-md border border-gray-100 hover:bg-gray-100 transition-all duration-500 transform hover:scale-105"
                    >
                      <p className="text-gray-800 font-medium">
                        <strong>Product:</strong> {item.productId.name || `Product ${index + 1}`}
                      </p>
                      <p className="text-gray-700">Quantity: {item.quantity}</p>
                      <p className="text-gray-700">Price: ${item.productId.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-lg">No items in cart.</p>
              )}
            </div>

            {/* Address Section */}
            <div className="mb-6">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">Delivery Address</h2>
              {selectedAddress ? (
                <div className="p-6 bg-gray-50 rounded-xl shadow-md border border-gray-100 hover:bg-gray-100 transition-all duration-500 transform hover:scale-105">
                  <p className="text-gray-800 font-medium">
                    <strong>{selectedAddress.addressType} Address:</strong>
                  </p>
                  <p className="text-gray-700">{selectedAddress.street}</p>
                  <p className="text-gray-700">{selectedAddress.state || ""}</p>
                  <p className="text-gray-700">
                    {selectedAddress.city}, {selectedAddress.country}, {selectedAddress.zipCode}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 text-lg">No address selected.</p>
              )}
            </div>

            {/* Total Section */}
            <div className="mb-6">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">Total</h2>
              <p className="text-gray-800 text-2xl font-bold">Subtotal: ${subtotal.toFixed(2)}</p>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-500 transform hover:scale-105"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmation;