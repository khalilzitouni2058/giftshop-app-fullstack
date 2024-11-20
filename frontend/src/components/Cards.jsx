import React, { useState,useEffect } from 'react';
import '../styles/cards.css'; // Add the CSS here
import mom from '../assets/moms.jpg';
import Card from 'react-bootstrap/Card';
import flo from '../assets/flo.jpg';
import Button from 'react-bootstrap/Button';



function RotatingCard({ title, frontImage, backContent }) {
  return (
    <div className="rotating-card">
      {/* Front Side */}
      <div className="card-side front">
        <img src={frontImage} alt="Front" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="card-title">{title}</div>
      </div>

      {/* Back Side */}
      <div className="card-side back">
        {backContent}
      </div>
    </div>
  );
}

function Cards() {
  const [activeCard, setActiveCard] = useState(0);
  const handleSwipe = () => {
    // Toggle between card 0 and card 1
    setActiveCard((prevCard) => (prevCard === 0 ? 1 : 0));
  };
  const cards = [
    {
      id: 1,
      image: flo, 
      title: "Flower Bouquet Box Gifts 1",
      price: "40 DT",
    },
    {
      id: 2,
      image: flo, 
      title: "Flower Bouquet Box Gifts 3 ",
      price: "20 DT",
    },
  ];
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveCard((prevCard) => (prevCard === 0 ? 1 : 0));
    }, 3000); // Change card every 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  const activeCardData = cards[activeCard];
  return (
    <div style={{ display: 'flex', gap: '220px', padding: '20px' }}>
      <RotatingCard
        title="Card 1"
        frontImage={mom}
        backContent={
          
           
           <div
          className="card-side back"
          style={{
            
          }}
        >
          <Card className='rotating-card'>
            <Card.Img variant="top" src={activeCardData.image} />
            <Card.Text className="custom-heading">{activeCardData.title}</Card.Text>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 10px 100px",
                marginTop:'60px'
              }}
            >
              <h2>{activeCardData.price}</h2>
              <Button size='lg'>Go shop</Button>
            </div>
          </Card>
        </div>
          
        }
      />
      <RotatingCard
        title="Card 2"
        frontImage={mom}
        backContent={
          
           
          <div
         className="card-side back"
         style={{
           
         }}
       >
         <Card className='rotating-card'>
           <Card.Img variant="top" src={activeCardData.image} />
           <Card.Text className="custom-heading">{activeCardData.title}</Card.Text>
           <div
             style={{
               display: "flex",
               alignItems: "center",
               justifyContent: "space-between",
               padding: "0 10px 100px",
               marginTop:'60px'
             }}
           >
             <h2>{activeCardData.price}</h2>
             <Button size='lg'>Go shop</Button>
           </div>
         </Card>
       </div>
         
       }
      />
      <RotatingCard
        title="Card 3"
        frontImage={mom}
        backContent={
          
           
          <div
         className="card-side back"
         style={{
           
         }}
       >
         <Card className='rotating-card'>
           <Card.Img variant="top" src={activeCardData.image} />
           <Card.Text className="custom-heading">{activeCardData.title}</Card.Text>
           <div
             style={{
               display: "flex",
               alignItems: "center",
               justifyContent: "space-between",
               padding: "0 10px 100px",
               marginTop:'60px'
             }}
           >
             <h2>{activeCardData.price}</h2>
             <Button size='lg'>Go shop</Button>
           </div>
         </Card>
       </div>
         
       }
      />
    </div>
  );
}

export default Cards;