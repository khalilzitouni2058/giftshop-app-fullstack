import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { StarFill, StarHalf, Star } from "react-bootstrap-icons"; // For star icons
import NavBar from "./NavBar";
import Button from "react-bootstrap/Button";
import "../styles/ProductDetails.css"; // External CSS for styling the ribbon
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaRegHand } from "react-icons/fa6";
import { TbFileDescription } from "react-icons/tb";
import { BiCategoryAlt } from "react-icons/bi";
import { TbMoodLookDown } from "react-icons/tb";
import { TbMoodLookUp } from "react-icons/tb";
import { IoPricetagsOutline } from "react-icons/io5";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';




import axios from "axios";

import Accordion from 'react-bootstrap/Accordion';


function ProductDetails() {
  const [oneProduct, setOneProduct] = useState(null); // Start with null to check data later
  const [loading, setLoading] = useState(false);
  const [count,Setcount] = useState(1)
  const { id, category } = useParams();
  const url_1 = `http://localhost:9002/api/products/${category}/${id}`;
  const navigate = useNavigate();
  const { addToCart } = useContext(AuthContext);
  const purchasedProduct = {
    product: oneProduct,
    count: count,
  };

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url_1);
        setOneProduct(response.data.product);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product by ID:", error);
        setLoading(false);
      }
    };

    if (id && category) {
      fetchProductById();
    }
  }, [id, category]);

  const increment = () => {
    Setcount(count+1)
    
  };
  const decrement = () => {
    Setcount(count-1)
  };

  const images = oneProduct ? [
    oneProduct.imageURL,
    oneProduct.subImageURL1,
    oneProduct.subImageURL2,
  ] : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {Array.from({ length: fullStars }, (_, index) => (
          <StarFill key={`full-${index}`} color="gold" size={30} />
        ))}
        {halfStar && <StarHalf color="gold" size={30} />}
        {Array.from({ length: emptyStars }, (_, index) => (
          <Star key={`empty-${index}`} color="lightgray" size={30} />
        ))}
      </div>
    );
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    console.log(isExpanded)
    setIsExpanded(prevState => !prevState);
  };

  const similarItems = oneProduct ? (
    (product) =>
      product.category === oneProduct.category && product.id !== oneProduct.id
  ) : [];

  if (loading) return <div>Loading...</div>; // Show loading state if fetching

  return (
    <>
      <NavBar />
      <div>
        <FaCircleArrowLeft
          onClick={() => navigate(`/${category}`)}
          style={{
            color: "black",
            position: "absolute",
            left: "100px",
            top: "130px",
            width: "50px",
            height: "50px",
          }}
        />
      </div>
      {oneProduct && (
        <div
          className="DetailsContainer"
          style={{
            marginTop: "20px",
            flexDirection: "column",
            padding: "20px",
            display: "flex",
            gap: "50px",
            marginLeft: "50px",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <div style={{  maxWidth: "400px",height:"500px" ,border: "2px solid", borderRadius:"5px" }}>
                <Carousel activeIndex={currentIndex} onSelect={(selectedIndex) => setCurrentIndex(selectedIndex)} indicators={false}>
                  {images.map((img, index) => (
                    <Carousel.Item key={index}>
                      <img  className="carousel-image" src={img} alt={`main-${index}`}  />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection:"column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "20px",
                  marginRight:"30px",
                }}
              >
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`subimage${index}`}
                    style={{
                      width: "80px",
                      height: "80px",
                      cursor: "pointer",
                      border: index === currentIndex ? "3px solid red" : "1px solid gray",
                      borderRadius: "5px",
                    }}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </div>
            <div
              style={{
                marginTop: "0px",
                marginLeft: "200px",
                textAlign: "left",
                maxWidth: "600px",
              }}
            >
              <p style={{ fontSize: "40px", fontWeight:"600",  }}>{oneProduct.title}</p>
              <div style={{ display: "flex", gap: "250px", alignItems: "center" }}>
                <div style={{ textAlign: "center", margin: "0px" }}>
                  {renderStars(oneProduct.rating)}
                </div>
                <p
                  style={{
                    color: "Black",
                    fontWeight: "bold",
                    fontSize: "30px",
                  }}
                >
                  {oneProduct.price} TND
                </p>
              </div>
              <hr />
              <Accordion defaultActiveKey={['0']} alwaysOpen style={{width:"600px", marginTop:"20px",border:"none",marginBottom:"100px",outline:"none"}}>
              <Accordion.Item eventKey="0"  >
              <Accordion.Header className="custom-accordion-header" >Item Details</Accordion.Header>
              <Accordion.Body style={{border:"none"}}>
              <h2 style={{ marginTop: "20px", marginBottom: "20px", fontSize: "20px", fontWeight:"500" }}>
                Highlights
              </h2> 
              <p style={{ display:"flex",backgroundColor:"white", gap:"10px", marginBottom: "20px", alignItems:"center" }}>
              <BiCategoryAlt /> {oneProduct.category}
              </p>
              <p style={{ display:"flex",backgroundColor:"white", gap:"10px", marginBottom: "20px", alignItems:"center" }}>
              <FaRegHand style={{ transform: 'rotate(30deg)' }} /> 
              Made by {oneProduct.brand}
              </p>
              <div style={{ display: "flex", backgroundColor: "white", gap: "10px", marginBottom: "20px", alignItems: "center" }}>
  <p style={{ display: "flex", gap: "10px", flexDirection: "row" }}>
    <TbFileDescription style={{ marginTop: "10px" }} />
    <span
      style={{
        maxHeight: isExpanded ? "1000px" : "60px", // Control the height based on the expanded state
        overflow: "hidden",
        transition: "max-height 0.3s ease-in-out", // Smooth transition for expanding/collapsing
        wordWrap: "break-word",
        maxWidth: "450px",
      }}
    >
      {oneProduct.description}
    </span>
  </p>
  <button
  onClick={toggleDescription}
  style={{
    marginTop: "10px",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "20px",
    transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out", // Add transition for smooth swap
  }}
>
  <TbMoodLookDown
    style={{
      opacity: isExpanded ? 0 : 1, // Fade out the "up" icon when expanded
      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", // Optional: rotate for added effect
      transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out", // Smooth opacity and rotation transition
    }}
  />
  <TbMoodLookUp
    style={{
      opacity: isExpanded ? 1 : 0, // Fade in the "down" icon when expanded
      transform: isExpanded ? "rotate(0deg)" : "rotate(-180deg)", // Optional: rotate for added effect
      transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out", // Smooth opacity and rotation transition
    }}
  />
</button>

</div>
<p style={{ display:"flex",backgroundColor:"white", gap:"10px", marginBottom: "20px", alignItems:"center" }}>
<IoPricetagsOutline />
{oneProduct.tags.map((tag)=><p style={{padding:"5px 5px",borderRadius:"10px", backgroundColor:"lightgray",fontSize:"15px"}}>{tag}</p>)}
              </p>


              </Accordion.Body>
              </Accordion.Item>
                </Accordion>
              <div style={{ display: "flex",gap:"20px", flexDirection: "column-reverse",justifyContent:"center",alignItems:"center",maxWidth:"600px",marginTop:"-50px" }}>
              <Button
    onClick={() => addToCart(purchasedProduct)}
    className="add-to-cart-btn" // Apply the CSS class
  >
    Add to Cart
  </Button>
          <DropdownButton
            key={count}
            id="dropdown-button-drop-'up-centered'"
            drop='up-centered'  
            title={count}
            onSelect={(eventKey) => Setcount(parseInt(eventKey))} // Update count on selection
            style={{width:"400px",backgroundColor:"gray"}}
            className="dropDown"
          >
            <Dropdown.Item eventKey="1" style={{fontSize:"18px", width:"200px"}}>1</Dropdown.Item>
            <Dropdown.Item eventKey="2" style={{fontSize:"18px"}}>2</Dropdown.Item>
            <Dropdown.Item eventKey="3" style={{fontSize:"18px"}}>3</Dropdown.Item>
            <Dropdown.Item eventKey="4" style={{fontSize:"18px"}}>4</Dropdown.Item>
            <Dropdown.Item eventKey="5" style={{fontSize:"18px"}}>5</Dropdown.Item>
            <Dropdown.Item eventKey="6" style={{fontSize:"18px"}}>6</Dropdown.Item>
            <Dropdown.Item eventKey="7" style={{fontSize:"18px"}}>7</Dropdown.Item>
            <Dropdown.Item eventKey="8" style={{fontSize:"18px"}}>8</Dropdown.Item>
            <Dropdown.Item eventKey="9" style={{fontSize:"18px"}}>9</Dropdown.Item>
            <Dropdown.Item eventKey="10" style={{fontSize:"18px"}}>10</Dropdown.Item>
            
            
          </DropdownButton>
        
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;