import React, { useState } from 'react';
import '../styles/Dashboard.css';


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('addItem'); // State to track the active sidebar tab

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // Function to render the main content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'addItem':
        return <div className="content">Hello Add Item</div>;
      case 'listProducts':
        return <div className="content">Hello List of Products</div>;
      case 'orders':
        return <div className="content">Hello Orders</div>;
      case 'users':
        return <div className="content">Hello Users</div>;
      default:
        return <div className="content">Welcome to the Admin Dashboard</div>;
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <button className="toggle-btn" onClick={toggleSidebar}>
      {isSidebarOpen ? '✖' : '☰'}
      </button>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <h2>Admin Dashboard</h2>
        <ul>
          <li
            className={activeTab === 'addItem' ? 'active' : ''}
            onClick={() => setActiveTab('addItem')}
          >
            Add Item
          </li>
          <li
            className={activeTab === 'listProducts' ? 'active' : ''}
            onClick={() => setActiveTab('listProducts')}
          >
            List of Products
          </li>
          <li
            className={activeTab === 'orders' ? 'active' : ''}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </li>
          <li
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            Users
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
