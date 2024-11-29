import React from 'react'
import NavBar from '../components/NavBar'
import ListOfIcons from '../components/ListOfIcons'
import GiftCard from '../components/GiftCard'
import { useState } from 'react'
import { Navbar } from 'react-bootstrap'

function GiftList({products}) {

  
  return (
  <>

  <NavBar />

   
    <div style={{}}>
    <ListOfIcons />
<div style={{ display: "flex", gap: "50px", marginTop:"100px",justifyContent:"center", flexWrap:"wrap" }}>
{products.map((product) =>( <GiftCard product={product} subImage1={product.subImage1}
subImage2={product.subImage2}
subImage3={product.subImage3}/>))}


</div>
    
    
</div>
</>)
}

export default GiftList