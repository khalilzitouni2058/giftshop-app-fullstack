import React, { useState } from 'react';
import axios from 'axios';
import floflo from "../assets/floflo.jpg";
import NavBar from './NavBar';
import { redirect, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    role:'user',
    dateOfBirth:'',
    phoneNumber: '',
    
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const backendUrl = 'http://localhost:9002/api/users'; 

    try {
      console.log(formData)
      const response = await axios.post(backendUrl, formData);
      console.log('User created:', response.data);
      navigate("/SignIn")
      
    } catch (err) {
      setError('An error occurred while creating the user. Please try again.');
      console.error(err);
    }
  };

  return (
    <>
      <NavBar />
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="hero min-h-screen" style={{ width: "1000px", maxHeight: "830px", backgroundImage: `url(${floflo})` }}>
          <div className="hero-overlay bg-opacity-60">
            <h1 className='mb-5 text-5xl font-bold text-zinc-50' style={{ font: "Anton", textTransform: "uppercase", color:"white",marginTop: "230px", marginLeft: "50px", fontSize: "50px" }}> Join Us</h1>
            <h1 className='mb-5 text-5xl font-bold text-zinc-50' style={{ font: "Anton", textTransform: "uppercase", color:"white", marginLeft: "50px", fontSize: "50px" }}> unwrap the joy of giving!</h1>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "",
            width: "1000px",
            Height: "1500px",
           marginTop:"150px",
            padding: "20px",
            
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontFamily: "Anton", textTransform: "uppercase", fontSize: "30px", marginBottom: "20px", color: "#8b4513" }}>
            Welcome TO Hdeya
          </h1>

          {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>} {/* Display error message */}

          <form
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
              maxWidth: "400px",
            }}
            onSubmit={handleSubmit}
          >
            <label style={{ fontWeight: "bold", marginBottom: "8px", color: "#8b4513" }}>
              UserName
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter your userName"
              style={{
                padding: "10px",
                marginBottom: "20px",
                borderRadius: "18px",
                fontSize: "16px",
                backgroundColor: "rgb(228 228 231)"
              }}
            />
            <label style={{ fontWeight: "bold", marginBottom: "8px", color: "#8b4513" }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={{
                padding: "10px",
                marginBottom: "20px",
                borderRadius: "18px",
                border: "1px solid #ccc",
                fontSize: "16px",
                backgroundColor: "rgb(228 228 231)"
              }}
            />
            <label style={{ fontWeight: "bold", marginBottom: "8px", color: "#8b4513" }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              style={{
                padding: "10px",
                marginBottom: "20px",
                borderRadius: "18px",
                border: "1px solid #ccc",
                fontSize: "16px",
                backgroundColor: "rgb(228 228 231)"
              }}
            />
            <label style={{ fontWeight: "bold", marginBottom: "8px", color: "#8b4513" }}>
              Date of birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              style={{
                padding: "10px",
                marginBottom: "20px",
                borderRadius: "18px",
                border: "1px solid #ccc",
                fontSize: "16px",
                backgroundColor: "rgb(228 228 231)"
              }}
            />
            <label style={{ fontWeight: "bold", marginBottom: "8px", color: "#8b4513" }}>
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your Phone Number"
              style={{
                padding: "10px",
                marginBottom: "20px",
                borderRadius: "18px",
                border: "1px solid #ccc",
                fontSize: "16px",
                backgroundColor: "rgb(228 228 231)"
              }}
            />

            <button
              type="submit"
              style={{
                padding: "10px",
                backgroundColor: "#ff7f50",
                color: "rgb(228 228 231)",
                fontSize: "18px",
                fontWeight: "bold",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginTop: "30px",
                transition: "background-color 0.3s",
              }}
              
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
