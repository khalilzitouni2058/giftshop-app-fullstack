    import React, { useEffect, useState } from 'react';
    import OverlayCard from './OverlayCard';
    import OverlayCardEdit from './OverlayCardEdit';
    import '../styles/Dashboard/Products.css';
    import bag from '../assets/bag.png'
    import category from '../assets/application.png'
    import axios from 'axios';

    function ListOfProducts({ isSidebarOpen }) {

        
            const [products, setProducts] = useState([]); 
            
            const [editProduct, setEditProduct] = useState(null);
            
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

            const [selectedProduct, setSelectedProduct] = useState(null); 

            const handleView = (product) => {
                setSelectedProduct(product); 
            };

        const closeOverlay = () => {
            setSelectedProduct(null); 
          };
            const closeOverlay = () => {
                setSelectedProduct(null); // Close the overlay
            };

        const handleCloseModal = () => {
            setSelectedProduct(null); 
          };
          
          const handleEdit = (product) => {
            console.log('Editing product');
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
            const handleCloseModal = () => {
                setSelectedProduct(null); 
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

            const handleEdit = (product) => {
                setEditProduct(product); // Open the edit overlay with the selected product
              };

              const closeEditOverlay = () => {
                setEditProduct(null); // Close the edit overlay
              };

              const handleSaveEdit = async (updatedProduct) => {
                try {
                  const response = await axios.put(`http://localhost:9002/api/products/${updatedProduct._id}`, updatedProduct);
                  console.log('Response from server:', response.data);
                  
                  // Check if the response contains the updated product data
                  if (response.data) {
                    // Update the product list with the edited product
                    setProducts((prevProducts) => {
                      console.log('Previous Products:', prevProducts); // Debug the previous products list
                      return prevProducts.map((product) =>
                        product._id === updatedProduct._id ? updatedProduct : product
                      );
                    });
                  }
                  
                  closeEditOverlay(); // Close the overlay after saving
                } catch (error) {
                  console.error('Error updating product:', error);
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
                <th>ACTION</th> 
            </tr>
            </thead>
            <tbody>
            {Array.isArray(products) && products.length > 0 ? (
                products.map((product, index) => (
                <tr key={index}>
                    <td style={{ 
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
                    <td>{product.price.toFixed(2)}</td>
                    <td className='td-des'>{product.description}</td>
                    <td>⭐ {product.rating}</td>
                    <td>{product.quantity}</td>
                    <td 
                        style={{ 
                            marginTop: '0px',
                            textAlign: 'center', 
                            width: '200px', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: '5px', 
                        }}
                    >
                        <button 
                            onClick={(e) => { 
                            e.stopPropagation(); 
                            handleView(product); 
                            }} 
                            style={{
                            padding: '6px 10px', 
                            borderRadius: '5px', 
                            border: 'none',
                            backgroundColor: '#17a2b8',
                            color: 'white',
                            cursor: 'pointer',
                            boxSizing: 'border-box', 
                            }}
                            title="View Product"
                        >
                            <i className="fas fa-eye"></i>
                        </button>
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
                    <th>ACTION</th> 
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
                        <td>{product.price.toFixed(2)}</td>
                        <td className='td-des'>{product.description}</td>
                        <td>⭐ {product.rating}</td>
                        <td>{product.quantity}</td>
                        <td 
                            style={{ 
                                marginTop: '0px',
                                textAlign: 'center', 
                                width: '200px', 
                                //display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                gap: '5px', 
                            }}
                        >
                            <button 
                                onClick={(e) => { 
                                e.stopPropagation(); 
                                handleView(product); 
                                }} 
                                style={{
                                padding: '6px 10px', 
                                borderRadius: '5px', 
                                border: 'none',
                                backgroundColor: '#17a2b8',
                                color: 'white',
                                cursor: 'pointer',
                                boxSizing: 'border-box', 
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
                                    boxSizing: 'border-box', 
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
                                
                                    padding: '6px 10px', 
                                    borderRadius: '5px', 
                                    border: 'none',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    cursor: 'pointer',
                                    boxSizing: 'border-box', 
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
            {selectedProduct && <OverlayCard product={selectedProduct} onClose={closeOverlay} />}
            {editProduct && (<OverlayCardEdit product={editProduct} onClose={closeEditOverlay} onSave={handleSaveEdit}/>)}

        </div>
    </>
        
    );}


    export default ListOfProducts;