import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductManagement = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/add-product')}>Gestione Prodotti</button>
    </div>
  );
};

export default ProductManagement;
