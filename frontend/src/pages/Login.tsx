// references:
// https://supabase.com/docs/guides/auth/quickstarts/react

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginButton from '../components/ui/LoginButton.tsx';

export default function Login() {
  const navigate = useNavigate();
  const { session, login, authError, setAuthError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (session) {
      navigate('/home');
    }
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/home');
    }
  };

  if (authError) {
    return (
      <div>
        <p>Authentication failed</p>
        <p>{authError}</p>
        <button
          onClick={() => {
            navigate('/login', { replace: true });
            setAuthError(null);
          }}
        >
          Return to login
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          required={true}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Your password"
          value={password}
          required={true}
          onChange={e => setPassword(e.target.value)}
        />
        <LoginButton label="login" />
      </form>
    </div>
  );
}
