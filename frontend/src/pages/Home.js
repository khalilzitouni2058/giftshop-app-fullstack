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
      <div style={{height:'780px'}}>
        <div>
          <h1 className='anton-regular'> Welcome to your favorite  <br />  <Button  className="custom-button">gift shop</Button></h1>
        </div>
      <Spline
        scene="https://prod.spline.design/Edos8XMI2nOBGRVD/scene.splinecode" 
        width={847}
        height={712}
        style={{position:"relative",left:'1000px',bottom:'250px'}}
      />
      </div>
      <Carousels />
    <Cards />
       </div>
  )
}

export default Home