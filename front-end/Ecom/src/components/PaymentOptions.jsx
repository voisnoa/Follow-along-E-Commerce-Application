import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaymentOptions = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [error, setError] = useState(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  const { userEmail, cartItems, subtotal, selectedAddress } = state || {};

  useEffect(() => {
    if (!userEmail || !cartItems || !subtotal || !selectedAddress) {
      setError("Missing order details. Please go back and try again.");
    }
  }, [userEmail, cartItems, subtotal, selectedAddress]);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const placeOrder = async () => {
    try {
      const userResponse = await fetch(
        `http://localhost:8080/getUserByEmail?userEmail=${encodeURIComponent(userEmail)}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      const userData = await userResponse.json();
      const userId = userData._id;

      if (!userResponse.ok) throw new Error(userData.error || "Failed to fetch user data");

      const orderResponse = await fetch(
        `http://localhost:8080/api/v1/orders/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            products: cartItems.map(item => ({
              productId: item.productId._id,
              quantity: item.quantity,
              price: item.productId.price,
            })),
            totalPrice: subtotal,
            address: selectedAddress,
          }),
        }
      );

      const orderData = await orderResponse.json();
      if (orderResponse.ok) {
        console.log("Order placed successfully:", orderData);
        setIsOrderPlaced(true);
        setTimeout(() => navigate("/order-success"), 5000);
      } else throw new Error(orderData.error || "Failed to place order");
    } catch (error) {
      console.error("Error placing order:", error);
      setError(`Failed to place order. Please try again. Details: ${error.message}`);
    }
  };

  const handlePaypalOrderCreate = (data, actions) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: (subtotal / 100).toFixed(2), // Convert to dollars if in cents
          },
          description: "Order from E-commerce App",
        },
      ],
    }).then((orderId) => {
      console.log("PayPal Order ID:", orderId);
      return orderId;
    });
  };

  const handlePaypalOrderApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      console.log("PayPal Payment Successful:", details);
      await placeOrder();
    } catch (error) {
      console.error("PayPal Payment Error:", error);
      setError("Payment failed. Please try again.");
    }
  };

  const handlePaypalOrderError = (err) => {
    console.error("PayPal Error:", err);
    setError("An error occurred during payment. Please try again.");
  };

  const handleCODOrder = () => {
    placeOrder();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-700 ease-in-out hover:shadow-3xl">
        <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-8">Payment Options</h1>

        {error ? (
          <div className="bg-red-50 rounded-xl p-6 text-center border border-red-200">
            <p className="text-red-700 text-xl font-medium">{error}</p>
            <button
              onClick={() => navigate("/order-confirmation", { state })}
              className="mt-4 bg-red-600 text-white px-5 py-3 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
            >
              Go Back
            </button>
          </div>
        ) : isOrderPlaced ? (
          <div className="text-center">
            <p className="text-2xl font-semibold text-green-600 mb-4">Order Placed Successfully!</p>
            <p className="text-gray-600">You’ll be redirected to the success page in <span className="text-blue-600 font-bold">5 seconds</span>...</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">Order Summary</h2>
              <p className="text-gray-800 text-lg font-medium">Total: ${subtotal?.toFixed(2)}</p>
              <p className="text-gray-600">Items: {cartItems?.length}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">Select Payment Method</h2>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={handlePaymentMethodChange}
                    className="form-radio text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium">Cash on Delivery (COD)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Online"
                    checked={paymentMethod === "Online"}
                    onChange={handlePaymentMethodChange}
                    className="form-radio text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium">Online Payment</span>
                </label>
              </div>
            </div>

            {paymentMethod === "COD" ? (
              <button
                onClick={handleCODOrder}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-500 transform hover:scale-105"
              >
                Confirm COD Order
              </button>
            ) : (
              <PayPalScriptProvider
                options={{
                  "client-id": "AYgCcE177bA4VhlXkOuQ_dnK_ly56txoDp1yuaSgoc_b2n9Jy4i3d3ueWc2-n0e4KbJUMxdvQxeymM0K", 
                  currency: "USD",
                }}
              >
                <PayPalButtons
                  createOrder={handlePaypalOrderCreate}
                  onApprove={handlePaypalOrderApprove}
                  onError={handlePaypalOrderError}
                  style={{ layout: "vertical" }}
                />
              </PayPalScriptProvider>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentOptions;