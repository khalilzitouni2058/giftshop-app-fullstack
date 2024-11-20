import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { StarFill, StarHalf, Star } from "react-bootstrap-icons"; // For star icons


function GiftCard({product}) {
  
  const {name , image , price , rating } = product

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Full stars
    const halfStar = rating % 1 !== 0; // Half star if rating is not an integer
    const emptyStars = 5 - Math.ceil(rating); // Remaining empty stars

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {Array.from({ length: fullStars }, (_, index) => (
          <StarFill key={`full-${index}`} color="gold" size={20} />
        ))}
        {halfStar && <StarHalf color="gold" size={20} />}
        {Array.from({ length: emptyStars }, (_, index) => (
          <Star key={`empty-${index}`} color="lightgray" size={20} />
        ))}
      </div>
    );
  };
  
    return (
    <Card className='GiftCard'>
      <Card.Img variant="top" style={{height:"auto",width:"auto"}}src={image} />
      <Card.Body>
        <Card.Text style={{position:"center"}}>
          {name}
        </Card.Text>

        <div style={{ textAlign: "center", margin: "15px 0" }}>{renderStars(rating)}</div>
        <div style={{display:"flex", justifyContent:"space-between",alignItems:"flex-end" }}><Card.Text style={{fontSize:"24px", fontWeight:"650" }}>
          {price}
        </Card.Text>
        <Button style={{height:"50px", fontSize:"20px",fontWeight:"2px"}} variant="success">purchase</Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default GiftCard ;