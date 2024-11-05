import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProductPage = ({ addProduct }) => {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });
  const navigate = useNavigate();

  const handleAddProduct = () => {
    fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nella risposta del server');
        }
        return response.json();
    })
    .then(data => {
        console.log('Risposta del server:', data); // Verifica cosa viene restituito
        if (data && data._id) { // Controlla se l'oggetto prodotto ha un ID
            addProduct(data); // Aggiungi direttamente il prodotto
            navigate('/'); // Torna alla pagina principale dopo aver aggiunto il prodotto
        } else {
            console.error('Errore durante la creazione del prodotto:', 'Risposta inattesa');
        }
    })
    .catch(err => {
        console.error('Errore nella richiesta:', err);
        alert('Si è verificato un errore durante la creazione del prodotto.');
    });
};




  return (
    <div>
      <h2>Aggiungi un nuovo prodotto</h2>
      <input
        type="text"
        placeholder="Nome"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Prezzo"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <textarea
        placeholder="Descrizione"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
      ></textarea>
      <button onClick={() => navigate('/')}>Annulla</button>
      <button onClick={handleAddProduct}>Crea Prodotto</button>
    </div>
  );
};

export default AddProductPage;
