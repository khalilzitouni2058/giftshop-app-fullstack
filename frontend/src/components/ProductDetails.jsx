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
  const [oneProduct, setOneProduct] = useState();

  const [loading, setLoading] = useState(false);

  // const path = window.location.pathname; // Example: "/flowers/1"
  // const category = path.split("/")[1];
  // const id = path.split("/")[2];
  const { id, category } = useParams();
  console.log(category);
  console.log(id);
  const url_1 = `http://localhost:9002/api/products/${category}/${id}`;
  const navigate = useNavigate();
  const { addToCart } = useContext(AuthContext);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        console.log("Fetching product...");
        setLoading(true); // Start loading
        const response = await axios.get(url_1); // Fetch product data
        console.log("Fetched product:", response.data.product); // Debug log
        setOneProduct(response.data.product); // Set the product state
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching product by ID:", error);
        setLoading(false); // Stop loading on error
      }
    };

    if (id && category) {
      fetchProductById(); // Trigger the fetch
    }
  }, [id, category]);
  const showDetails = (id) => {
    window.scrollTo(0, 0);
    navigate(`/${category}/${id}`);
  };

  const goback = () => {
    // Use template literals to dynamically create the path
    navigate(`/${category}`);
  };

  // Find the product based on the ID from the URL

  console.log(oneProduct);

  const increment = () => {
    handleIncrement(oneProduct._id);
    handleSumIncrement(oneProduct.Price);
  };
  const decrement = () => {
    handleDecrement(oneProduct._id);
    handleSumDecrement(oneProduct);
  };

  // Array of all images (main + subimages)
  const images = [
    oneProduct.imageURL,
    oneProduct.subImageURL1,
    oneProduct.subImageURL2,
    oneProduct.subImageURL3,
  ];
  console.log(images)

  // State to track the current index in the slider
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Full stars
    const halfStar = rating % 1 !== 0; // Half star if rating is not an integer
    const emptyStars = 5 - Math.ceil(rating); // Remaining empty stars

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

  // Filter similar items (exclude the current product and match the same category)
  const similarItems = oneProduct.filter(
    (product) =>
      product.category === oneProduct.category && product.id !== oneProduct.id
  );

  return (
    <>
      <NavBar />
      <div>
        <FaCircleArrowLeft
          onClick={goback}
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
        {/* Main Product Section */}
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Main Image Carousel */}
            <div
              style={{
                marginTop: "20px",
                maxWidth: "400px",
                border: "2px solid",
              }}
            >
              <Carousel
                activeIndex={currentIndex}
                onSelect={(selectedIndex) => setCurrentIndex(selectedIndex)}
                indicators={false}
              >
                {images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      src={img}
                      alt={`main-${index}`}
                      style={{ width: "400px", height: "auto" }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>

            {/* Subimages */}
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
                    border:
                      index === currentIndex
                        ? "3px solid red"
                        : "1px solid gray",
                    borderRadius: "5px",
                  }}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div
            style={{
              marginTop: "50px",
              marginLeft: "200px",
              textAlign: "left",
              maxWidth: "600px",
            }}
          >
            <p style={{ fontSize: "50px" }}>{oneProduct.title}</p>
            <div
              style={{
                display: "flex",
                gap: "250px",
                alignItems: "center",
              }}
            >
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
            <h2
              style={{
                marginTop: "40px",
                marginBottom: "20px",
                fontSize: "36px",
              }}
            >
              Description
            </h2>
            <p
              style={{
                backgroundColor: "lightgray",
                borderRadius: "10px",
                padding: "10px 10px",
                marginBottom: "30px",
              }}
            >
              {oneProduct.Description}
            </p>

            {/* Add to Cart Section */}
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Button
                onClick={() => addToCart(oneProduct)}
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
                <span>{oneProduct.qte}</span>
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

        {/* Reviews Section */}
        <div style={{ marginTop: "100px" }}>
          <h3>Customer Reviews</h3>
          {oneProduct.reviews?.length > 0 ? (
            oneProduct.reviews.map((review, index) => (
              <div
                key={index}
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "10px 0",
                }}
              >
                <p>
                  <strong>{review.name}</strong> - {review.date}
                </p>
                <p>Rating: {"⭐".repeat(review.rating)}</p>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews available for this product.</p>
          )}
        </div>

        {/* Similar Items Section */}
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              backgroundColor: "#ffd77a",
              padding: "10px 10px",
              borderRadius: "10px",
              fontSize: "30px",
            }}
          >
            Similar Items
          </h3>
          <div
            style={{
              display: "flex",
              gap: "30px",
              width: "max-content",
              marginTop: "20px",
            }}
          >
            {similarItems.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="similar-item"
                onClick={() => showDetails(item.id)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="similar-item-image"
                />
                <h5 className="similar-item-title">{item.name}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
