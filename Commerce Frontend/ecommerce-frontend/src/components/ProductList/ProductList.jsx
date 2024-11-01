import React, { useEffect, useState } from 'react';
import '../ProductList/ProductList.css'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  
    fetch('http://localhost:3000/api/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nella risposta del server');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Errore nel recupero dei prodotti:', error);
      });
  }, []);

  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map(product => (
          <div key={product._id} className="product-card">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Prezzo: €{product.price}</p>
          </div>
        ))
      ) : (
        <p>Nessun prodotto disponibile</p>
      )}
    </div>
  );
};

export default ProductList;
