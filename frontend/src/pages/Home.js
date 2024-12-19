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
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Alert } from "@material-tailwind/react";
import imageproducts from "../assets/ourPproduct.png"
import { Form, FormControl,ListGroup,Button  } from 'react-bootstrap';



const sectionStyles = [
  { backgroundColor: "white", height: "100vh", flexDirection: "column", justifyContent: "center", alignItems: "center" },
  { backgroundColor: "rgba(169,138,123,255)", height: "100vh" },
  { backgroundColor: "rgb(244 244 245)", height: "100vh" },
  { backgroundColor: "rgba(255,255,255)", height: "100vh" }
];


function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const navigation = useNavigate()
  const { user, logout } = useContext(AuthContext);
  const fetchAllProducts = async () => {
    setLoading(true);
    try {
        const response = await fetch('http://localhost:9002/api/allproducts'); 
        if (response.ok) {
            const data = await response.json();
            setProducts(data.products);
            setFilteredProducts(data.products); 
        } else {
            setError("No products found.");
        }
    } catch (error) {
        setError("Error fetching products");
        console.error(error);
    } finally {
        setLoading(false);
    }
};

const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) 
    );

    setFilteredProducts(filtered); 
};

useEffect(() => {
    fetchAllProducts(); 
}, []); 
const handleshowdetails = (product) =>{
  navigation(`/${product.category}/${product._id}`)
}

const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedTag, setSelectedTag] = useState(""); 
  const [searchQuery, setSearchQuery] = useState("");
  
  const sections = [
    <div key="section1" style={{ display: "flex", flexDirection: "column" }}>
  <div>
    <NavBar />
    <h1 className="welcome-text">
      HDEYA <br />
    </h1>
    <h5
      style={{
        fontSize: "30px",
        fontFamily: "regular",
        position: "absolute",
        marginTop: "20px",
        marginLeft:"20px"
      }}
    >
      Where Every Gift Tells a Story <br /> Find the Perfect Gift for Every
      Occasion!
    </h5>

    <Form className="d-flex" style={{ marginTop: "150px", position: "relative" }}>
      
      <FormControl
        type="search"
        placeholder="What are you shopping for today ?"
        className="mr-2"
        aria-label="Search"
        style={{
          width: "500px",
          height: "60px",
          marginLeft:"20px",
          fontSize:"20px",
          
        }}
        value={searchQuery}
        onChange={handleSearchChange} 
      />
    </Form>

    <div style={{ marginTop: "10px", width: "500px", position: "relative" }}>
      {searchQuery && (
        <ListGroup
          style={{
            maxHeight: "200px",
            overflowY: "auto",
            width: "100%",
            marginLeft:"20px",
           
            position: "absolute", 
            top: "0px", 
            zIndex: 10, 
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
                      <ListGroup.Item key={product._id} className="home-card">
              <img
                src={product.imageURL}
                alt={product.title}
                className="home-card-image"
                
              />
              <div className="home-card-details" >
                <h1 className="home-card-title">{product.title}</h1>
                <p className="home-card-price">${product.price}</p>
                
              </div>
              <Button className="home-card-bottom" onClick={() => handleshowdetails(product)}>show details</Button>
              
              
            </ListGroup.Item>
            
            ))
          ) : (
            <ListGroup.Item>No products found matching your search</ListGroup.Item>
          )}
        </ListGroup>
      )}
    </div>

    <div
      style={{
        position: "relative",
        width: "900px",
        left: "600px",
        bottom: "820px",
        zIndex: 10,
      }}
    >
      <BarWithButton />
      <img
        src={imageproducts}
        width={900}
        style={{
          position: "relative",
          zIndex: 0,
          objectFit: "cover",
        }}
        alt="Product"
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100px", 
          background: "linear-gradient(transparent, white)",
          zIndex: 0,
        }}
      ></div>
    </div>
  </div>
</div>
,
    <Carousels key="section2" />,
    <Cards key="section3" />,
    <SignInhomePage key="section4" />
  ];

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
