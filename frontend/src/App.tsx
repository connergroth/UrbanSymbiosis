// References:
// - https://reactrouter.com/en/main/start/tutorial
// - https://www.w3schools.com/react/react_router.asp

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import { TestComponent } from './tests/useApiTest.tsx'; // for testing API routes, remove later

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          <Route path="/test" element={<TestComponent />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
