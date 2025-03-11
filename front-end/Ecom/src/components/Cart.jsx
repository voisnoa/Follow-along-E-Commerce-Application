import { useState, useEffect } from "react";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        console.error("No userEmail found in localStorage");
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:7878/getCart?userEmail=${userEmail}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setCartItems(data.cart || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const res = await fetch("http://localhost:7878/updateCart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: localStorage.getItem("userEmail"), productId, quantity: newQuantity }),
      });

      if (!res.ok) {
        throw new Error("Failed to update quantity");
      }

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch("http://localhost:7878/removeFromCart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: localStorage.getItem("userEmail"), productId }),
      });

      if (!res.ok) {
        throw new Error("Failed to remove item");
      }

      setCartItems((prevItems) => prevItems.filter((item) => item.productId._id !== productId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="mt-24 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cartItems.length > 0 ? (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.productId._id} className="border-b pb-2 flex items-center justify-between">
              <span className="font-semibold">{item.productId.name}</span>
              <div className="flex items-center">
                <button onClick={() => updateQuantity(item.productId._id, item.quantity - 1)} className="px-2 py-1 bg-gray-300 rounded">-</button>
                <span className="mx-2">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.productId._id, item.quantity + 1)} className="px-2 py-1 bg-gray-300 rounded">+</button>
                <button onClick={() => removeFromCart(item.productId._id)} className="ml-4 px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Cart is empty</p>
      )}
    </div>
  );
}

export default CartPage;