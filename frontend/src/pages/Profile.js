import React, { useContext, useState,useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import NavBar from '../components/NavBar';
import '../styles/Profile.css';
import axios from "axios";
const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [productDetails, setProductDetails] = useState([]);
  const userdata = JSON.parse(localStorage.getItem("user"));
  console.log(userdata)
  const [favorites, setFavorites] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    userName: userdata?.userName || '',
    email: userdata?.email || '',
    age: userdata?.age || '',
    currentpassword: '',
    password: '',
    confirmPassword: '',
  });
  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get("http://localhost:9002/api/products", {
        params: { productId }, 
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching product:", err);
      return null;
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    const fetchAllProductDetails = async () => {
      if (favorites.length > 0) {
        try {
          
          const productRequests = favorites.map((productId) =>
            fetchProductDetails(productId) 
          );

          // Wait for all the product details to be fetched
          const products = await Promise.all(productRequests);

          // Filter out null results in case of failed product fetch
          setProductDetails(products.filter((product) => product !== null));
        } catch (err) {
          setError("Error fetching product details.");
        }
      }
    };

    fetchAllProductDetails();
  }, [favorites]);
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!userdata?._id) return; 
  
        const response = await axios.get("http://localhost:9002/api/Profile", {
          headers: { "Content-Type": "application/json" },
          params: { userId: userdata._id }, 
        });
  
        setFavorites(response.data); 
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
  
    fetchFavorites();
  }, [userdata?._id]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    // Check if the current password matches the user's stored password
    if (formData.currentpassword !== userdata.password && isPasswordEditing) {
      alert("Current password is incorrect.");
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const updatedData = { ...formData };
    delete updatedData.confirmPassword; // Remove confirmPassword field

    // Remove password if it's empty
    if (!formData.password) {
      delete updatedData.password;
    }

    // Ensure the current password is provided if editing password
    if (isPasswordEditing && !formData.currentpassword) {
      alert("Current password is required.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:9002/api/users/${userdata._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to update user.");
      }

      // After successful profile update, update user data in the context
      updateUser(updatedData);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <NavBar />
      <div className="profile-container">
        {userdata ? (
          <div>
            <h2 className="profile-header">Update Profile</h2>
            {isEditing ? (
              <>
                <div className="profile-info">
                  <label>Name</label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </div>
                <div className="profile-info">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="profile-info">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>

                {isPasswordEditing && (
                  <>
                    <div className="profile-info">
                      <label>Current Password</label>
                      <input
                        type="password"
                        name="currentpassword"
                        value={formData.currentpassword}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="profile-info">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="profile-info">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}

                <div className="profile-buttons">
                  <button onClick={() => setIsPasswordEditing(!isPasswordEditing)}>
                    {isPasswordEditing ? "Cancel Password Change" : "Change Password"}
                  </button>
                  <button onClick={handleSave}>Save Changes</button>
                </div>
              </>
            ) : (
              <>
                <div className="profile-info">
                  <strong>Name</strong>
                  <p>{userdata.userName}</p>
                </div>
                <div className="profile-info">
                  <strong>Email</strong>
                  <p>{userdata.email}</p>
                </div>
                <div className="profile-info">
                  <strong>Age</strong>
                  <p>{userdata.age || 'N/A'}</p>
                </div>
                <div className="profile-buttons">
                  <button onClick={() => setIsEditing(true)}>Edit</button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div><h1 style={{fontSize:"20px"}}>favorites</h1>
      <h2>Your Favorites:</h2>
      <ul className="product-list">
      {productDetails.length > 0 ? (
    productDetails.map((product) => (
      <li key={product._id} className="product-card">
        <img className="product-image" src={product.imageURL} alt={product.title} />
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">Price: ${product.price}</p>
        {/* Optional: Add an 'Add to Cart' or similar action button */}
        <button className="add-to-cart-btn">Add to Cart</button>
      </li>
    ))
  ) : (
    <p>No products found in favorites.</p>
  )}
</ul>
      </div>
    </>
  );
};

export default Profile;
