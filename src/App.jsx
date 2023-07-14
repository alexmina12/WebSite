import React from 'react';
import './App.css';
import { Nav } from './components/Navigation/NavigationBar';
import { Card } from './components/ShopItemCard/ItemCard.jsx';
import { Footer } from './components/Footer/Footer.jsx';

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Card />
      <Footer />
    </div>
  );
}

export default App;
