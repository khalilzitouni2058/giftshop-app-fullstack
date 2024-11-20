import React from 'react'
import NavBar from '../components/NavBar'
import ListOfIcons from '../components/ListOfIcons'
import { products } from '../assets/ProductData'
import GiftCard from '../components/GiftCard'

function GiftList() {
  return (<>
    <NavBar/>
    <ListOfIcons />
<div style={{ display: "flex", gap: "50px", marginTop:"100px", justifyContent:"center", flexWrap:"wrap" }}>
{products.map((product) =>( <GiftCard product={product}/>))}

</div>
    
    
</>)
}

export default GiftList