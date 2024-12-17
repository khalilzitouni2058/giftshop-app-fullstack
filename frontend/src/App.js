import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/Home';
import GiftList from './pages/GiftList';
import { flowers } from './assets/FlowersData';
import { chocolates } from './assets/chocolatesData';
import ProductDetails from './components/ProductDetails';
import { useState } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { AuthProvider } from './context/AuthContext';
import CheckoutPage from './pages/CheckoutPage';
import Profile from './pages/Profile';



import Dashboard from './pages/Dashboard'; // Import the admin dashboard component

// Helper function for ProtectedRoute with roles
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('userRole');

  if (!token) {
    return <Navigate to="/signIn" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" />; // Redirect to home if role doesn't match
  }

  return children;
};
function App() {

  const [listflowers, setflowers] = useState(flowers);
  const [sum, setSum] = useState(0);

  const handleIncrement = (id) => {
    setflowers(
      listflowers.map((elt) => {
        if (elt.id === id) {
          return { ...elt, qte: elt.qte + 1 };
        }
        return elt;
      })
    );
  };
  const handleDecrement = (id) => {
    setflowers(
      listflowers.map((elt) => {
        if (elt.id === id && elt.qte > 0) {
          return { ...elt, qte: elt.qte - 1 };
        }
        return elt;
      })
    );
  };

  const handleSumIncrement = (price) => {
    setSum(sum + price); //setSum(prevSum=>prevSum+price)
  };
  const handleSumDecrement = (article) => {
    if (article.qte > 0) {
      setSum(sum - article.price);
    }
  };
  // const ProtectedRoute = ({ children }) => {
  //   const token = localStorage.getItem('accessToken');
  //   return token ? children : <Navigate to="/signIn" />;
  // };

  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}> </Route>
          <Route path='/Profile' element={<Profile />}> </Route>

          <Route path='/:category' element={<GiftList/>}> </Route>
          <Route path='/:category/:id' element={<ProductDetails   handleSumDecrement={handleSumDecrement} 
          handleDecrement={handleDecrement} handleIncrement={handleIncrement} handleSumIncrement={handleSumIncrement}/>}> </Route>

          <Route path='/SignUp' element={<SignUp />}> </Route>
          <Route path='/SignIn' element={<SignIn />}> </Route>
          <Route path='/checkout' element={<CheckoutPage/>}></Route>
          <Route
              path="/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <Dashboard />
               </ProtectedRoute>
              }
           />



        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
