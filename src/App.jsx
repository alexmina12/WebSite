import React from 'react';
import './App.css';
import { Nav } from './components/navigation/NavigationBar';
import { Card } from './components/shopItemCard/ItemCard';

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Card />
    </div>
  );
}

export default App;
