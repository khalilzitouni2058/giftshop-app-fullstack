import React, { useState, useEffect, useCallback } from "react";
import NavBar from "../components/NavBar";
import Carousels from "../components/Carousels";
import Cards from "../components/Cards";
import Spline from "@splinetool/react-spline";
import "../styles/home.css";
import Footer from "../components/Footer";
import BarWithButton from "../components/BarWithButton";
import SignInhomePage from "../components/SignInhomePage";
const SplineScene = React.memo(() => (
  <Spline  scene="https://prod.spline.design/0dcUPUKvuXzn4Oru/scene.splinecode"  style={{
    
    
    bottom:"200px",
    position:"relative",
   
    height:'400px',
    width:'1000px',
    left:"1200px"
    
    
  }} />
));

function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const sections = [
    <div>
      
      <NavBar />
      
      <div style={{ height: "600px" }}>
       
      <h1
  className="anton-regular"
  style={{
    color:"black",
    fontSize: "8rem",
    textAlign: "left",
    
    width:"1000px",
    position:"relative",
    left:"500px"
   
    
  }}
>
  Welcome to your favorite <br />
  <button
    className="before:content-['giftshop'] hover:before:content-['Hedya']"
    style={{
      color:"black",
      
      WebkitBackgroundClip: "text",
      
      border: "none",
      fontSize: "inherit",
      cursor: "pointer",
      
    }}
  >
    
  </button>
</h1>
       
        
          <SplineScene />
        <BarWithButton  />
        
      </div>
    </div>,
    
    <Carousels />,
    
    <Cards />,
    <SignInhomePage />
    
    
  ];

  // Throttle the scroll handler to improve performance
  const handleWheel = useCallback(
    (event) => {
      if (isScrolling) return;

      setIsScrolling(true);
      if (event.deltaY > 0 && currentSection < sections.length - 1) {
        setCurrentSection((prev) => prev + 1);
      } else if (event.deltaY < 0 && currentSection > 0) {
        setCurrentSection((prev) => prev - 1);
      }

      setTimeout(() => setIsScrolling(false), 1500); // Match transition duration
    },
    [currentSection, isScrolling, sections.length]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
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
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              backgroundColor: index === 1 
              ? "rgb(251 146 60)" 
              : index === 2 
                ? "rgb(244 244 245)" 
                : "white",
              
            }}
          >
            {section}
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default Home;
