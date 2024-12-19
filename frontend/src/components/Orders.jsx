import React, { useEffect, useState } from "react";

import "../styles/Dashboard/Products.css";
import checkout from "../assets/checkout.png";
import money from "../assets/money.png";
import axios from "axios";

function Orders({ isSidebarOpen }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:9002/api/logs");
        const fetchedOrders = Array.isArray(response.data.logs)
          ? response.data.logs
          : [];
        console.log(fetchedOrders);

        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (order) => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to delete "${order._id}"?`
      );
      if (!confirmed) return;

      console.log("Deleting order:", order._id);

      const response = await axios.delete(
        `http://localhost:9002/api/logs/${order._id}`
      );

      console.log(response.data.msg);

      setOrders((prevOrders) => prevOrders.filter((p) => p._id !== order._id));
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete the order. Please try again.");
    }
  };

  const totalSum = orders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0
  );

  return (
    <>
      <span className="span-da">
        <div class={`card-da ${isSidebarOpen ? "open" : ""}`}>
          <div class="card-content">
            <div class="card-number">{orders.length}</div>
            <div class="card-text">Total Orders</div>
          </div>
          <div class="card-icon">
            <img src={checkout} alt="icon" />
          </div>
        </div>

        <div class={`card1-da ${isSidebarOpen ? "open" : ""}`}>
          <div class="card-content">
            <div class="card-number">{totalSum} TND</div>
            <div class="card-text"> Total Orders</div>
          </div>
          <div class="card-icon">
            <img src={money} alt="icon" />
          </div>
        </div>
      </span>

      <div className={`table-container ${isSidebarOpen ? "open" : ""}`}>
        <table className={`table-da ${isSidebarOpen ? "open" : ""}`}>
          <thead>
            <tr>
              <th>USER NAME</th>
              <th>ADRESS</th>
              <th>CITY</th>
              <th>POSTAL CODE</th>
              <th>PHONE NUMBER</th>
              <th>TOTAL PRICE</th>
              <th>DATE OF CRATION</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  {" "}
                  {/* Make sure each row has a unique key */}
                  <td style={{ alignItems: "center", width: "250px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {order.fullName}
                    </div>
                  </td>
                  <td>{order.address}</td>
                  <td>{order.city}</td>
                  <td>{order.postalCode}</td>
                  <td>{order.phone}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.createdAt}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(order); // Pass the selected order to handleDelete
                      }}
                      style={{
                        padding: "6px 10px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "#dc3545",
                        color: "white",
                        cursor: "pointer",
                        boxSizing: "border-box",
                      }}
                      title="Delete Order"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7 ">No orders available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Orders;
