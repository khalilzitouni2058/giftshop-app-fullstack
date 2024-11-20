import React from 'react'
import NavBar from '../components/NavBar'
import Carousels from '../components/Carousels'
import Cards from '../components/Cards'
import Spline from '@splinetool/react-spline';
import '../styles/home.css'
import Button from 'react-bootstrap/Button';
function Home() {
  return (
    <div>
      
      <NavBar />
      <div style={{height:'620px'}}>
        <div>
          <h1 className='anton-regular' style={{zIndex:"1"}}> Welcome to your favorite  <br />  <Button  className="custom-button">gift shop</Button></h1>
        </div>
        
         
       
<Spline scene="https://prod.spline.design/Edos8XMI2nOBGRVD/scene.splinecode" 
style={{
  position: 'absolute', 
  top: '120px',
  left: '800px',
  width: '700px',
  pointerEvents: 'auto', // Ensure clicks are handled
}}/>
 
  
 
 

        
        
        
      </div>
      
      <Carousels />
    <Cards />
    
       </div>
  )
}

export default Home