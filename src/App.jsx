import React from 'react';
import './App.css';
import { Nav } from './components/Navigation/NavigationBar';
import { Card } from './components/ShopItemCard/ItemCard';
// import { Router } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Card />
    </div>
  );
}

export default App;
