import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/checkoutPage.css"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
const CheckoutPage = () => {
  const { cart, setCart,resetCart } = useContext(AuthContext); 
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.count,
    0
  ).toFixed(2);
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

  const handleCheckoutLogs = async () => {
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
    const dataToPost = {
      fullName: shippingDetails.fullName,
      address: shippingDetails.address,
      city: shippingDetails.city,
      postalCode: shippingDetails.postalCode,
      phone: shippingDetails.phone,
      totalPrice: cart.reduce(
        (total, item) => total + item.product.price * item.count,
        0
      ),
      products: cart.map((item) => ({
        imageURL: item.product.imageURL,
        title: item.product.title,
        price: item.product.price,
        count: item.count,
      })),
    };

    try {
      setLoading(true);
      setSuccess(null);
      setError(null);

      const response = await fetch("http://localhost:9002/api/Logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToPost),
      });

      if (!response.ok) {
        throw new Error("Failed to post checkout data");
      }

      const result = await response.json();
      console.log("Checkout successful! Your order has been logged.")
      resetCart()
      toast.success("Checkout successful! Your order has been logged.")
      navigate("/")
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.count, 0).toFixed(2);
  };
  const handleCheckout = () => {
    

    
    alert("Order placed successfully!");
    resetCart(); 
    navigate("/");
  };

  return (
    <div className="checkout-wrapper max-w-4xl mx-auto p-6">
  <h1 className="checkout-heading text-2xl font-bold text-center mb-6">Checkout</h1>

  <div className="checkout-content-container" >
    <div className="cart-summary" style={{display:"flex",flexDirection:"row",flexWrap:"wrap",gap:"20px",marginTop:"20px",marginBottom: "0%"}}>
      <h2 className="section-title text-2xl font-semibold border-b pb-2"  style={{margin:"50px"}}>Order Summary</h2>
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <div
            key={index}
            className="checkout-card shadow-lg rounded-lg overflow-hidden mb-6 flex"
            style={{
              height: "150px",
              maxWidth: "400px",
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              display: "flex",
              flexDirection:"row"
            }}
          >
            <div
              className="checkout-image-wrapper"
              style={{
                width: "150px",
                height: "150px",
                backgroundColor: "#f3f4f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={item.product.imageURL}
                alt={item.product.title}
                className="checkout-image"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>

            <div className="checkout-info flex-1 p-4" style={{ display: "flex", flexDirection: "column" }}>
              <div className="checkout-title text-lg font-bold mb-2">{item.product.title}</div>
              <div
                className="item-price text-gray-500 text-sm mb-4"
                style={{ fontSize: "15px" }}
              >
                ${item.product.price.toFixed(2)} × {item.count}
              </div>
              <div
                className="total-price text-gray-800 font-semibold mt-auto"
                style={{
                  fontSize: "18px",
                  color: "#111827",
                  marginTop: "auto",
                }}
              >
                Total: ${(item.product.price * item.count).toFixed(2)}
              </div>
             
            </div>
          </div>
        ))
      ) : (
        <p className="empty-cart-message text-gray-500 mt-4">Your cart is empty.</p>
      )}
    </div>
      <h1> Total Price : {totalPrice} TND</h1>
    <div className="shipping-info-form" style={{marginTop:"10%"}}>
      <h2 className="section-title text-xl font-semibold border-b pb-2">Shipping Details</h2>
      <form className="form-space mt-4">
        <div>
          <label className="label font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={shippingDetails.fullName}
            onChange={handleInputChange}
            className="input-field w-full p-3 border border-gray-200 rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="label font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={shippingDetails.address}
            onChange={handleInputChange}
            className="input-field w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="input-group grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={shippingDetails.city}
              onChange={handleInputChange}
              className="input-field w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="label font-medium text-gray-700">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={shippingDetails.postalCode}
              onChange={handleInputChange}
              className="input-field w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
        </div>
        <div>
          <label className="label font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={shippingDetails.phone}
            onChange={handleInputChange}
            className="input-field w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>
      </form>
    </div>
  </div>

  <div className="checkout-button-container text-center mt-6">
    <button
      onClick={handleCheckoutLogs}
      className="checkout-button bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition duration-200"
    >
      Place Order
    </button>
  </div>
</div>

);
};

export default CheckoutPage;
