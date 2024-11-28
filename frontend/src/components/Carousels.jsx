import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage1 from './ExampleCarouselImage1';
import choclateImage from "../assets/realcho.jpg";
import choho from '../assets/choho.jpg'
import floflo from "../assets/floflo.jpg"
import Card from 'react-bootstrap/Card';
import godivablue from '../assets/godivablue.png'
import Button from 'react-bootstrap/Button';
import godidableusky from '../assets/godivabluesky.png'
import "../styles/carousel.css"
import godivasel from '../assets/godivasel.png'
function Carousels() {
  return (
    <Carousel style={{height:"600px",width:'1920px'}} controls={false} indicators={false}>
        <Carousel.Item style={{backgroundColor:"rgb(251 146 60)",height:"600px",width:'1920px'}} >
          
       

        <div style={{ marginLeft: '1100px', marginTop: '50px', width: '600px',  }}>
  <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginLeft: '15px' }}>
    {/* Product Card 1 */}
    <div className="card-container">
      <div className="shodow-xl text-center">
        <img src={godidableusky} style={{ objectFit: 'cover', width: '600px', height: '300px' }} />
        <div className="card-body bg-amber-800" style={{ height: '150px' }}>
          <p className="card-text text-slate-50" style={{ textTransform: 'uppercase', fontFamily: 'Anton, sans-serif' }}>
            godila
          </p>
          <p className="card-price text-slate-50" style={{ textTransform: 'uppercase', fontFamily: 'Anton, sans-serif' }}>
            $29.99
          </p>
        </div>
      </div>
      {/* Hover Button */}
      <button className="hover-button">Buy Now</button>
    </div>

    {/* Product Card 2 */}
    <div className="card-container">
      <div className="shodow-xl text-center">
        <img src={godivablue} style={{ objectFit: 'cover', width: '600px', height: '300px' }} />
        <div className="card-body bg-amber-900" style={{ height: '150px' }}>
          <p className="card-text text-slate-50" style={{ textTransform: 'uppercase', fontFamily: 'Anton, sans-serif' }}>
            godila
          </p>
          <p className="card-price text-slate-50" style={{ textTransform: 'uppercase', fontFamily: 'Anton, sans-serif' }}>
            $29.99
          </p>
        </div>
      </div>
      {/* Hover Button */}
      <button className="hover-button">Buy Now</button>
    </div>

    {/* Product Card 3 */}
    <div className="card-container">
      <div className="shodow-xl text-center">
        <img src={godivasel} style={{ objectFit: 'cover', width: '600px', height: '300px' }} />
        <div className="card-body bg-amber-950" style={{ height: '150px' }}>
          <p className="card-text text-slate-50" style={{ textTransform: 'uppercase', fontFamily: 'Anton, sans-serif' }}>
            godila
          </p>
          <p className="card-price text-slate-50" style={{ textTransform: 'uppercase', fontFamily: 'Anton, sans-serif' }}>
            $29.99
          </p>
        </div>
      </div>
      {/* Hover Button */}
      <button className="hover-button">Buy Now</button>
    </div>
  </div>
</div>


            
        
        
        <div
  style={{
    position: 'absolute',
    top: '250px',
    left: '35%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',

    color: 'black',
  }}
>
  {/* Title 1 */}
  <h3
    style={{
      fontSize: '65px', // Bigger text
      
      textTransform: 'uppercase', // Make text uppercase
      fontFamily: 'Anton, sans-serif', // Font set to Anton
      color: 'black', // Text color
    }}
  >
    Authentic Belgian Chocolates
  </h3>
  {/* Title 2 */}
  <h2
    style={{
      fontSize: '35px', // Bigger text
      
      textTransform: 'uppercase', // Make text uppercase
      fontFamily: 'Anton, sans-serif', // Font set to Anton
      color: '#FFFFCC', // Text color
    }}
  >
    hand packed with pride
  </h2>
  {/* Button */}
  <button
    style={{
      padding: '10px 20px',
      fontSize: '18px',
      marginTop:"40px",
      backgroundColor: '#ffffff', // White background
      color: '#000000', // Black text
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      textTransform: 'uppercase', 
      fontWeight: 'bold', 
    }}
    onClick={() => alert('Button clicked!')}
  >
    Shop Now
  </button>
</div>
        </Carousel.Item>
        
        
        
        

    </Carousel>
  )
}

export default Carousels;