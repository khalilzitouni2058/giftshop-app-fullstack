import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { StarFill, StarHalf, Star } from "react-bootstrap-icons"; // For star icons
import { GiBowTieRibbon } from "react-icons/gi"; // Importing Bow Tie Ribbon Icon
import NavBar from "./NavBar";
import Button from "react-bootstrap/Button";
import "../styles/ProductDetails.css"; // External CSS for styling the ribbon
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function ProductDetails({
  handleIncrement,
  handleDecrement,
  handleSumIncrement,
  handleSumDecrement,
}) {
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
    oneProduct.subImageURL3,
  ] : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {Array.from({ length: fullStars }, (_, index) => (
          <StarFill key={`full-${index}`} color="gold" size={20} />
        ))}
        {halfStar && <StarHalf color="gold" size={20} />}
        {Array.from({ length: emptyStars }, (_, index) => (
          <Star key={`empty-${index}`} color="lightgray" size={20} />
        ))}
      </div>
    );
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
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ marginTop: "20px", maxWidth: "400px", border: "2px solid" }}>
                <Carousel activeIndex={currentIndex} onSelect={(selectedIndex) => setCurrentIndex(selectedIndex)} indicators={false}>
                  {images.map((img, index) => (
                    <Carousel.Item key={index}>
                      <img src={img} alt={`main-${index}`} style={{ width: "400px", height: "auto" }} />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "20px",
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
                marginTop: "50px",
                marginLeft: "200px",
                textAlign: "left",
                maxWidth: "600px",
              }}
            >
              <p style={{ fontSize: "50px" }}>{oneProduct.title}</p>
              <div style={{ display: "flex", gap: "250px", alignItems: "center" }}>
                <div style={{ textAlign: "center", margin: "0px" }}>
                  {renderStars(oneProduct.rating)}
                </div>
                <p
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    fontSize: "30px",
                  }}
                >
                  Price: {oneProduct.price} $
                </p>
              </div>
              <hr />
              <h2 style={{ marginTop: "40px", marginBottom: "20px", fontSize: "36px" }}>
                Description
              </h2>
              <p style={{ backgroundColor: "lightgray", borderRadius: "10px", padding: "10px 10px", marginBottom: "30px" }}>
                {oneProduct.description}
              </p>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <Button
                  onClick={() => addToCart(purchasedProduct)}
                  style={{
                    height: "70px",
                    width: "220px",
                    fontSize: "20px",
                    position: "relative",
                    display: "flex",
                    color: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "black",
                    borderColor: "pink",
                  }}
                >
                  <GiBowTieRibbon
                    style={{
                      position: "absolute",
                      color: "red",
                      top: "-10px",
                      left: "-10px",
                      fontSize: "40px",
                      transform: "rotate(-45deg)",
                    }}
                  />
                  Add to Cart
                </Button>
                <div
                  style={{
                    display: "flex",
                    margin: "0 100px",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="success"
                    onClick={increment}
                    style={{
                      height: "40px",
                      width: "40px",
                      fontSize: "20px",
                    }}
                  >
                    +
                  </Button>
                  <span>{count}</span>
                  <Button
                    variant="danger"
                    onClick={decrement}
                    style={{
                      height: "40px",
                      width: "40px",
                      fontSize: "20px",
                    }}
                  >
                    -
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;