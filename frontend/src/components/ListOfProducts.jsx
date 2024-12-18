import React, { useEffect, useState } from 'react';
import ViewProductModal from './ViewProductModal';
import '../styles/Dashboard/Products.css';
import bag from '../assets/bag.png'
import category from '../assets/application.png'
import axios from 'axios';

function ListOfProducts({ isSidebarOpen }) {

    
        const [products, setProducts] = useState([]); 
      
        
        useEffect(() => {
          const fetchProducts = async () => {
            try {
              const response = await axios.get('http://localhost:9002/api/allproducts');
              const fetchedProducts = Array.isArray(response.data.products) ? response.data.products : [];
              console.log(response)
              setProducts(fetchedProducts);
            } catch (error) {
              console.error('Error fetching products:', error);
            }
          };
      
          fetchProducts();
        }, []);

        const handleView = (product) => {
            console.log('Viewing ');
            // Implement view logic (e.g., navigate to a product details page)
          };
          
          const handleEdit = (product) => {
            console.log('Editing product');
            // Implement edit logic (e.g., open an edit form or navigate to an edit page)
          };
          
          const handleDelete = async (product) => {
            try {
              const confirmed = window.confirm(`Are you sure you want to delete "${product.title}"?`);
              if (!confirmed) return; 
          
              console.log('Deleting product:', product._id);
          
              const response = await axios.delete(`http://localhost:9002/api/products/${product._id}`);
          
              console.log(response.data.msg); 
          
              
              setProducts((prevProducts) => prevProducts.filter((p) => p.title !== product.title));
          
            } catch (error) {
              console.error('Error deleting product:', error);
              alert('Failed to delete the product. Please try again.');
            }
          };
    
    
  return (
  <>
  
    <span className='span-da'>
        <div class={`card-da ${isSidebarOpen ? 'open' : ''}`}>
            <div class="card-content">
                <div class="card-number">{products.length}</div>
                <div class="card-text">Total Products</div>
            </div>
            <div class="card-icon">
                <img src={bag} alt="icon" />
            </div>
        </div>

        <div class={`card1-da ${isSidebarOpen ? 'open' : ''}`}>
            <div class="card-content">
                <div class="card-number">5</div>
                <div class="card-text">Total categories</div>
            </div>
            <div class="card-icon">
                <img src={category} alt="icon" />
            </div>
        </div>
    </span>

    <div className={`table-container ${isSidebarOpen ? 'open' : ''}`}>
  
  <table className={`table-da ${isSidebarOpen ? 'open' : ''}`}>
    <thead>
      <tr>
        <th>TITLE</th>
        <th>CATEGORY</th>
        <th>BRAND</th>
        <th>PRICE</th>
        <th>DESCRIPTION</th>
        <th>RATING</th>
        <th>QUANTITY</th>
        <th>ACTION</th> {/* New column for Action */}
      </tr>
    </thead>
    <tbody>
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product, index) => (
          <tr key={index}>
            <td style={{ //display: 'flex',
             alignItems: 'center', width: '250px' }}>
                <div style={{display:'flex',alignItems: 'center'}}>
              <img 
                src={product.imageURL} 
                alt={product.title} 
                style={{ width: '50px', height: '50px', marginRight: '10px' }} 
              />
              {product.title}
              </div>
            </td>
            <td>{product.category}</td>
            <td>{product.brand}</td>
            <td>${product.price.toFixed(2)}</td>
            <td className='td-des'>{product.description}</td>
            <td>⭐ {product.rating}</td>
            <td>{product.quantity}</td>
            <td 
  style={{ 
    marginTop: '0px',
    textAlign: 'center', 
    width: '200px', 
    //display: 'flex', 
    alignItems: 'center', // Ensures buttons are vertically centered
    justifyContent: 'center', // Centers buttons horizontally
    gap: '5px', // Adds spacing between buttons
  }}
>
  <button 
    onClick={(e) => { 
      e.stopPropagation(); 
      handleView(product); 
    }} 
    style={{
      padding: '6px 10px', // Slightly smaller padding
      borderRadius: '5px', 
      border: 'none',
      backgroundColor: '#17a2b8',
      color: 'white',
      cursor: 'pointer',
      boxSizing: 'border-box', // Prevents padding from increasing size
    }}
    title="View Product"
  >
    <i className="fas fa-eye"></i>
  </button>

  <button 
    onClick={(e) => { 
      e.stopPropagation(); 
      handleEdit(product); 
    }} 
    style={{
      padding: '6px 10px', 
      borderRadius: '5px', 
      border: 'none',
      backgroundColor: '#ffc107',
      color: 'white',
      cursor: 'pointer',
      boxSizing: 'border-box', // Prevents padding from increasing size
    }}
    title="Edit Product"
  >
    <i className="fas fa-pencil-alt"></i>
  </button>

  <button 
    onClick={(e) => { 
      e.stopPropagation(); 
      handleDelete(product); 
    }} 
    style={{
       
      padding: '6px 10px', // Slightly smaller padding
      borderRadius: '5px', 
      border: 'none',
      backgroundColor: '#dc3545',
      color: 'white',
      cursor: 'pointer',
      boxSizing: 'border-box', // Prevents padding from increasing size
    }}
    title="Delete Product"
  >
    <i className="fas fa-trash-alt"></i>
  </button>
</td>


 
          </tr>
        ))
      ) : (
        <tr><td colSpan="8">No products available</td></tr>
      )}
    </tbody>
  </table>
</div>


    
    </>
    
  );}


export default ListOfProducts;