import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Accesso effettuato con successo!');
        localStorage.setItem('token', data.token);
        // Puoi navigare alla pagina principale o eseguire altre azioni qui
      } else {
        setMessage(data.message || 'Errore durante l’accesso');
      }
    } catch (error) {
      setMessage('Errore di connessione al server');
      console.error('Errore durante il login:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Accedi</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Login;
