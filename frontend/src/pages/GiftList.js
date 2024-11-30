import React, { useState } from 'react';
import ListOfIcons from '../components/ListOfIcons';
import GiftCard from '../components/GiftCard';
import { MdLogin } from "react-icons/md";
import { FaSearch, FaShoppingBag } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import '../styles/NavBar.css';

function GiftList({ products }) {
  const [visibleItems, setVisibleItems] = useState(5); // Initially show 5 items
  const [loading, setLoading] = useState(false); // Track loading state

  // Function to show more items
  const showMoreItems = () => {
    setLoading(true); // Start loading when Show More is clicked

    // Simulate loading time (e.g., 1 second delay)
    setTimeout(() => {
      setVisibleItems((prev) => prev + 5); // Increase visible items by 5
      setLoading(false); // Stop loading after delay
    }, 1000); // Adjust the delay as needed
  };

  return (
    <>
      <nav>
        <a href="/" className="brand">Giftshop</a>
        <ul className="nav_menu">
          <li className="nav_item">
            <Button variant="outline-light"><MdLogin /></Button>
          </li>
          <li className="nav_item">
            <Button variant="outline-light"><FaSearch /></Button>
          </li>
          <li className="nav_item">
            <Button variant="outline-light"><FaShoppingBag /></Button>
          </li>
        </ul>
      </nav>

      <div style={{ marginTop: "-20px" }}>
        <ListOfIcons />

        <div
          style={{
            display: "flex",
            gap: "50px",
            marginTop: "100px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {products.slice(0, visibleItems).map((product) => (
            <GiftCard
              key={product.id} // Add a key prop to prevent React warnings
              product={product}
              subImage1={product.subImage1}
              subImage2={product.subImage2}
              subImage3={product.subImage3}
            />
          ))}
        </div>

        {/* Show More Button */}
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Spinner animation="grow" />
          </div>
        ) : (
          !loading && visibleItems < products.length && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button variant="primary" onClick={showMoreItems}>
                Show More
              </Button>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default GiftList;
