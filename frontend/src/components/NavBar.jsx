import React from 'react'
import { FaSearch } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import '../styles/NavBar.css'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import SearchNavbar from "./SearchNavbar";

function NavBar() {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/flowers"); // Replace "/flowers" with your desired path
  };
  return (
    <>
    <div>
    <nav>
        <a href='/' className='brand'>Giftshop</a>
       
        <ul className='nav_menu'>
            <li className='nav_item'><Button  variant="outline-light"><MdLogin /></Button></li>
            <li className='nav_item'><Button variant="outline-light"><FaSearch /></Button></li>
            <li className='nav_item'><Button variant="outline-light"><FaShoppingBag /></Button></li>
        </ul>
        
    </nav>
    <nav>
       
        <ul className='nav_menu'>
            <li className='nav_item2'><Button variant="outline-secondary" onClick={handleRedirect}>Flowers</Button></li>
            <li className='nav_item2'><Button variant="outline-secondary" >Cosmetic Products</Button></li>
            <li className='nav_item2'><Button  variant="outline-secondary">Chocolate</Button></li>
            <li className='nav_item2'><Button  variant="outline-secondary">Occasion</Button></li>
            <li className='nav_item2'><Button  variant="outline-secondary">Gift Set</Button></li>
            <li className='nav_item2'><Button  variant="outline-secondary">Handmade Gift</Button></li>
        </ul>
    </nav>
    </div>
    </>
  )
}

export default NavBar