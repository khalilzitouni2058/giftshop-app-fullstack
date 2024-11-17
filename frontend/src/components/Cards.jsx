import React from 'react'
import Card from 'react-bootstrap/Card';
import mother from "../assets/mother.jpg"
import CardGroup from 'react-bootstrap/CardGroup'
import mom from '../assets/moms.jpg'
function Cards() {
  return (
    <CardGroup style={{padding:'60px',marginRight :'5px',gap:'80px'}}>
    <Card style={{ width: '5rem' }}>
      <Card.Img variant="top" src={mother} />
      <Card.ImgOverlay>
      
        <Card.Title>Card Title</Card.Title>
        
        </Card.ImgOverlay>
     
    </Card>
    <Card style={{ width: '5rem' }}>
      <Card.Img variant="top" src={mother} />
      <Card.ImgOverlay>
      
        <Card.Title>aaa</Card.Title>
        
        </Card.ImgOverlay>
     
    </Card>
    <Card style={{ width: '5rem' }}>
      <Card.Img variant="top" src={mother} />
      <Card.ImgOverlay>
      
        <Card.Title>aaa</Card.Title>
        
        </Card.ImgOverlay>
     
    </Card>
    </CardGroup>
  )
}

export default Cards