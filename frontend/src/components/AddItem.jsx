import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard/AddItem.css';

function AddItem() {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    brand: '',
    price: '',
    description: '',
    imageURL: '',
    subImageURL1: '',
    subImageURL2: '',
    quantity: '',
    tags: [],
    reviews:[]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagChange = (e) => {
    const tagsArray = e.target.value.split(',').map((tag) => tag.trim());
    setFormData({
      ...formData,
      tags: tagsArray,
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          [type]: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9002/api/products', formData); 
      alert("Product added successfully:");
      setFormData({
        category: '',
        title: '',
        brand: '',
        price: '',
        description: '',
        imageURL: '',
        subImageURL1: '',
        subImageURL2: '',
        quantity: '',
        tags: [],
        reviews:[]
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    }
  };
  

  

  return (
    <div className="add-item-form">
      
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

      
        <div className="form-group">
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>

       
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        {/* Drag-and-Drop Section */}
        <div className="drag-drop-section">
          {['imageURL', 'subImageURL1', 'subImageURL2'].map((field) => (
            <div
              key={field}
              className="drag-drop-container"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, field)}
            >
              {formData[field] ? (
                <img src={formData[field]} alt="Uploaded Preview" className="image-preview" />
              ) : (
                <p>Drag an image here or paste a URL</p>
              )}
              <input
                type="url"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder="Paste a URL here"
                required
              />
            </div>
          ))}
        </div>

        {/* Quantity */}
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        {/* Tags */}
        <div className="form-group">
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags.join(', ')}
            onChange={handleTagChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
}

export default AddItem;
