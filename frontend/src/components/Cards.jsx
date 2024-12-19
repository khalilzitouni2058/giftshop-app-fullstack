import React, { useState,useEffect } from 'react';
import '../styles/cards.css'; 
import mom from '../assets/moms.jpg';
import Card from 'react-bootstrap/Card';
import flo from '../assets/flo.jpg';
import Button from 'react-bootstrap/Button';
import motherday from "../assets/Motherday.png"
import mother from "../assets/momo.jpg"
import birthday from "../assets/birthday.png"
import valentine from '../assets/vv.png'
import chocaltepassion from "../assets/chocaltepassion.jpg"
import { useNavigate } from 'react-router-dom';
function RotatingCard({ title, frontImage, backContent }) {
  return (
    
    <div className="rotating-card">
      <div className="card-side front " style={{backgroundColor:"rgb(255 255 255)"}} >
        <img src={frontImage} alt="Front" style={{ width: '100%', height: '100%', objectFit: 'cover', }} />
        <div  style={{fontSize:"  30px",fontFamily:"Anton",textTransform:"uppercase",color:"black",}}>{title}</div>
      </div>

      <div className="card-side back">
        {backContent}
      </div>
    </div>
  );
}

function Cards() {
  const [activeCard, setActiveCard] = useState(0);
  const navigate = useNavigate()
  const handlegoshop =() =>{
    navigate("/Flower")
  }
  const handleSwipe = () => {
    setActiveCard((prevCard) => (prevCard === 0 ? 1 : 0));
  };
  const cards = [
    {
      id: 1,
      image: chocaltepassion, 
      title: "Flower Bouquet Box Gifts 1",
      price: "40 DT",
    },
    {
      id: 2,
      image: "https://i.etsystatic.com/6048649/r/il/5e5b79/5093224472/il_794xN.5093224472_azik.jpg", 
      title: "Mini Paper Flower Bouquet",
      price: "12 DT",
    },
    {
      id: 3,
      image: "https://i.postimg.cc/PfYskzGF/34b4824f-8744-42ac-8ecf-d36bc47e8225-f30c90a9696253b5571769db0fd39aba.webp", 
      title: "Lindt Excellence 70% Cocoa Dark Chocolate",
      price: "39.99DT",
    },
    {
      id: 4,
      image: "https://i.etsystatic.com/6048649/r/il/5e5b79/5093224472/il_794xN.5093224472_azik.jpg", 
      title: "Mini Paper Flower Bouquet",
      price: "12 DT",
    },
  ];
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveCard((prevCard) => (prevCard + 1) % cards.length);
    }, 2000); 
  
    return () => clearInterval(intervalId);
  }, [cards.length]); 
  
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
            <Card.Img variant="top" src={activeCardData.image} style={{maxHeight:"200px",objectFit:"cover"}} />
            <Card.Text className="custom-heading"  style={{fontSize:"20px",marginTop:"50px",marginLeft:"10px"}}>{activeCardData.title}</Card.Text>
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
              <Button size='lg' style={{backgroundColor:"black",borderColor:"black",marginBottom:"20px"}} onClick={()=>handlegoshop()}>Go shop</Button>
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
           <Card.Img variant="top" src={activeCardData.image}  style={{maxHeight:"200px",objectFit:"cover"}} />
           <Card.Text className="custom-heading" style={{fontSize:"20px",marginTop:"50px",marginLeft:"10px"}} >{activeCardData.title} </Card.Text>
           <div
             style={{
               display: "flex",
               alignItems: "center",
               justifyContent: "space-between",
               padding: "0 10px 100px",
               marginTop:'20px',
               fontSize:"12px"
             }}
           >
             <h2>{activeCardData.price}</h2>
             <Button size='lg'  style={{backgroundColor:"black",borderColor:"black",marginBottom:"20px"}} onClick={()=>handlegoshop()} >Go shop</Button>
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
           <Card.Img variant="top" src={activeCardData.image} style={{maxHeight:"200px",objectFit:"cover"}} />
           <Card.Text className="custom-heading" style={{fontSize:"20px",marginTop:"50px",marginLeft:"10px"}} onClick={()=>handlegoshop()}>{activeCardData.title}</Card.Text>
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
             <Button size='lg' style={{backgroundColor:"black",borderColor:"black",marginBottom:"20px"}}>Go shop</Button>
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