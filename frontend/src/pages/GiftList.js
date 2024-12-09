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
  const [visibleItems, setVisibleItems] = useState(7); // Initially show 5 items
  const [loading, setLoading] = useState(false); // Track loading state
  const { category } = useParams();
  const url = `http://localhost:9002/api/products/${category}`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const response = await axios.get(url);
        setProducts(response.data.products); // Update products state
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchProducts();
  }, [category]);

  // Function to show more items
  const showMoreItems = () => {
    setLoading(true); // Start loading when Show More is clicked

    // Simulate loading time (e.g., 1 second delay)
    setTimeout(() => {
      setVisibleItems((prev) => prev + 5); // Increase visible items by 5
      setLoading(false); // Stop loading after delay
    }, 1000); // Adjust the delay as needed
  };
  console.log(products);
  return (
    <>
      <NavBar />
      <div style={{ marginTop: "-20px" }}>
        <ListOfIcons />

        <div
          style={{
            columnCount: 4, // Number of columns
            // Gap between columns
            marginTop: "100px",
            marginLeft: "50px",
          }}
        >
          {products.slice(0, visibleItems).map((product) => (
            <div
              key={product._id} // Add a key prop to prevent React warnings
              style={{
                breakInside: "avoid", // Prevent items from breaking inside the column
                marginBottom: "30px", // Add spacing between items
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
              {/* Semicircle behind the button */}
              <div
                style={{
                  position: "absolute",
                  bottom: "0", // Aligns with the button's bottom
                  left: "50%",
                  transform: "translateX(-50%)", // Centers the semicircle
                  width: "800px", // Adjust width to match the button
                  height: "150px", // Half of the width to create a semicircle
                  backgroundColor: "lightgray",
                  borderTopLeftRadius: "300px", // Makes a semicircle
                  borderTopRightRadius: " 300px",
                  zIndex: "0", // Places it behind the button
                }}
              />
              {/* Button */}
              <Button
                onClick={showMoreItems}
                style={{
                  marginBottom: "50px",
                  fontSize: "15px",
                  borderRadius: "50px",
                  border: "2px solid black", // Adds a bold border for definition
                  backgroundColor: "white",
                  color: "black",
                  padding: "10px 40px", // Adjusted for better spacing
                  zIndex: "1", // Ensures the button is on top of the semicircle
                  position: "relative",
                  fontFamily: "Anton, sans-serif", // Use a sans-serif fallback for Anton
                  textTransform: "uppercase",
                  letterSpacing: "2px", // Slight spacing for better readability
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adds subtle shadow for depth
                  transition: "all 0.3s ease", // Smooth hover transition
                  cursor: "pointer", // Ensure it’s clear that it’s clickable
                }}
                onMouseEnter={
                  (e) => (
                    (e.currentTarget.style.backgroundColor = "black"),
                    (e.currentTarget.style.color = "white")
                  ) // Reverses colors on hover
                }
                onMouseLeave={
                  (e) => (
                    (e.currentTarget.style.backgroundColor = "white"),
                    (e.currentTarget.style.color = "black")
                  ) // Restores colors on hover out
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
