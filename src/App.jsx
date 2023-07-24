import './App.css';
import { Nav } from './components/Navigation/NavigationBar';
import { Card, logJSONData } from './components/ShopItemCard/ItemCard.jsx';
import { Footer } from './components/Footer/Footer.jsx';

import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';


import About from './components/About/about';
import Login from './components/Login/login';
import Details from './components/cardDetails/Details';
import Register from './components/Register/Register';
import ClearCache from './components/ClearCache/ClearCache';
import './App.css';

const App = () => {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const phonesData = await logJSONData();
      setPhones(phonesData);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Nav />

      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:brand/:id" element={<Details phones={phones} />} />
        <Route path="/ClearCache" element={<ClearCache />} />
      </Routes>

      
      <Footer />
    </div>
  );
};

export default App;
