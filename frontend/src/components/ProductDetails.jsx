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
  const [userHasReviewed, setUserHasReviewed] = useState(false);
  const [rating, setRating] = useState(0); // Store the rating (1-5)
  const [Productrating, setProductRating] = useState(0); // Store the rating (1-5)
  const [similarItems, setSimilarItems] = useState([]);
  const [reviewAdded, setReviewAdded] = useState(false); // State to trigger re-render


  const [comment, setComment] = useState(''); // Store the comment
  const [hover, setHover] = useState(0); // Store the hover state for stars
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userdata = JSON.parse(localStorage.getItem("user"));


  const { id, category } = useParams();
  const url_1 = `http://localhost:9002/api/products/${category}/${id}`;
  const url_2= `http://localhost:9002/api/products/${id}/reviews` ;
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
  
        // Fetch product by id
        const response = await axios.get(url_1);
        setOneProduct(response.data.product); // Update oneProduct
  
        // Update product rating
        if (response.data.product.reviews && response.data.product.reviews.length > 0) {
          const totalRating = response.data.product.reviews.reduce((acc, review) => acc + review.rating, 0);
          const averageRating = totalRating / response.data.product.reviews.length;
          setProductRating(averageRating);
        } else {
          setProductRating(0);
        }
  
        // Check if user has reviewed the product
        const userReview = response.data.product.reviews.find(review => review.userName == userdata.userName);
if (userReview) {
  setUserHasReviewed(true);
}
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product by ID:", error);
        setLoading(false);
      }
    };
  
    // Trigger fetch only when id or category change, but prevent infinite re-fetch
    if (id && category) {
      fetchProductById();
    }
  }, [id, category, reviewAdded]); // Trigger on id or category change
  
  // Separate useEffect to fetch similar items after oneProduct is updated
  useEffect(() => {
    if (oneProduct && oneProduct.category) {
      const fetchSimilarItems = async () => {
        try {
          const allProductsResponse = await axios.get(`http://localhost:9002/api/products/${oneProduct.category}`);
          
          const allProducts = allProductsResponse.data.products;
          setSimilarItems(allProducts);
          console.log(allProducts); // Check fetched similar products
        } catch (error) {
          console.error("Error fetching similar products:", error);
        }
      };
  
      fetchSimilarItems(); // Fetch similar items after oneProduct is updated
    }
  }, [oneProduct]);  // Trigger re-fetch when the user has reviewed
  

  
  const handleSubmitReview = async (e) => {
    e.preventDefault();
  
    if (!comment || rating === 0) {
      alert("Please provide a comment and select a rating.");
      return;
    }
  
    const reviewData = {
      userName: userdata.userName,
      comment,
      rating,
      date: new Date().toISOString(),
    };
  
    
    try {
      await axios.post(url_2, reviewData);
      // Optionally save the review locally
      localStorage.setItem('userReview', JSON.stringify(reviewData));
      alert("Review added successfully!");
      setReviewAdded(!reviewAdded);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error adding review. Please try again.");
    }
  };
  
 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date"; // Handle invalid dates gracefully
    return date.toISOString().split("T")[0]; // Formats to "YYYY-MM-DD"
  };


  const images = oneProduct ? [
    oneProduct.imageURL,
    oneProduct.subImageURL1,
    oneProduct.subImageURL2,
  ] : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const renderStars = (rating, size,color) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {Array.from({ length: fullStars }, (_, index) => (
          <StarFill key={`full-${index}`} color={color} size={size} />
        ))}
        {halfStar && <StarHalf color={color} size={size} />}
        {Array.from({ length: emptyStars }, (_, index) => (
          <Star key={`empty-${index}`} color="lightgray" size={size} />
        ))}
      </div>
    );
  };


  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    console.log(isExpanded)
    setIsExpanded(prevState => !prevState);
  };


  

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
                  {renderStars(Productrating,30,"gold")}
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
              <h2 style={{ marginTop: "20px", marginBottom: "20px", fontSize: "20px", fontWeight:"500",fontSize:"25px" }}>
                Highlights
              </h2> 
              <p style={{ display:"flex",backgroundColor:"white", gap:"10px", marginBottom: "20px", alignItems:"center",fontSize:"18px" }}>
              <BiCategoryAlt /> {oneProduct.category}
              </p>
              <p style={{ display:"flex",backgroundColor:"white", gap:"10px", marginBottom: "20px", alignItems:"center",fontSize:"18px" }}>
              <FaRegHand style={{ transform: 'rotate(30deg)' }} /> 
              Made by {oneProduct.brand}
              </p>
              <div style={{ display: "flex", backgroundColor: "white", gap: "10px", marginBottom: "20px", alignItems: "center" }}>
  <p style={{ display: "flex", gap: "10px", flexDirection: "row",fontSize:"18px" }}>
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
<p style={{ display:"flex",backgroundColor:"white", gap:"10px", marginBottom: "20px", alignItems:"center",fontSize:"18px" }}>
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
   style={{borderRadius:"50px", fontSize:"25px"}} >
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
          <div className="reviews-container">
  {oneProduct.reviews && oneProduct.reviews.length > 0 ? (
    oneProduct.reviews.map((review, index) => (
      <div key={index} className="review-item">
        {/* Stars */}
        <div className="review-stars" style={{fontSize:"10px"}}>{renderStars(review.rating,18,"black")}</div>

        {/* Review Content */}
        <p className="review-comment">{review.comment}</p>

        {/* User Details */}
        <div className="review-footer">
         
          <span className="review-username">{review.userName}</span>
          <span className="review-date">
            {review.date ? formatDate(review.date) : "Unknown Date"}
          </span>        </div>
      </div>
    ))
  ) : (
    <p className="no-reviews">No reviews available for this product.</p>
  )}
  {!userHasReviewed && (<div className="add-review" >
  <h3>Add a Review</h3>
  <form onSubmit={handleSubmitReview} className="review-form">
    {/* Rating */}
    <div className="rating-container">
      <p>Rating:</p>
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <label key={index} className="rating-star">
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
              style={{ display: 'none' }}
            />
            <span
              style={{
                color: currentRating <= (hover || rating) ? '#ffc107' : '#e4e5e9',
                fontSize: '40px',
                cursor: 'pointer',
                gap:"10px",
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          </label>
        );
      })}
    </div>

    {/* Comment */}
    <textarea
      placeholder="Write your comment here..."
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      rows="4"
      required
      className="review-textarea"
    ></textarea>

    {/* Submit */}
    <button type="submit" className="submit-btn">Submit Review</button>
  </form>

  {/* Show error or success messages */}
  {error && <p className="error-message">{error}</p>}
  {success && <p className="success-message">{success}</p>}
  
</div>)}
{userHasReviewed && (
  <p style={{fontSize:"20px", fontWeight:"700"}}>You have already reviewed this product.</p>
)}
</div>



          
        </div>
      )}
      <div className="similar-products-container">
  <h3>Similar Products</h3>
  <div className="similar-products-grid">
    {similarItems
      .filter((product) => product._id !== id).slice(0, 5).map((product) => (
      <div 
        key={product.id} 
        className="similar-product-item" 
        onClick={() => {navigate(`/${product.category}/${product._id}`) ; setUserHasReviewed(false);window.scrollTo({ top: 0, behavior: "smooth" }) }}
      >
        <img src={product.imageURL} alt={product.title} className="product-image" />
        <h4 className="product-title">{product.title}</h4>
        <p className="product-price">{product.price} TND</p>
      </div>
    ))}
  </div>
</div>

    </>
  );
}

export default ProductDetails;