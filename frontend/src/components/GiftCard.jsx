import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { StarFill, StarHalf, Star } from 'react-bootstrap-icons'; // For star icons
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa'; // Heart icons
import "../styles/giftcard.css";
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GiftCard({ product }) {
  const { _id, category, title, imageURL, subImage1, price, rating } = product;
  const { user, updateUser } = useContext(AuthContext); // Context for user data
  
  const [isHovered, setIsHovered] = useState(false); // State to track hover
  const [isLiked, setIsLiked] = useState(false);
  const [favorites, setFavorites] = useState([]);
  
  const notify = () => toast("Wow so easy!");
  
  useEffect(() => {
    if (user && user._id) {
      const fetchFavorites = async () => {
        try {
          const response = await axios.get('http://localhost:9002/api/Profile', {
            params: { userId: user._id },
          });
          setFavorites(response.data);
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      };

      fetchFavorites();
    }
  }, [user]);

  useEffect(() => {
    if (user && favorites.includes(_id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [favorites, _id, user]);

  const handleLikeClick = async () => {
    if (!user) {
      // If the user is not logged in, redirect them to the SignIn page
      navigate('/SignIn');
      return;
    }
    
    try {
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);

      const endpoint = newIsLiked
        ? 'http://localhost:9002/api/Profile/addfavorite'
        : 'http://localhost:9002/api/Profile/removefavorite';

      const response = await axios.post(endpoint, null, {
        params: {
          userId: user._id,
          productId: _id,
        },
      });

      if (newIsLiked) {
        toast.success('Product added to favorites!');
      } else {
        toast.warning('Product removed from favorites!');
      }

      console.log('Favorites updated:', response.data);
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const navigate = useNavigate();

  const showDetails = () => {
    navigate(`/${category}/${_id}`);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
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
    <Card className="GiftCard">
      <div>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Image */}
          <Card.Img
            src={imageURL}
            onClick={showDetails}
            style={{ cursor: 'pointer' }}
          />

          {/* Subimage */}
          {subImage1 && (
            <Card.Img
              variant="top"
              src={subImage1}
              onClick={showDetails}
              style={{
                cursor: 'pointer',
                objectFit: 'cover',
                transition: '0.5s ease-in-out',
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: isHovered ? 1 : 0, // Fade in on hover
              }}
            />
          )}
        </div>

        <div className="product-details" onClick={showDetails} style={{ cursor: 'pointer' }}>
          <h1 className="product-title">{title}</h1>
          <h3 className="product-price" style={{ color: 'black' }}>
            {price} TND
          </h3>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          cursor: 'pointer',
          fontSize: '30px',
          transition: 'color 0.3s ease',
        }}
        onClick={handleLikeClick} // If not logged in, will redirect to /SignIn
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'white',
            padding: '5px',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }}
          className="heart-container"
        >
          {isLiked ? (
            <FaHeart color="red" className="heart-icon liked" />
          ) : (
            <FaRegHeart color="gray" className="heart-icon" />
          )}
        </div>
      </div>
    </Card>
  );
}

export default GiftCard;
