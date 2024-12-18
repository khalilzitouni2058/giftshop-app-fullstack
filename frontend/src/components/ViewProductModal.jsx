import React, { useState } from 'react';

const ViewProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-header">Product Details</div>
        <div className="modal-body">
          <img src={product.imageURL} alt={product.title} />
          <p><strong>Title:</strong> {product.title}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Rating:</strong> {product.rating} / 5</p>
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;