import React, { useEffect, useState } from 'react';
import OverlayCard from './OverlayCard';
import OverlayCardEdit from './OverlayCardEdit';
import '../styles/Dashboard/Products.css';
import bag from '../assets/bag.png';
import category from '../assets/application.png';
import axios from 'axios';

function ListOfProducts({ isSidebarOpen }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:9002/api/allproducts');
        const fetchedProducts = Array.isArray(response.data.products) ? response.data.products : [];
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleView = (product) => setSelectedProduct(product);
  const closeOverlay = () => setSelectedProduct(null);

  const handleEdit = (product) => setEditProduct(product);
  const closeEditOverlay = () => setEditProduct(null);

  const handleSaveEdit = async (updatedProduct) => {
    try {
      const response = await axios.put(`http://localhost:9002/api/products/${updatedProduct._id}`, updatedProduct);
      if (response.data) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === updatedProduct._id ? updatedProduct : product
          )
        );
      }
      closeEditOverlay();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (product) => {
    try {
      const confirmed = window.confirm(`Are you sure you want to delete "${product.title}"?`);
      if (!confirmed) return;

      await axios.delete(`http://localhost:9002/api/products/${product._id}`);
      setProducts((prevProducts) => prevProducts.filter((p) => p._id !== product._id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete the product. Please try again.');
    }
  };

  return (
    <>
      <span className="span-da">
        <div className={`card-da ${isSidebarOpen ? 'open' : ''}`}>
          <div className="card-content">
            <div className="card-number">{products.length}</div>
            <div className="card-text">Total Products</div>
          </div>
          <div className="card-icon">
            <img src={bag} alt="icon" />
          </div>
        </div>

        <div className={`card1-da ${isSidebarOpen ? 'open' : ''}`}>
          <div className="card-content">
            <div className="card-number">5</div>
            <div className="card-text">Total Categories</div>
          </div>
          <div className="card-icon">
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
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
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
                  <td className="td-des">{product.description}</td>
                  <td>⭐ {product.rating}</td>
                  <td>{product.quantity}</td>
                  <td  style={{ justifyContent: 'center', gap: '5px',width:"200px" }}>
                    <button
                      onClick={() => handleView(product)}
                      style={{ backgroundColor: '#17a2b8', color: 'white' }}
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(product)}
                      style={{ backgroundColor: '#ffc107', color: 'white' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      style={{ backgroundColor: '#dc3545', color: 'white' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No products available</td>
              </tr>
            )}
          </tbody>
        </table>

        {selectedProduct && <OverlayCard product={selectedProduct} onClose={closeOverlay} />}
        {editProduct && (
          <OverlayCardEdit product={editProduct} onClose={closeEditOverlay} onSave={handleSaveEdit} />
        )}
      </div>
    </>
  );
}

export default ListOfProducts;
