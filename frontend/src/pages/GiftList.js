import React from 'react'
import NavBar from '../components/NavBar'
import ListOfIcons from '../components/ListOfIcons'
import GiftCard from '../components/GiftCard'
import { useState } from 'react'
import { Navbar } from 'react-bootstrap'
import { FaSearch } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
function GiftList({products}) {

  
  return (
  <>

<nav>
        <a href='/' className='brand'>Giftshop</a>
       
        <ul className='nav_menu'>
            <li className='nav_item'><Button  variant="outline-light"><MdLogin /></Button></li>
            <li className='nav_item'><Button variant="outline-light"><FaSearch /></Button></li>
            <li className='nav_item'><Button variant="outline-light"><FaShoppingBag /></Button></li>
        </ul>
        
    </nav>

   
    <div style={{marginTop:"-20px"}}>
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