import React, { useContext,useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import '../styles/NavBar.css'
import Button from 'react-bootstrap/Button';
import { useNavigate,useLocation  } from "react-router-dom";
import SearchNavbar from "./SearchNavbar";
import { AuthContext } from '../context/AuthContext';
import logoHedya from "../assets/logoHedya.jpg"
function NavBar() {
  const { user, logout } = useContext(AuthContext);
 
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  console.log(isHomePage)
  const { cart,resetCart } = useContext(AuthContext);
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const togglePopover = () => {
    setPopoverVisible((prev) => !prev);
  };

  
  const handleOutsideClick = (event) => {
    if (!event.target.closest(".cart-popover-container")) {
      setPopoverVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
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
        <a href='/' className='brand'><img style={{width:"100px",marginTop:'50px'}} src={logoHedya}alt="" /></a>
       
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
            <li className="nav_item" style={{ position: "relative" }}>
  <Button
    variant="outline-light"
    onClick={(e) => {
      e.stopPropagation(); // Prevents click from closing the popover
      setPopoverVisible((prev) => !prev); // Toggles the popover
    }}
  >
    <FaShoppingBag />
    {cart.length}
  </Button>
  {isPopoverVisible && (
    <div
      style={{
        position: "absolute",
        top: "50px",
        right: "0",
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        width: "300px",
        zIndex: 1000,
        
      }}
    >
      <div
        style={{
          padding: "10px",
          borderBottom: "1px solid #f0f0f0",
          fontWeight: "bold",
          fontSize: "16px",
          color:"black"
        }}
      >
        Cart Items
      </div>
      
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "4px",
                  marginRight: "10px",
                }}
              />
              <div style={{ flex: 1 }}>
                {/* Product Name */}
                <span style={{ fontSize: "14px", fontWeight: "bold",color:"black" }}>
                  {item.name}
                </span>
                <br />
                {/* Product Quantity and Total Price */}
                <span style={{ fontSize: "14px", color: "#555" }}>
                  Quantity: {item.qte} × ${item.price.toFixed(2)} = $
                  {(item.qte * item.price).toFixed(2)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: "20px", textAlign: "center", color: "#888" }}>
            Your cart is empty.
          </div>
        )}
      </div>
      {cart.length > 0 && (
        <div style={{ padding: "10px" ,display:"flex",gap:"10px"}}>
          <button
            style={{
              width: "50%",
              backgroundColor: "black",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginLeft:"-20px"
              
            }}
            onClick={() => alert("Proceed to Checkout")}
          >
            Checkout
          </button>
          <button
            style={{
              width: "40%",
              backgroundColor: "black",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={resetCart}
          >
            Reset Card
          </button>
        </div>
      )}
    </div>
  )}
</li>
        </ul>
        
    </nav>
    <nav>
       {isHomePage && ( // Conditionally render the navbar if on the home page
                <ul className="nav_menu">
                    <li className="nav_item2">
                        <Button variant="outline-secondary" onClick={handleRedirect}>
                            Flowers
                        </Button>
                    </li>
                    <li className="nav_item2">
                        <Button variant="outline-secondary">Cosmetic Products</Button>
                    </li>
                    <li className="nav_item2">
                        <Button variant="outline-secondary">Chocolate</Button>
                    </li>
                    <li className="nav_item2">
                        <Button variant="outline-secondary">Occasion</Button>
                    </li>
                    <li className="nav_item2">
                        <Button variant="outline-secondary">Gift Set</Button>
                    </li>
                    <li className="nav_item2">
                        <Button variant="outline-secondary">Handmade Gift</Button>
                    </li>
                </ul>
            )}
    </nav>
    </div>
    </>
  )
}

export default NavBar