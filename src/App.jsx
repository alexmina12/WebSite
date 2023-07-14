
import './App.css';
import { Nav } from './components/Navigation/NavigationBar';
import { Card, logJSONData } from './components/ShopItemCard/ItemCard.jsx';
import { Footer } from './components/Footer/Footer.jsx';

import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import About from './components/About/about';
import Login from './components/Login/login';
import Details from '../src/components/cardDetails/Details';

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

      <Card />

      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:brand/:id" element={<Details phones={phones} />} />
      </Routes>

      <Footer />

    </div>
  );
};

export default App;
