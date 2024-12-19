import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import choclateImage from "../assets/realcho.jpg";
import choho from "../assets/choho.jpg";
import floflo from "../assets/floflo.jpg";
import '../styles/carousel.css';
import choclate from "../assets/Belgian1.png";
import belguin1 from "../assets/choclatebelguin.jpg"
import belguin2  from "../assets/builguin2.jpg"
import belguin3  from "../assets/builguin3.jpg"
import belguin4  from "../assets/builguin4.jpg"
import { useNavigate } from 'react-router-dom';
function Carousels() {
  const products = [
    { id: 1, img: belguin1, name: "Belgian Dark Chocolate", price: " TND 15.99" },
    { id: 2, img: belguin2, name: "Milk Chocolate Delight", price: " TND 12.99" },
    { id: 3, img: belguin3, name: "White Chocolate Bliss", price: " TND 14.99" },
    { id: 4, img: belguin4, name: "Hazelnut Chocolate", price: " TND 16.99" },
    
  ];
  const navigate = useNavigate()
  const handleshop = () =>{
    navigate("/Chocolate")

  }

  return (
    <Carousel controls={false} indicators={false}>
      <Carousel.Item
        style={{
          position: "relative",
          backgroundColor: "rgba(169,138,123,1)", 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          overflow: "hidden",
          width: "1540px",
        }}
      >
        <img
          src={choclate}
          alt="Background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 1,
            zIndex: 0,
          }}
        />

        <div
          style={{
            textAlign: "center",
            color: "black",
            zIndex: 1,
          }}
        >
          <h3
            style={{
              fontSize: "65px",
              textTransform: "uppercase",
              fontFamily: "Anton, sans-serif",
              color: "black",
            }}
          >
            Authentic Belgian Chocolates
          </h3>
          <h2
            style={{
              fontSize: "35px",
              textTransform: "uppercase",
              fontFamily: "Anton, sans-serif",
              color: "#FFFFCC",
            }}
          >
            hand packed with pride
          </h2>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "18px",
              marginTop: "20px",
              backgroundColor: "#ffffff",
              color: "#000000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
            onClick={() =>handleshop()}
          >
            Shop Now
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
            overflow: "hidden",
            marginTop: "50px",
           
            
            
          }}
          className="product-cards"
        >
          {products.map((product) => (
            <div key={product.id} className="Card">
              <img src={product.img} alt={product.name} />
              <h4>{product.name}</h4>
              <p>{product.price}</p>
              <button onClick={handleshop}>Buy Now</button>
            </div>
          ))}
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;
