import React, { useState,useEffect } from 'react';
import '../styles/cards.css'; // Add the CSS here
import mom from '../assets/moms.jpg';
import Card from 'react-bootstrap/Card';
import flo from '../assets/flo.jpg';
import Button from 'react-bootstrap/Button';
import motherday from "../assets/Motherday.png"
import mother from "../assets/momo.jpg"
import birthday from "../assets/birthday.png"
import valentine from '../assets/vv.png'
function RotatingCard({ title, frontImage, backContent }) {
  return (
    
    <div className="rotating-card">
      {/* Front Side */}
      <div className="card-side front " style={{backgroundColor:"rgb(255 255 255)"}} >
        <img src={frontImage} alt="Front" style={{ width: '100%', height: '100%', objectFit: 'cover', }} />
        <div  style={{fontSize:"30px",fontFamily:"Anton",textTransform:"uppercase",color:"black",}}>{title}</div>
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
    }, 3000); 

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  const activeCardData = cards[activeCard];
  return (
    <>
    <div style={{ display: 'flex', gap: '100px', padding: '20px',marginLeft:"180px",marginTop:"112px" }}>
      <RotatingCard
        title="Mother Day"
        frontImage={motherday}
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
                marginTop:'20px',
                fontSize:"20px"
              }}
            >
              <h2>{activeCardData.price}</h2>
              <Button size='lg' style={{backgroundColor:"black",borderColor:"black"}}>Go shop</Button>
            </div>
          </Card>
        </div>
          
        }
      />
      <RotatingCard
        title="Birthday"
        frontImage={birthday}
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
               marginTop:'20px',
               fontSize:"20px"
             }}
           >
             <h2>{activeCardData.price}</h2>
             <Button size='lg'  style={{backgroundColor:"black",borderColor:"black"}}>Go shop</Button>
           </div>
         </Card>
       </div>
         
       }
      />
      <RotatingCard
        title="Valentine Day"
        frontImage={valentine}
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
               marginTop:'20px',fontSize:"20px"
             }}
           >
             <h2>{activeCardData.price}</h2>
             <Button size='lg' style={{backgroundColor:"black",borderColor:"black"}}>Go shop</Button>
           </div>
         </Card>
       </div>
         
       }
      />
      
    </div>
    <div className='stock-ticker'>
      <ul>
        <li>Check products by Gategory</li>
        <li>Check products by Gategory</li>
        <li>Mother Day</li>
        <li>Birthday</li>
        <li>Valentine Day</li>
        <li>Check products by Gategory</li>
        <li>Check products by Gategory</li>
        
      </ul>

    </div>
        

     
    </>
  );
}

export default Cards;