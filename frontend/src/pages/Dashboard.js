import React, { useState } from 'react';
import '../styles/Dashboard.css';
import logoHedyaRemovebgWhite from '../assets/logoHedyaRemovebgWhite.png'
import AddItem from '../components/AddItem';


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('addItem'); // State to track the active sidebar tab

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // Function to render the main content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'addItem':
        return (
          <>
          <div className={`content ${isSidebarOpen ? 'open' : ''}`}>Add Product</div>
          <AddItem/>
          </>
        );
      case 'listProducts':
        return <div className={`content ${isSidebarOpen ? 'open' : ''}`}> List of Products</div>;
      case 'orders':
        return <div className={`content ${isSidebarOpen ? 'open' : ''}`}> Orders</div>;
      case 'users':
        return <div className={`content ${isSidebarOpen ? 'open' : ''}`}> Users</div>;
      default:
        return <div className={`content ${isSidebarOpen ? 'open' : ''}`}>Welcome to the Admin Dashboard</div>;
    }
  };

  return (
    <div className={`dashboard ${isSidebarOpen ? 'open' : ''}`}>
      {/* Sidebar */}
      <button className={`toggle-btn ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
      {isSidebarOpen ? '✖' : '☰'}
      </button>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} >
        <div className={`header ${isSidebarOpen ? 'open' : ''}`} >
          <img src={logoHedyaRemovebgWhite} alt='logo' style={{width: "80px",height: "80px",objectFit: "cover", borderRadius: "4px"}}/>
          <h2 style={{ marginTop:"50px" }}> Dashboard</h2>
        </div>
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
