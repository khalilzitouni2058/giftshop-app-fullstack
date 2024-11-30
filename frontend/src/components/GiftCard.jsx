import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { StarFill, StarHalf, Star } from "react-bootstrap-icons"; // For star icons
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Heart icons

function GiftCard({ product }) {
  const { id, category, name, image, subImage1, price, rating } = product;

  const [isHovered, setIsHovered] = useState(false); // State to track hover
  const [isLiked, setIsLiked] = useState(false); // State to track the heart icon toggle

  const navigate = useNavigate();

  const showDetails = () => {
    navigate(`/${category}/${id}`);
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
    <Card className='GiftCard'>
      <div
        style={{
          position: "relative",
          height: "300px", // Set a fixed height for the image container
          width: "100%",
          overflow: "hidden",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Image */}
        <Card.Img
          variant="top"
          src={image}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            transition: "1s ease-in-out",
            position: "absolute",
            top: 0,
            left: 0,
            opacity: isHovered ? 0 : 1, // Fade out on hover
          }}
        />
        {/* Subimage */}
        {subImage1 && (
          <Card.Img
            variant="top"
            src={subImage1}
            style={{
              height: "100%",
              width: "100%",
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
      <Card.Body>
        <Card.Text style={{ position: "center" }}>
          {name}
        </Card.Text>

        <div style={{ textAlign: "center", margin: "15px 0" }}>{renderStars(rating)}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <Card.Text style={{ fontSize: "24px", fontWeight: "650" }}>
            {price} $
          </Card.Text>
          <Button
            style={{ height: "50px", fontSize: "20px", fontWeight: "2px" }}
            variant="success"
            onClick={showDetails}
          >
            Show more
          </Button>
        </div>

        {/* Heart Icon with White Circle Background */}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            cursor: "pointer",
            fontSize: "30px",
            transition: "color 0.3s ease", // Smooth color transition
          }}
          onClick={() => setIsLiked(!isLiked)} // Toggle the heart icon
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
              backgroundColor: "white", // White circle background
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)", // Optional: Shadow for the circle
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
      </Card.Body>
    </Card>
  );
}

export default GiftCard;
