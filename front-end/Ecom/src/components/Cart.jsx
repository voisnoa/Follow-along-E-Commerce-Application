import { useState, useEffect } from "react";
import {
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  X,
  PackageCheck,
  CreditCard,
  HelpCircle,
  Tag
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      const userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        console.error("User not logged in");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/getCart?userEmail=${userEmail}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        setCartItems(result.cart || []);

        // Calculate total
        const calculatedTotal = (result.cart || []).reduce(
          (total, item) => total + item.productId.price * item.quantity,
          0
        );
        setSubtotal(calculatedTotal);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch(
        "http://localhost:8080/updateCart",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: localStorage.getItem("userEmail"),
            productId,
            quantity: newQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Update failed");
      }

      // Update local state
      const updated = cartItems.map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );

      setCartItems(updated);

      // Update subtotal
      const newTotal = updated.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      );
      setSubtotal(newTotal);
    } catch (error) {
      console.error("Quantity update failed:", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch(
        "http://localhost:8080/removeFromCart",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: localStorage.getItem("userEmail"),
            productId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Remove failed");
      }

      // Update local state
      const remaining = cartItems.filter(
        (item) => item.productId._id !== productId
      );

      setCartItems(remaining);

      // Update subtotal
      const newTotal = remaining.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      );
      setSubtotal(newTotal);
    } catch (error) {
      console.error("Item removal failed:", error);
    }
  };

  const handleApplyCoupon = () => {
    // Simple coupon validation
    if (couponCode.toLowerCase() === "discount10") {
      const discountAmount = subtotal * 0.1;
      setDiscount(discountAmount);
    } else {
      alert("Invalid coupon code. Try 'DISCOUNT10'");
      setDiscount(0);
    }
  };

  const handleCheckout = () => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail && cartItems.length > 0) {
      navigate(`/select-address?userEmail=${encodeURIComponent(userEmail)}`);
    } else if (!userEmail) {
      navigate("/login?redirect=cart");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading your cart...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
            <ShoppingCart className="mr-3 text-indigo-600" />
            Your Cart
          </h1>
          <div className="text-sm text-gray-500">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-indigo-100 rounded-full flex items-center justify-center">
              <ShoppingCart size={32} className="text-indigo-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items section */}
            <div className="lg:w-2/3 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.productId._id}
                  className="bg-white rounded-xl shadow-sm p-4 relative hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Product image */}
                    <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                      {item.productId.image ? (
                        <img
                          src={item.productId.image}
                          alt={item.productId.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>

                    {/* Product details */}
                    <div className="flex-grow">
                      <div className="flex justify-between mb-2">
                        <div>
                          <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full mb-1">
                            {item.productId.category || "General"}
                          </span>
                          <h3 className="font-medium text-gray-900 text-lg">
                            {item.productId.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.productId._id)}
                          className="text-gray-400 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <div className="text-sm text-gray-500 mb-3">
                        {item.productId.color && (
                          <span className="mr-3">
                            Color: <span className="font-medium">{item.productId.color}</span>
                          </span>
                        )}
                        {item.productId.size && (
                          <span>
                            Size: <span className="font-medium">{item.productId.size}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.productId._id,
                                item.quantity - 1
                              )
                            }
                            className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600"
                          >
                            <ChevronDown size={16} />
                          </button>
                          <span className="px-4 py-1 text-center min-w-[40px]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.productId._id,
                                item.quantity + 1
                              )
                            }
                            className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600"
                          >
                            <ChevronUp size={16} />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-gray-500 text-sm">
                            ${item.productId.price?.toFixed(2)} each
                          </div>
                          <div className="font-semibold text-gray-900">
                            ${(item.productId.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Benefits section - rearranged in a vertical layout */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-6">
                <div className="divide-y divide-gray-100">
                  <div className="p-4 flex items-center">
                    <div className="bg-indigo-100 p-2 rounded-full mr-4">
                      <PackageCheck className="text-indigo-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Free Shipping</h3>
                      <p className="text-sm text-gray-500">On all orders over $50</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center">
                    <div className="bg-indigo-100 p-2 rounded-full mr-4">
                      <CreditCard className="text-indigo-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Secure Payment</h3>
                      <p className="text-sm text-gray-500">Multiple payment methods</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center">
                    <div className="bg-indigo-100 p-2 rounded-full mr-4">
                      <HelpCircle className="text-indigo-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">24/7 Support</h3>
                      <p className="text-sm text-gray-500">Chat with our team anytime</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary section */}
            <div className="lg:w-1/3 space-y-4">
              {/* Coupon code */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <Tag className="text-indigo-600 mr-2" size={20} />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Apply Discount
                  </h2>
                </div>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-grow p-3 bg-gray-50 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                    className="bg-indigo-600 text-white px-4 py-3 rounded-r-lg hover:bg-indigo-700 transition-colors"
                    onClick={handleApplyCoupon}
                  >
                    Apply
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Try "DISCOUNT10" for 10% off
                </div>
              </div>

              {/* Order summary */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{subtotal > 50 ? "Free" : "$5.00"}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-semibold text-gray-900 text-xl">
                      <span>Total</span>
                      <span>
                        $
                        {(
                          subtotal -
                          discount +
                          (subtotal > 50 ? 0 : 5)
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {subtotal > 0
                        ? "Including tax and shipping fees"
                        : "No items in cart"}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className={`w-full mt-6 py-4 rounded-lg font-medium text-white ${
                    cartItems.length === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } transition-colors duration-200`}
                >
                  {cartItems.length === 0 ? "Cart Empty" : "Proceed to Checkout"}
                </button>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => navigate("/products")}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;