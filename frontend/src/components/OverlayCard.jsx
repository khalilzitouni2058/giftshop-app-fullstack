import React from 'react';

const OverlayCard = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div style={overlayStyles}>
      <div style={cardStyles}>
        <button onClick={onClose} style={closeButtonStyles}>X</button>
        <div style={contentWrapperStyles}>
          <h2 style={titleStyles}>{product.title}</h2>
          <img src={product.imageURL} alt={product.title} style={imageStyles} />
          <div style={detailsStyles}>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Rating:</strong> {product.rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)', 
  backgroundColor: 'rgba(0, 0, 0, 0.7)', 
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  zIndex: 1000,
};

const cardStyles = {
  backgroundColor: '#ffffff',
  borderRadius: '15px',
  padding: '20px',
  width: '400px',
  height: '600px', 
  width: '30%', 
  maxWidth: '400px',
  height: '95%', 
  maxHeight: '95vh', 
  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '20px', 
};

const closeButtonStyles = {
  position: 'absolute', 
  top: '10px', 
  right: '10px', 
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  width: '30px',
  height: '30px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  display: 'flex', 
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0, 
};

const contentWrapperStyles = {
  overflowY: 'auto', 
  overflowY: 'auto',
  marginTop: '40px',
  paddingRight: '10px',
  scrollbarWidth: 'none', 
  msOverflowStyle: 'none', 
};

const titleStyles = {
  textAlign: 'center',
  color: '#34495e',
  marginBottom: '20px',
};

const imageStyles = {
  width: '100%',
  height: '300px', 
  objectFit: 'cover',
  borderRadius: '10px',
  marginBottom: '15px',
};

const detailsStyles = {
  color: '#2c3e50',
  fontSize: '16px', 
  lineHeight: '1.8', 
};

export default OverlayCard;
