import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage1 from './ExampleCarouselImage1';
import choclateImage from "../assets/realcho.jpg";
import choca from "../assets/choclate.png"
function Carousels() {
  return (
    <Carousel style={{backgroundColor:'green', height:'500px'}}>
        <Carousel.Item>
            
        <img src={choclateImage} style={{objectFit:"cover",height:"500px",width:"1800px"}} alt="" />

        <Carousel.Caption >
          <h3 style={{fontSize:"85px",backgroundColor:"grey",padding:"20px", marginBottom:"200px"}}>giftshop</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            
        <img src={choclateImage} style={{objectFit:"cover",height:"500px",width:"1800px"}} alt="" />

        <Carousel.Caption >
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
        </Carousel.Item>

        

    </Carousel>
  )
}

export default Carousels;