import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Nav } from './components/navigation/NavigationBar';
import { Card, logJSONData } from './components/shopItemCard/ItemCard';
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
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:brand/:id" element={<Details phones={phones} />} />
      </Routes>
    </div>
  );
};

export default App;
