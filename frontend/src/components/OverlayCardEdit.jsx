import React, { useState } from 'react';

const OverlayCardEdit = ({ product, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = () => {
    onSave(editedProduct);
  };

  if (!product) return null;

  return (
    <div style={overlayStyles}>
      <div style={cardStyles}>
        <button onClick={onClose} style={closeButtonStyles}>
          X
        </button>
        <h2 style={titleStyles}>Edit Product</h2>
        <div style={contentWrapperStyles}>
          <label style={labelStyles}>
            Title:
            <input
              type="text"
              name="title"
              value={editedProduct.title}
              onChange={handleInputChange}
              style={inputStyles}
            />
          </label>
          <label style={labelStyles}>
            Brand:
            <input
              type="text"
              name="brand"
              value={editedProduct.brand}
              onChange={handleInputChange}
              style={inputStyles}
            />
          </label>
          <label style={labelStyles}>
            Category:
            <input
              type="text"
              name="category"
              value={editedProduct.category}
              onChange={handleInputChange}
              style={inputStyles}
            />
          </label>
          <label style={labelStyles}>
            Price:
            <input
              type="number"
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
              style={inputStyles}
            />
          </label>
          <label style={labelStyles}>
            Description:
            <textarea
              name="description"
              value={editedProduct.description}
              onChange={handleInputChange}
              style={textareaStyles}
            />
          </label>
          <label style={labelStyles}>
            Rating:
            <input
              type="number"
              name="rating"
              value={editedProduct.rating}
              onChange={handleInputChange}
              style={inputStyles}
              min="0"
              max="5"
              step="0.1"
            />
          </label>
          <label style={labelStyles}>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={editedProduct.quantity}
              onChange={handleInputChange}
              style={inputStyles}
            />
          </label>
        </div>
        <button onClick={handleSave} style={saveButtonStyles}>
          Save
        </button>
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
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  zIndex: 1000,
};

const cardStyles = {
  backgroundColor: '#ffffff',
  borderRadius: '15px',
  padding: '20px',
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

const inputStyles = {
  width: '100%',
  padding: '8px',
  margin: '5px 0',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const textareaStyles = {
  ...inputStyles,
  resize: 'none',
};

const labelStyles = {
  display: 'block',
  marginBottom: '10px',
  fontSize: '16px',
};

const saveButtonStyles = {
  backgroundColor: '#2ecc71',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '20px',
};

export default OverlayCardEdit;
