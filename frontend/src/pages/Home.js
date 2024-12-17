import React, { useState, useEffect, useCallback, useContext } from "react";
import NavBar from "../components/NavBar";
import Carousels from "../components/Carousels";
import Cards from "../components/Cards";
import Spline from "@splinetool/react-spline";
import "../styles/home.css";
import Footer from "../components/Footer";
import BarWithButton from "../components/BarWithButton";
import SignInhomePage from "../components/SignInhomePage";
import { AuthContext } from '../context/AuthContext';
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { Alert } from "@material-tailwind/react";
import imageproducts from "../assets/ourPproduct.png"
// Memoizing the Spline component


const sectionStyles = [
  { backgroundColor: "white", height: "100vh", flexDirection: "column", justifyContent: "center", alignItems: "center" },
  { backgroundColor: "rgb(251 146 60)", height: "100vh" },
  { backgroundColor: "rgb(244 244 245)", height: "100vh" },
  { backgroundColor: "white", height: "100vh" }
];

function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  
  const sections = [
    <div key="section1" style={{display:"flex",flexDirection:"column"}}>
      <NavBar />
      <div style={{}}>
            <h1 className="welcome-text">
            Welcome To Hdeya <br />
            
            <div style={{ position: "relative", width: "900px", left: "600px",bottom:"620px"}}>
            <BarWithButton />
  <img
    src={imageproducts}
    width={900}
    style={{
      position: "relative",
      zIndex: "-1",
    }}
    alt="Product"
  />
  <div
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "150px", // Adjust height for fade coverage
      background: "linear-gradient(transparent, white)", // Adjust 'white' to match your background
      zIndex: "0",
    }}
  ></div>
  
</div>

      </h1>
        
      
      </div>
      
    </div>,
    <Carousels key="section2" />,
    <Cards key="section3" />,
    <SignInhomePage key="section4" />
  ];

  // Debounced Scroll Handler
  const handleWheel = useCallback((event) => {
    if (isScrolling) return;
    setIsScrolling(true);

    if (event.deltaY > 0 && currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    } else if (event.deltaY < 0 && currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }

    setTimeout(() => setIsScrolling(false), 1500);
  }, [currentSection, isScrolling, sections.length]);

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  return (
    <div style={{ height: "100vh", overflow: "hidden", position: "relative" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          transform: `translateY(-${currentSection * 100}vh)`,
          transition: "transform 0.8s ease-in-out",
        }}
      >
        {sections.map((section, index) => (
          <div
            key={index}
            style={sectionStyles[index] || { height: "100vh" }}
          >
            {section}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
