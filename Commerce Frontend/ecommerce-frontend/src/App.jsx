import React from 'react';
import Counter from './components/Counter';
import MyNavbar from "./components/MyNavbar/MyNavbar"
import MyFooter from "./components/MyFooter/MyFooter"
import ProductList from './components/ProductList/ProductList';

const App = () => {

  const handleSearchChange = (e) => {
    console.log("Search value", e.target.value);
  }

  return (
    <div>
      <MyNavbar placeholder="Cerca..." onChange={handleSearchChange} />
      <h1>My Redux Toolkit App</h1>
      <Counter />
      <div className="App">
      <h1>Lista dei Prodotti</h1>
      <ProductList />
    </div>
      <MyFooter/>
    </div>
  );
};

export default App;
