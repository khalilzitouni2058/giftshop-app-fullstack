import React, { useState,useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import NavBar from '../components/NavBar'
import floflo from "../assets/floflo.jpg"
import { AuthContext } from '../context/AuthContext'; 

import { useNavigate } from "react-router-dom";
import axios from 'axios';
function SignIn() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); 
  const handleRedirect = () => {
    navigate("/" ,{ state: { showSuccessAlert: true } }); // 
  };
  const handleredirectSignUP = () => {
    navigate("/SignUp"); // 
  };
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
    
        // Use environment variable or fallback to localhost
        const backendUrl = 'http://localhost:9002/api/signIn'; 
    
        try {
          console.log(formData)
          const response = await axios.post(backendUrl, formData);
          console.log('User loggedIn:', response.data);
          const { token, user } = response.data;
          console.log(user)
          login(user, token);
          console.log(user.userName)
          handleRedirect()
        } catch (err) {
          setError('An error occurred while creating the user. Please try again.');
          console.error(err);
        }
      };
    
  return (
    <div>
        
       
        
        <div className="min-h-screen hero " style={{  backgroundImage: `url(${floflo})` }}>
        <div
        className="hero-overlay bg-opacity-60"
          style={{
            
            
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

          }}
        >
            <div className='bg-white' style={{width:"400px",height:"400px" ,display: "flex",borderRadius:"20px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"}}>
          <h1 style={{ fontFamily: "Anton", textTransform: "uppercase", fontSize: "30px", marginBottom: "20px", color: "#8b4513" }}>
            Welcome TO Hdeya
          </h1>

           {/* Display error message */}

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
              Email Address
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
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
              onChange={handleChange}
              value={formData.password}
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
            <div style={{display:"flex",alignItems:"left",justifyContent:"center"}}>
            <p style={{fontSize:"15px"}}>Don't have an account yet?</p>
            <button style={{marginLeft:"12px",fontSize:"15px"}} onClick={handleredirectSignUP}>Sign Up</button>
            </div>
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
              Sign In
            </button>
          </form>
          </div>
        </div>
        </div>
            
    </div>
  )
}

export default SignIn