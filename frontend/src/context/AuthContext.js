import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userName', userData.userName);
    localStorage.setItem('userRole', userData.role);//added by alaa
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');// added by alaa
    localStorage.removeItem('user'); // Ensure user is cleared from localStorage
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

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem('user', JSON.stringify(updatedUserData)); // Update user data in localStorage
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('userRole');  
    if (storedUser && token) {
      setUser({ ...JSON.parse(storedUser), role });//modified by alaa
    }
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, cart, addToCart, removeFromCart, resetCart, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
