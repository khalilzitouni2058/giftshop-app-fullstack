import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/Home';
import GiftList from './pages/GiftList';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}> </Route>
          <Route path='/List' element={<GiftList/>}> </Route>
          <Route path='/Flowers' element={<GiftList/>}> </Route>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
