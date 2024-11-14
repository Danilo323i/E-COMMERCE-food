import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductManagement = () => {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate('/add-product')}>Aggiungi Prodotto</button>
        </div>
    );
};

export default ProductManagement;
