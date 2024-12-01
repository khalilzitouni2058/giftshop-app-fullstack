import React, { useContext } from 'react'
import { FaSearch } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import '../styles/NavBar.css'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import SearchNavbar from "./SearchNavbar";
import { AuthContext } from '../context/AuthContext';
function NavBar() {
  const { user, logout } = useContext(AuthContext);
 
  
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/flowers"); // Replace "/flowers" with your desired path
  };
  const goSignIn = () => {
    navigate("/SignIn"); // Replace "/flowers" with your desired path
  };
  return (
    <>
    <div>
    <nav>
        <a href='/' className='brand'>Giftshop</a>
       
        <ul className='nav_menu'>
            
        <li className='nav_item'>
      {user ? (
        <div style={{ display: "flex", alignItems: "center", marginLeft: "2px", textTransform: "uppercase" }}>
          <span style={{ marginRight: "15px",color:"black",fontSize:"16px" }}>Hello, {user.userName}</span>
          <Button
            onClick={logout}
            variant="outline-light"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "2px",
              textTransform: "uppercase"
            }}
          >
            
            Logout
          </Button>
        </div>
      ) : (
        <Button
          onClick={goSignIn}
          variant="outline-light"
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "2px",
            textTransform: "uppercase"
          }}
        >
          Log In <MdLogin style={{ marginLeft: "15px" }} />
        </Button>
      )}
    </li>
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