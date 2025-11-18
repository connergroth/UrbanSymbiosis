// References:
// - https://react.dev/reference/react-dom/client/createRoot
// - https://react.dev/reference/react/StrictMode

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
// Loads Tailwind styles.
import './index.css';

const element = document.getElementById('root');

if (element) {
  const root = createRoot(element);
  root.render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  );
}