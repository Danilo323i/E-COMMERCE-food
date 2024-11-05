import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../AccessPage/AccessPage.css'; 

function AccessPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); 
  };

  const handleRegister = () => {
    navigate('/register'); 
  };

  const handleGuestAccess = () => {
    navigate('/products');
  };

  return (
    <div className="accessPageContainer">
      <h1>Benvenuto!</h1>
      <p>Scegli un'opzione per continuare:</p>
      <button onClick={handleLogin}>Accedi</button>
      <button onClick={handleRegister}>Registrati</button>
      <button onClick={handleGuestAccess}>Entra come Ospite</button>
    </div>
  );
}

export default AccessPage;
