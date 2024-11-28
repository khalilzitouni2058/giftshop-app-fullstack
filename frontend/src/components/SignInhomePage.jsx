import React from 'react'
import floflo from "../assets/floflo.jpg"
function SignInhomePage() {
  return (
    <>
    <div style={{display:"flex",alignItems:"center"}}>
        {/** left  slide */}
        <div  className="hero min-h-screen" style={{width:"1000px",height:"730px",backgroundImage: `url(${floflo})`}}>
        <div className="hero-overlay bg-opacity-60">
        <h1 className='mb-5 text-5xl font-bold  text-zinc-50 ' style={{font:"Anton",textTransform:"uppercase",marginTop:"230px",marginLeft:"480px",fontSize:"50px"}}> Join Us</h1>
            <h1 className='mb-5 text-5xl font-bold  text-zinc-50 ' style={{font:"Anton",textTransform:"uppercase",marginLeft:"200px",fontSize:"50px"}}> unwrap  the joy of giving!</h1>

        </div>
           
        </div>
        {/** right slide */}
        <div
      style={{
        backgroundColor: "rgb(254 215 170)", // Light gift shop-themed color
        width: "800px",
        height: "730px",
        
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginRight:"90px"
      }}
    >
      <h1 style={{ fontFamily: "Anton",textTransform:"uppercase", fontSize:"30px",marginBottom: "20px", color: "#8b4513" }}>
        Welcome TO Hdeya
      </h1>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          maxWidth: "400px",
        }}
      >
        <label style={{ fontWeight: "bold", marginBottom: "8px", color: "#8b4513" }}>
          UserName
        </label>
        <input
          type="UserName"
          placeholder="Enter your Username"
          style={{
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "18px",
            
            fontSize: "16px",
            backgroundColor:"rgb(228 228 231)"
          }}
        />
        <label style={{ fontWeight: "bold", marginBottom: "8px", color: "#8b4513" }}>
          Email Address
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          style={{
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "18px",
            border: "1px solid #ccc",
            fontSize: "16px",
            backgroundColor:"rgb(228 228 231)"
          }}
        />
        

        <label style={{ fontWeight: "bold", marginBottom: "8px", color: "#8b4513" }}>
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          style={{
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "18px",
            border: "1px solid #ccc",
            fontSize: "16px",
            backgroundColor:"rgb(228 228 231)"
          }}
        />
        <label style={{ fontWeight: "bold", marginBottom: "8px", color: "#8b4513" }}>
          Date of birth
        </label>
        <input
          type="date"
          placeholder="Enter your Date of birth"
          style={{
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "18px",
            border: "1px solid #ccc",
            fontSize: "16px",
            backgroundColor:"rgb(228 228 231)"
          }}
        />
        <label style={{ fontWeight: "bold", marginBottom: "8px", color: "#8b4513" }}>
          Phone Number
        </label>
        <input
          type="text"
          placeholder="Enter your Phone Number"
          style={{
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "18px",
            border: "1px solid #ccc",
            fontSize: "16px",
            backgroundColor:"rgb(228 228 231)"
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#ff7f50", // Coral color for a friendly vibe
            color: "rgb(228 228 231)",
            fontSize: "18px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop:"30px",
            transition: "background-color 0.3s",
          }}
          
        >
          Sign Up
        </button>

        
      </form>
    </div>
    </div>
    <ul style={{backgroundColor:"white",width:'1600px',display: "flex",alignItems:"center",padding:"5px",justifyContent:"center",gap:"50px",position:"relative",bottom:"10px"}}>
        <li style={{paddingBottom:"20px",color:"grey",fontFamily:"system-ui",fontSize:"12px"}} >Contact Us</li>
        <li  style={{paddingBottom:"20px",color:"grey",fontFamily:"system-ui",fontSize:"12px"}} >Help</li>
        <li style={{paddingBottom:"20px",color:"grey",fontFamily:"system-ui",fontSize:"12px"}} >Shop</li>
        <li  style={{paddingBottom:"20px",color:"grey",fontFamily:"system-ui",fontSize:"12px"}} >Term of Service</li>
    </ul>
    </>
  )
}

export default SignInhomePage