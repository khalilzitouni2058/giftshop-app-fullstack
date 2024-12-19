import React, { useState, useEffect } from "react";
import ListOfIcons from "../components/ListOfIcons";
import GiftCard from "../components/GiftCard";
import { MdLogin } from "react-icons/md";
import { FaSearch, FaShoppingBag } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "../styles/NavBar.css";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useParams } from "react-router-dom";

function GiftList() {
  const [products, setProducts] = useState([]);
  const [visibleItems, setVisibleItems] = useState(7); 
  const [loading, setLoading] = useState(false);
  const { category } = useParams();
  const url = `http://localhost:9002/api/products/${category}`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); 
        const response = await axios.get(url);
        setProducts(response.data.products); 
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); 
      }
    };

    fetchProducts();
  }, [category]);

  const showMoreItems = () => {
    setLoading(true); 

    
    setTimeout(() => {
      setVisibleItems((prev) => prev + 5); 
      setLoading(false); 
    }, 1000); 
  };
  console.log(products);
  return (
    <>
      <NavBar />
      <div style={{ marginTop: "20px" }}>
        <ListOfIcons />

        <div
          style={{
            columnCount: 4, 
            marginTop: "100px",
            marginLeft: "50px",
          }}
        >
          {products.slice(0, visibleItems).map((product) => (
            <div
              key={product._id} 
              style={{
                breakInside: "avoid", 
                marginBottom: "30px", 
              }}
            >
              <GiftCard
                product={product}
                subImage1={product.subImageURL1}
                subImage2={product.subImageURL2}
                subImage3={product.subImageURL3}
              />
            </div>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spinner animation="grow" />
          </div>
        ) : (
          !loading &&
          visibleItems < products.length && (
            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
                position: "relative",
               
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "0", 
                  left: "50%",
                  transform: "translateX(-50%)", 
                  width: "800px", 
                  height: "100px", 
                  backgroundColor: "lightgray",
                  borderTopLeftRadius: "300px", 
                  borderTopRightRadius: " 300px",
                  zIndex: "0", 
                }}
              />
              <Button
                onClick={showMoreItems}
                style={{
                  
                  marginBottom: "50px",
                  fontSize: "15px",
                  borderRadius: "50px",
                  border: "2px solid black", 
                  backgroundColor: "white",
                  color: "black",
                  padding: "10px 40px", 
                  zIndex: "1", 
                  position: "relative",
                  fontFamily: "Anton, sans-serif", 
                  textTransform: "uppercase",
                  letterSpacing: "2px", 
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
                  transition: "all 0.3s ease", 
                  cursor: "pointer", 
                }}
                onMouseEnter={
                  (e) => (
                    (e.currentTarget.style.backgroundColor = "black"),
                    (e.currentTarget.style.color = "white")
                  ) 
                }
                onMouseLeave={
                  (e) => (
                    (e.currentTarget.style.backgroundColor = "white"),
                    (e.currentTarget.style.color = "black")
                  ) 
                }
              >
                Show More
              </Button>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default GiftList;
