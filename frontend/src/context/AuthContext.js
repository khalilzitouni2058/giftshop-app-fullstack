import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userName', userData.userName);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
  };
  const addToCart = (item) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, item];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  
  const removeFromCart = (itemIndex) => {
    
    setCart((prevCart) => {
      
      const updatedCart = prevCart.filter((_, index) => index !== itemIndex);
      
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  const resetCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
    } 
  };

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    const token = localStorage.getItem('accessToken');
    if (storedUserName && token) {
      setUser({ userName: storedUserName });
    }
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, cart, addToCart, removeFromCart,resetCart }}>
      {children}
    </AuthContext.Provider>
  );
};
