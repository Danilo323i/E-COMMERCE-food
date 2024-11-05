import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Counter from './components/Counter';
import MyNavbar from "./components/MyNavbar/MyNavbar";
import MyFooter from "./components/MyFooter/MyFooter";
import ProductList from './components/ProductList/ProductList';
import ProductManagement from './components/ProductManagement/ProductManagement';
import AddProductPage from './components/AddProductPage/AddProductPage';
import Register from './components/Register';

import Login from './components/Login/Login';
import AccessPage from './components/AccessPage/AccessPage';


const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Errore nel recupero dei prodotti:', error));
  }, []);

  const handleSearchChange = (e) => {
    console.log("Search value", e.target.value);
  };

  const addProduct = (newProduct) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  return (
    <Router>
      <div>
        <MyNavbar placeholder="Cerca..." onChange={handleSearchChange} />
        <h1>My Redux Toolkit App</h1>
        <Counter />
        <div className="App">
          <Routes>
            <Route path="/" element={<AccessPage />} />
            <Route
              path="/products"
              element={
                <div>
                  <h1>Lista dei Prodotti</h1>
                  <ProductList products={products} />
                  <ProductManagement />
                </div>
              }
            />
            <Route
              path="/add-product"
              element={<AddProductPage addProduct={addProduct} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <MyFooter />
      </div>
    </Router>
  );
};

export default App;
