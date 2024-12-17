import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { StarFill, StarHalf, Star } from "react-bootstrap-icons"; // For star icons
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Heart icons

function GiftCard({ product }) {
  const { _id, category, title, imageURL, subImage1, price, rating } = product;
  

  const [isHovered, setIsHovered] = useState(false); // State to track hover
  const [isLiked, setIsLiked] = useState(false); // State to track the heart icon toggle
if(isLiked){
  console.log(product._id);
}
  const navigate = useNavigate();

  const showDetails = () => {
        navigate(`/${category}/${_id}`);
  };

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

  return (
    <Card className='GiftCard' >
      
      <div 
        
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}

      >
        {/* Main Image */}
        <Card.Img
          
          src={imageURL}
          onClick={showDetails}
          style={{cursor: "pointer"}}
        
        />
        
        
        {/* Subimage */}
        {subImage1 && (
          <Card.Img
            variant="top"
            src={subImage1}
            onClick={showDetails}
            style={{
              cursor:"pointer",
              objectFit: "cover",
              transition: "0.5s ease-in-out",
              position: "absolute",
              top: 0,
              left: 0,
              opacity: isHovered ? 1 : 0, // Fade in on hover
            }}
          />
        )}
      </div>
      
       

        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          
          
        </div>

        {/* Heart Icon with White Circle Background */}
        <div>
            <h3 style={{display:"flex",alignItems:"flex-end",position:"absolute",bottom:"10px",left:"10px",backgroundColor:"white",padding:"5px",borderRadius:"30px",fontSize:"15px"}}> {price} TND </h3>
          </div>
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            cursor: "pointer",
            fontSize: "30px",
            transition: "color 0.3s ease", // Smooth color transition
          }}
          onClick={() => setIsLiked(!isLiked) } // Toggle the heart icon
        >
          {/* White circle background */}
          
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
               // White circle background
               // Optional: Shadow for the circle
              padding: "5px",
            }}
          >
            {isLiked ? (
              <FaHeart color="red" /> // Red heart when liked
            ) : (
              <FaRegHeart color="gray" /> // Gray heart when unliked
            )}
          </div>
        </div>
      
    </Card>
  );
}

export default GiftCard;
