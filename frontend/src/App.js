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
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken');
    return token ? children : <Navigate to="/signIn" />;
  };

  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}> </Route>
          <Route path='/Flowers' element={<GiftList products={listflowers}/>}> </Route>
          <Route path='/Flowers/:id' element={<ProductDetails products={listflowers} handleSumDecrement={handleSumDecrement} 
          handleDecrement={handleDecrement} handleIncrement={handleIncrement} handleSumIncrement={handleSumIncrement}/>}> </Route>

          <Route path='/Chocolates' element={<GiftList products={chocolates}/>}> </Route>
          <Route path='/chocolates/:id' element={<ProductDetails products={chocolates}/>}> </Route>
          <Route path='/SignUp' element={<SignUp />}> </Route>
          <Route path='/SignIn' element={<SignIn />}> </Route>



        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
