import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";// Replace with your actual CartContext path

const CheckoutPage = () => {
  const { cart, setCart } = useContext(AuthContext); // Access cart context
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.count, 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (
      !shippingDetails.fullName ||
      !shippingDetails.address ||
      !shippingDetails.city ||
      !shippingDetails.postalCode ||
      !shippingDetails.phone
    ) {
      alert("Please fill out all shipping details.");
      return;
    }

    // Process checkout
    alert("Order placed successfully!");
    setCart([]); // Clear the cart after successful checkout
  };

  return (
    <div className="max-w-4xl mx-auto p-6" >
      <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>

      {/* Cart Items */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold border-b pb-2">Order Summary</h2>
        {cart.length > 0 ? (
          <div>
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-4 border-b"
              >
                <div className="flex items-center">
                  <img
                    src={item.product.imageURL}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <div className="font-medium text-gray-800">{item.product.title}</div>
                    <div className="text-sm text-gray-500">
                      ${item.product.price.toFixed(2)} × {item.count}
                    </div>
                  </div>
                </div>
                <div className="font-semibold text-gray-800">
                  ${(item.product.price* item.count).toFixed(2)}
                </div>
              </div>
            ))}
            <div className="text-right mt-4 text-lg font-bold">
              Total: ${calculateTotal()}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mt-4">Your cart is empty.</p>
        )}
      </div>

      {/* Shipping Details Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold border-b pb-2">Shipping Details</h2>
        <form className="space-y-4 mt-4">
          <div>
            <label className="block font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={shippingDetails.fullName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={shippingDetails.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={shippingDetails.city}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={shippingDetails.postalCode}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={shippingDetails.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
        </form>
      </div>

      {/* Checkout Button */}
      <div className="text-center">
        <button
          onClick={handleCheckout}
          className="bg-black text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-gray-800 transition duration-200"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
