import React from 'react'
import choclateImage from "../assets/choclate.png";
function ExampleCarouselImage1({text}) {
  return (
    <>
    <div>{text}
    </div>
    <img src={choclateImage} alt="" style={{height:"50vh"}} />
    </>
  )
}

export default ExampleCarouselImage1